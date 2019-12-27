let e = require('express');
let bodyparser = require('body-parser');

let { createFile, retrieveFile } = require('./src/fsAdapter');
let configs = require('./configs');

let app = e();
app.use(bodyparser.text());

app.get('/ping', (req, res) => {
    res.status(200).send(JSON.stringify('pong'));
});

// GET file from bucket
app.get('/:bucket/:filename', (req, res) => {
    let { bucket, filename } = req.params;

    retrieveFile(bucket, filename)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(500).send(e.toString());
        });
});

// ADD file to bucket
app.post('/:bucket/:filename', (req, res) => {
    let { bucket, filename } = req.params;
    let { body } = req;

    createFile(bucket, filename, body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(500).send(e.toString());
        });
});

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}`);
});
