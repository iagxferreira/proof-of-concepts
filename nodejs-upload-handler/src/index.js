const { port } = require('./config/')
const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes'))

app.listen(port, () => console.log('running...'))