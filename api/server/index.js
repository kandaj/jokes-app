const express = require('express');
const fs = require('fs');
const app = express();
const parse = require('csv-parse');
const cors = require('cors')
var Datastore = require('nedb')
    , db = new Datastore();
const path = require("path")
const parser   = require('body-parser')
const webRoot = __dirname + '/../../build'
console.log(webRoot)

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors())
app.options('*', cors())

fs.readFile(__dirname+'/jokes.csv', (err, data) => {
  parse(data, {}, (err, jokes) => {
      jokes.map((joke, i) => {
          db.insert([{ id: i, joke: joke[0]}]);
      })
  });

});


db.loadDatabase(function (err) {
    app.use('/', express.static(webRoot))

    app.get('/joke', function (req, res) {
        let i = Math.floor((Math.random() * 125));
          db.find({id:i }, function (err, docs) {
              res.status(200).json(docs);
        });
    });

    app.get('/jokes/list', function (req, res) {
        db.find({}, function (err, docs) {
            res.status(200).json(docs);
        });
    });


    app.post('/joke/add', function (req, res) {
        let postData = req.body
        db.count({}, function (err, count) {
            postData = {...postData, ...{id:Number(count+1)}}
            db.insert(postData, function (err, docs) {
                res.status(201).json(docs);
            });
        });

    });

    app.post('/joke/update/:id', function (req, res) {
        const postData = req.body
        const id = req.params.id
        db.update({ id: Number(id)}, { $set: { joke: postData.joke} }, function (err, numReplaced) {
            console.log(numReplaced)
            if(err) {
                res.status(304).json({status: 'failed'});
            } else {
                res.status(201).json({status: 'success'});
            }
        })

    });
});



app.listen(3050, function () {
  console.log('Example app listening on port 3050.');
});

module.exports = app
