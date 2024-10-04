const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/main');

const app = express();

app.use(express.json()); //convierte el json que viene del body en un objeto - ojo que es importante que este aca arriba antes de enviar a la api

app.use(morgan('dev'));

app.use('/api', mainRouter);



module.exports = app;