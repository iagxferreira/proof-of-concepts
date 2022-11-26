const routes = require('express').Router()

const multer = require('multer');       
const multerConfig = require('../src/config/multer');

routes.post('/upload', multer(multerConfig).single('file'), (req, res) => {
    res.status(200).json({ hello: 'Hello World'})
})

module.exports = routes;