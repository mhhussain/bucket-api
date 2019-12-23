let fs = require('fs');

let configs = require('../configs');

let retrieveFile = (bucket, id) => {
    return new Promise((resolve, reject) => {
        let readPath = `${configs.bucketBasePath}/${bucket}/${id}`;
        fs.readFile(readPath, (e, d) => {
            if (!e) {
                resolve(d.toString());
            } else {
                reject (e)
            }
        });
    });
};

let createFile = (bucket, id, data) => {
    return new Promise((resolve, reject) => {
        let writePath = `${configs.bucketBasePath}/${bucket}/${id}`;
        let rawData = data.toString();
        fs.writeFile(writePath, rawData, (e) => {
            if (!e) {
                resolve(`File written to path: ${writePath}`);
            } else {
                reject(e);
            }
        });
    });
};

module.exports = {
    createFile,
    retrieveFile
};
