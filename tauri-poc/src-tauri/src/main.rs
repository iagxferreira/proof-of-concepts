// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

use tauri::{Menu, Manager};
use directories::{BaseDirs, UserDirs, ProjectDirs};
use system_shutdown::shutdown;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
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
fn get_path() -> String {
    match UserDirs::new() {
        Some(user_dirs) => String::from(user_dirs.document_dir().unwrap().to_string_lossy()),
        None => " ".to_string(),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_path])
        .invoke_handler(tauri::generate_handler![machine_shutdown])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
