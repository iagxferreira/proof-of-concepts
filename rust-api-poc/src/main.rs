use actix_web::*;

mod routes;
mod services;
use routes::health::*;
use routes::info::*;
use services::root::*;

const PORT: i32 = 9091;

use actix_web::{web, Result};
use serde::Serialize;

#[derive(Serialize)]
struct Foo {
    name: String,
}
#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    let api = HttpServer::new(|| {
        App::new()
            .route("/health", web::get().to(healthcheck))
            .route("/info", web::get().to(info))
            .service(index)
    });

    let api = api
        .bind(format!("127.0.0.1:{}", PORT))
        .expect(format!("error while trying to listen on port {}", PORT).as_str());

    println!("listening to http://localhost:{}", PORT);

    api.run().await
}
