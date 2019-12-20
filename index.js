let e = require('express');
let webhdfs = require('webhdfs');
let BufferStreamReader = require('buffer-stream-reader');

let configs = require('./configs');

let app = e();
app.use(e.json());

// GET file from bucket
app.get('/:bucket/:id', (req, res) => {
    let { bucket, id } = req.params;

    let hdfs = webhdfs.createClient({
        user: configs.hdfs.user,
        host: configs.hdfs.host,
        port: configs.hdfs.port,
        path: configs.hdfs.path
    });

    let rfstream = hdfs.createReadStream(`${configs.bucketBasePath}/${bucket}/${id}.${configs.bucketFileTypes}`);

    let error = false;
    // read stream errors out
    rfstream.on('error', (e) => {
        error = true;
        res.json(e);
        return;
    });

    // collect data chunks
    let data = [];

    rfstream.on('data', (chunk) => {
        data.push(chunk);
    });

    // on finish, combine data chunks and respond
    rfstream.on('finish', () => {
        // in case file not found
        if (error) {
            return;
        }

        let responseData = Buffer.concat(data);
        res.json(JSON.parse(responseData));
    });
});

// ADD file to bucket
app.post('/:bucket/:id', (req, res) => {
    let { bucket, id } = req.params;
    let { body } = req;

    let hdfs = webhdfs.createClient({
        user: configs.hdfs.user,
        host: configs.hdfs.host,
        port: configs.hdfs.port,
        path: configs.hdfs.path
    });

    let localstream = new BufferStreamReader(JSON.stringify(body));
    let wfstream = hdfs.createWriteStream(`${configs.bucketBasePath}/${bucket}/${id}.${configs.bucketFileTypes}`);

    localstream.pipe(wfstream);

    let error = false;
    wfstream.on ('error', (e) => {
        error = true;
        res.json(e);
    });

    wfstream.on('finish', () => {
        if (error) {
            return;
        }
        
        res.json('write successful');
    });
});

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}`);
});
