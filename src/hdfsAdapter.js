let webhdfs = require('webhdfs');
let BufferStreamReader = require('buffer-stream-reader');

let configs = require('../configs');

let createFile = (bucket, id, data) => {
    let hdfs = webhdfs.createClient({
        user: configs.hdfs.user,
        host: configs.hdfs.host,
        port: configs.hdfs.port,
        path: configs.hdfs.path
    });

    return new Promise((resolve, reject) => {
        let localstream = new BufferStreamReader(JSON.stringify(data));

        let writePath = `${configs.bucketBasePath}/${bucket}/${id}`;
        let wfstream = hdfs.createWriteStream(writePath);

        localstream.pipe(wfstream);

        let error = false;
        wfstream.on ('error', (e) => {
            error = true;
            reject(e);
        });

        wfstream.on('finish', () => {
            if (error) {
                return;
            }
            
            resolve(`File written to path: ${writePath}`);
        });
    });
};

let retrieveFile = (bucket, id) => {
    let hdfs = webhdfs.createClient({
        user: configs.hdfs.user,
        host: configs.hdfs.host,
        port: configs.hdfs.port,
        path: configs.hdfs.path
    });

    return new Promise((resolve, reject) => {
        let rfstream = hdfs.createReadStream(`${configs.bucketBasePath}/${bucket}/${id}`);

        let error = false;
        // read stream errors out
        rfstream.on('error', (e) => {
            error = true;
            reject(e);
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
            resolve(JSON.parse(responseData));
        });
    });
};

module.exports = {
    createFile,
    retrieveFile
};
