mod entities;
mod setup;
use entities::prelude::*;
use rocket::serde::Deserialize;
use rocket::serde::json::Json;
use rocket::*;
use rocket::{get, launch};
use sea_orm::{EntityTrait, ActiveValue};
use sea_orm::{DatabaseConnection, DbErr};
use setup::set_up_db;
use entities::*;

#[derive(Responder)]
#[response(status = 500, content_type = "json")]
struct ErrorResponder {
    message: String,
}

impl From<DbErr> for ErrorResponder {
    fn from(err: DbErr) -> ErrorResponder {
        ErrorResponder {
            message: err.to_string(),
        }
    }
}

impl From<String> for ErrorResponder {
    fn from(string: String) -> ErrorResponder {
        ErrorResponder { message: string }
    }
}

impl From<&str> for ErrorResponder {
    fn from(str: &str) -> ErrorResponder {
        str.to_owned().into()
    }
}


#[get("/")]
async fn index() -> &'static str {
    "Hello, bakeries!"
}

#[get("/bakeries")]
async fn list_bakeries(db: &State<DatabaseConnection>)
    -> Result<Json<Vec<String>>, ErrorResponder>
{
    let db = db as &DatabaseConnection;

    let bakery_names = Bakery::find()
    .all(db)
    .await// Use the await! macro here if necessary
    .map_err(Into::<ErrorResponder>::into)?
    .into_iter()
    .map(|b| b.name)
    .collect::<Vec<String>>();

   Ok(Json(bakery_names))
}


#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct NewBakeryDto<'r> {
    name: &'r str,
    profit_margin: Option<f64>,
}

#[post("/bakeries", data = "<bakery>")]
async fn new_bakery(
    db: &State<DatabaseConnection>,
    bakery: Json<NewBakeryDto<'_>>
) -> Result<(), ErrorResponder> {
    let db = db as &DatabaseConnection;

    let new_bakery = bakery::ActiveModel {
        name: ActiveValue::Set(bakery.name.to_owned()),
        profit_margin: ActiveValue::Set(bakery.profit_margin.unwrap_or_default()),
        ..Default::default()
    };

    Bakery::insert(new_bakery)
        .exec(db)
        .await
        .map_err(Into::<ErrorResponder>::into)?;

    Ok(())
}


#[get("/bakeries/<id>")]
async fn bakery_by_id(db: &State<DatabaseConnection>, id: i32) -> Result<String, ErrorResponder> {
    let db = db as &DatabaseConnection;

    let bakery = Bakery::find_by_id(id).one(db).await.map_err(Into::<ErrorResponder>::into)?;

    Ok(if let Some(bakery) = bakery {
        bakery.name
    } else {
        return Err(format!("No bakery with id {id} is found.").into());
    })
}

#[launch]
async fn rocket() -> _ {
    let db = match set_up_db().await {
        Ok(db) => db,
        Err(err) => panic!("{}", err),
    };

    rocket::build()
        .manage(db)
        .mount("/", routes![
            index, 
            list_bakeries,
            bakery_by_id,
            new_bakery
        ])
}
