// src/setup.rs

use sea_orm::*;

// Replace with your database URL and database name
const DATABASE_URL: &str = "postgres://postgres:password@localhost:15432";
const DB_NAME: &str = "bakeries_db";

pub(super) async fn set_up_db() -> Result<DatabaseConnection, DbErr> {
    let db = Database::connect(DATABASE_URL).await?;

    let db = match db.get_database_backend() {
        DbBackend::MySql => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("SELECT 1 = 1;",),
            ))
            .await?;

            let url = format!("{}/{}", DATABASE_URL, DB_NAME);
            Database::connect(&url).await?
        }
        DbBackend::Postgres => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("SELECT 1 = 1;"),
            ))
            .await?;

            let url = format!("{}/{}", DATABASE_URL, DB_NAME);
            Database::connect(&url).await?
        }
        DatabaseBackend::Sqlite => db,
    };

    Ok(db)
}
