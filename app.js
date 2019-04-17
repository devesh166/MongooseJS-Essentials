// import * as express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./model/userModel');
const job = require('./model/jobModel');
const apply = require('./model/applyModel');
const port = process.env.DEV1 || 5001;
const app = express();
app.use(bodyParser.json());
const db = 'mongodb://127.0.0.1:27017/naukri'
mongoose.connect(db, (err) => {

    if (err) throw err;

    console.log('Successfully connected to db');

});
//mongoose.Promise =global.Promise;
//----------get all users list -----------------
app.get('/users', (req, res) => {
    user.find({}).exec((err, userlist) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")
            res.send(userlist)
        }

    })
})
//----------get user by id-----------------
app.get('/users/:id', (req, res) => {
    user.find({ _id: req.params.id }).exec((err, user) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")
            res.send(user)
        }

    })

})

//----------post user----------------
app.post('/users', (req, res) => {
    let userdata = new user();
    userdata.name = req.body.name;
    userdata.email = req.body.email;
    userdata.type = req.body.type;
    if (req.body.location) {
        userdata.location.long = req.body.location.long;
        userdata.location.lat = req.body.location.lat;

    }
    userdata.save((err, users) => {
        if (err) {
            res.send(err)
        } else {
            res.send(users);
        }
    })

})
//----------update user-----------------
app.put('/users/:id', (req, res) => {
    user.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }, { new: true }, (err, element) => {
        if (err) {
            res.send(err)
        } else {
            res.send(element);
        }
    })
})
//----------delete user-----------------
app.delete('/users/:id', (req, res) => {
    user.findByIdAndDelete({ _id: req.params.id }, (err, element) => {
        if (err) {
            res.send(err)
        } else {
            res.send(element);
        }
    })
})


app.listen(port, () => {
    console.log("server listening on port " + port);
})
