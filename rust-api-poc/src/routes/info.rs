use actix_web::*;
use serde::Serialize;

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const AUTHOR: &'static str = env!("CARGO_PKG_AUTHORS");

#[derive(Serialize)]
struct Info {
    version: String,
    author: String,
}

pub async fn info() -> Result<impl Responder> {
    let response = Info {
        version: String::from(VERSION),
        author: String::from(AUTHOR),
    };

    Ok(web::Json(response))
}
