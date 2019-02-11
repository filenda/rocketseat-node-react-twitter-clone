const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//  retira (extrai) o servidor acima criado
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://goweek:goweek123@ds161475.mlab.com:61475/backend-filenda-goweek', {
    useNewUrlParser: true
});

//  middleware to intercept all http requests so all "reqs" in all controllers will have access to
//  the io (socket io)
app.use((req, res, next) => {
    req.io = io;

    //  tells the express to continue with the request pipeline after io is set
    return next();
});

app.use(cors());

//  tells express that json will be used  for all the requests
app.use(express.json());
app.use(require('./routes'));

server.listen(3002, () => {
    console.log(' =) Server started on port 3002');
});
