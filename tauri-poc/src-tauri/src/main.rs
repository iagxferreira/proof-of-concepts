// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_handler;

use std::{env};

use directories::UserDirs;
use system_shutdown::shutdown;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greeter(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn machine_shutdown() {
    match shutdown() {
        Ok(_) => println!("Shutting down, bye!"),
        Err(error) => eprintln!("Failed to shut down: {}", error),
    }
}

#[tauri::command]
fn get_user_dir() -> String {
    let user_dir = match UserDirs::new() {
        Some(user_dirs) => String::from(user_dirs.document_dir().unwrap().to_string_lossy()),
        None => " ".to_string(),
    };
    user_dir
}

#[tauri::command]
fn setup(){
    let user_dir = match UserDirs::new() {
        Some(user_dirs) => String::from(user_dirs.document_dir().unwrap().to_string_lossy()),
        None => " ".to_string(),
    };
    file_handler::write_file(format!("{}\\tauri.sqlite", user_dir));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greeter,
            get_user_dir,
            machine_shutdown,
            setup
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
