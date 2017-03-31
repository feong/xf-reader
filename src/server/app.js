const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const DIRECTION = 'https://www.inoreader.com';

app.use(cors());
app.use('/', function (req, res) {
    let url = DIRECTION + req.url;
    req.pipe(request(url, {form:req.body})).pipe(res);
})

app.listen(port);