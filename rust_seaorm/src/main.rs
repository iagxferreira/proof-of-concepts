// main.rs

mod entities;
use entities::{prelude::*, *};
use futures::executor::block_on;
use sea_orm::SchemaMana;
use sea_orm::*;
// Change this according to your database implementation,
// or supply it as an environment variable.
// the whole database URL string follows the following format:
// "protocol://username:password@host:port/database"
// We put the database name (that last bit) in a separate variable simply for convenience.
const DATABASE_URL: &str = "postgres://postgres:password@localhost:15432";
const DB_NAME: &str = "bakeries_db";

async fn run_create_table() -> Result<(), DbErr> {
    let db = Database::connect(DATABASE_URL).await?;

    let db = &match db.get_database_backend() {
        DbBackend::MySql => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE IF NOT EXISTS `{}`;", DB_NAME),
            ))
            .await?;

            let url = format!("{}/{}", DATABASE_URL, DB_NAME);
            Database::connect(&url).await?
        }
        DbBackend::Postgres => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("DROP DATABASE IF EXISTS \"{}\";", DB_NAME),
            ))
            .await?;
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE \"{}\";", DB_NAME),
            ))
            .await?;

            let url = format!("{}/{}", DATABASE_URL, DB_NAME);
            Database::connect(&url).await?
        }
        DbBackend::Sqlite => db,
    };
    Ok(())
}

async fn insert() -> Result<(), DbErr> {
    let db = Database::connect(DATABASE_URL).await?;

    let happy_bakery = bakery::ActiveModel {
        name: ActiveValue::Set("Happy Bakery".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    };
    let res = Bakery::insert(happy_bakery).exec(&db).await?;
    bakery::ActiveModel {
        id: ActiveValue::Set(res.last_insert_id),
        name: ActiveValue::Set("Sad Bakery".to_owned()),
        profit_margin: ActiveValue::NotSet,
    };
    Ok(())
}

async fn update() -> Result<(), DbErr> {
    let db = Database::connect(DATABASE_URL).await?;

    let happy_bakery = bakery::ActiveModel {
        name: ActiveValue::Set("Happy Bakery".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    };
    let res = Bakery::insert(happy_bakery).exec(&db).await?;
    let sad_bakery = bakery::ActiveModel {
        id: ActiveValue::Set(res.last_insert_id),
        name: ActiveValue::Set("Sad Bakery".to_owned()),
        profit_margin: ActiveValue::NotSet,
    };
    sad_bakery.update(&db).await?;
    Ok(())
}

async fn insert_chef() -> Result<(), DbErr> {
    let db = Database::connect(DATABASE_URL).await?;
    let happy_bakery = bakery::ActiveModel {
        name: ActiveValue::Set("Happy Bakery".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    };
    let res = Bakery::insert(happy_bakery).exec(&db).await?;
    let john = chef::ActiveModel {
        name: ActiveValue::Set("John".to_owned()),
        bakery_id: ActiveValue::Set(res.last_insert_id), // a foreign key
        ..Default::default()
    };
    Chef::insert(john).exec(&db).await?;
    Ok(())
}

async fn find_bakeries() -> Result<(), DbErr> {
    // Finding all is built-in
    let db = Database::connect(DATABASE_URL).await?;
    let bakeries: Vec<bakery::Model> = Bakery::find().all(&db).await?;
    assert_eq!(bakeries.len(), 1);

    // Finding by id is built-in
    let sad_bakery: Option<bakery::Model> = Bakery::find_by_id(1).one(&db).await?;
    assert_eq!(sad_bakery.unwrap().name, "Sad Bakery");

    // Finding by arbitrary column with `filter()`
    let sad_bakery: Option<bakery::Model> = Bakery::find()
        .filter(bakery::Column::Name.eq("Sad Bakery"))
        .one(&db)
        .await?;
    assert_eq!(sad_bakery.unwrap().id, 1);
    Ok(())
}

async fn delete_chefs() -> Result<(), DbErr> {
    let db = Database::connect(DATABASE_URL).await?;

    let john = chef::ActiveModel {
        id: ActiveValue::Set(1), // The primary key must be set
        ..Default::default()
    };
    john.delete(&db).await?;

    let sad_bakery = bakery::ActiveModel {
        id: ActiveValue::Set(1), // The primary key must be set
        ..Default::default()
    };
    sad_bakery.delete(&db).await?;

    let bakeries: Vec<bakery::Model> = Bakery::find().all(&db).await?;
    assert!(bakeries.is_empty());
    Ok(())
}

async fn insert_relationship() -> Result<(), DbErr> {
    let db: DatabaseConnection = Database::connect(DATABASE_URL).await?;

    let la_boulangerie = bakery::ActiveModel {
        name: ActiveValue::Set("La Boulangerie".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    };
    let bakery_res = Bakery::insert(la_boulangerie).exec(&db).await?;

    for chef_name in ["Jolie", "Charles", "Madeleine", "Frederic"] {
        let chef = chef::ActiveModel {
            name: ActiveValue::Set(chef_name.to_owned()),
            bakery_id: ActiveValue::Set(bakery_res.last_insert_id),
            ..Default::default()
        };
        Chef::insert(chef).exec(&db).await?;
    }
    Ok(())
}

async fn find_many() -> Result<(), DbErr> {
    let db: DatabaseConnection = Database::connect(DATABASE_URL).await?;
    let bakery_res = Bakery::insert(bakery::ActiveModel {
        name: ActiveValue::Set("La Boulangerie".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    })
    .exec(&db)
    .await?;

    let la_boulangerie: bakery::Model = Bakery::find_by_id(bakery_res.last_insert_id)
        .one(&db)
        .await?
        .unwrap();
    {
        // First find *La Boulangerie* as a Model
        Bakery::find_by_id(bakery_res.last_insert_id)
            .one(&db)
            .await?
            .unwrap();
    }
    let chefs: Vec<chef::Model> = la_boulangerie.find_related(Chef).all(&db).await?;
    let mut chef_names: Vec<String> = chefs.into_iter().map(|b| b.name).collect();
    chef_names.sort_unstable();

    assert_eq!(chef_names, ["Charles", "Frederic", "Jolie", "Madeleine"]);

    // Inserting two bakeries and their chefs
    let la_boulangerie = bakery::ActiveModel {
        name: ActiveValue::Set("La Boulangerie".to_owned()),
        profit_margin: ActiveValue::Set(0.0),
        ..Default::default()
    };
    let bakery_res = Bakery::insert(la_boulangerie).exec(db).await?;
    for chef_name in ["Jolie", "Charles", "Madeleine", "Frederic"] {
        let chef = chef::ActiveModel {
            name: ActiveValue::Set(chef_name.to_owned()),
            bakery_id: ActiveValue::Set(bakery_res.last_insert_id),
            ..Default::default()
        };
        Chef::insert(chef).exec(db).await?;
    }
    let la_id = bakery_res.last_insert_id;

    let arte_by_padaria = bakery::ActiveModel {
        name: ActiveValue::Set("Arte by Padaria".to_owned()),
        profit_margin: ActiveValue::Set(0.2),
        ..Default::default()
    };
    let bakery_res = Bakery::insert(arte_by_padaria).exec(db).await?;
    for chef_name in ["Brian", "Charles", "Kate", "Samantha"] {
        let chef = chef::ActiveModel {
            name: ActiveValue::Set(chef_name.to_owned()),
            bakery_id: ActiveValue::Set(bakery_res.last_insert_id),
            ..Default::default()
        };
        Chef::insert(chef).exec(db).await?;
    }
    let arte_id = bakery_res.last_insert_id;

    // would then need two sets of find_related to find
    {
        // Inserting two bakeries and their chefs
        let la_boulangerie = bakery::ActiveModel {
            name: ActiveValue::Set("La Boulangerie".to_owned()),
            profit_margin: ActiveValue::Set(0.0),
            ..Default::default()
        };
        let bakery_res = Bakery::insert(la_boulangerie).exec(db).await?;
        for chef_name in ["Jolie", "Charles", "Madeleine", "Frederic"] {
            let chef = chef::ActiveModel {
                name: ActiveValue::Set(chef_name.to_owned()),
                bakery_id: ActiveValue::Set(bakery_res.last_insert_id),
                ..Default::default()
            };
            Chef::insert(chef).exec(db).await?;
        }
        let la_id = bakery_res.last_insert_id;

        let arte_by_padaria = bakery::ActiveModel {
            name: ActiveValue::Set("Arte by Padaria".to_owned()),
            profit_margin: ActiveValue::Set(0.2),
            ..Default::default()
        };
        let bakery_res = Bakery::insert(arte_by_padaria).exec(&db).await?;
        for chef_name in ["Brian", "Charles", "Kate", "Samantha"] {
            let chef = chef::ActiveModel {
                name: ActiveValue::Set(chef_name.to_owned()),
                bakery_id: ActiveValue::Set(bakery_res.last_insert_id),
                ..Default::default()
            };
            Chef::insert(chef).exec(&db).await?;
        }
        let arte_id = bakery_res.last_insert_id;

        // would then need two sets of find_related to find
    }
    Ok(())
}

fn main() {
    if let Err(err) = block_on(update()) {
        panic!("{}", err);
    }
}
 