let webhdfs = require('webhdfs');
let fs = require('fs');
let hdfs = webhdfs.createClient({
    user: 'maria_dev',
    host: 'sandbox-hdp.hortonworks.com',
    port: 50070,
    path: '/webhdfs/v1'
});

/*let lfstream = fs.createReadStream('./data-files/abcdefghi.json');
let rfstream = hdfs.createWriteStream('/tmp/buckets/test-bucket/abcdefghi.json');

lfstream.pipe(rfstream);

rfstream.on ('error', (e) => {
    console.log(e);
});

rfstream.on('finish', () => {
    console.log('writing done');
});*/

let rfstream = hdfs.createReadStream('/tmp/buckets/test-bucket/abcdefghi.json');

rfstream.on('error', (e) => {
    console.log(e);
});

let x = [];

rfstream.on('data', (chunk) => {
    x.push(chunk);
    //console.log(`pushed chunk: ${chunk}`);
});

rfstream.on('finish', () => {
    console.log('reading done');
    console.log(`completed data: ${x}`);
});
