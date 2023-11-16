use std::fs::File;


pub fn write_file(path: String){
    File::create(path).expect("Error while creating the file!");
}