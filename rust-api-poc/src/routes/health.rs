use actix_web::*;
use serde::Serialize;

#[derive(Serialize)]
struct HealthCheckResponse {
    status: String,
}

pub async fn healthcheck() -> Result<impl Responder> {
    let response = HealthCheckResponse {
        status: String::from("running"),
    };
    Ok(web::Json(response))
}
