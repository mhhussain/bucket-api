let e = require('express');

let { createFile } = require('./src/hdfsAdapter');
let configs = require('./configs');

let app = e();
app.use(e.json());

// GET file from bucket
app.get('/:bucket/:filename', (req, res) => {
    let { bucket, filename } = req.params;

    retrieveFile(bucket, filename)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

// ADD file to bucket
app.post('/:bucket/:filename', (req, res) => {
    let { bucket, filename } = req.params;
    let { body } = req;

    createFile(bucket, filename, body)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.json(e);
        });
});

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}`);
});
