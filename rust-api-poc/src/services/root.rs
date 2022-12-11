use actix_web::{get, web, Responder, Result};
use serde::Serialize;

#[derive(Serialize)]
struct Foo {
    name: String,
}

#[get("/root")]
pub async fn index() -> Result<impl Responder> {
    let response = Foo {
        name: String::from("teste"),
    };
    Ok(web::Json(response))
}
