let _ = require('lodash');

let configs = {
    port: _.defaultTo(process.env.SERVICE_PORT, 110),
    hdfs: {
        user: 'maria_dev',
        host: 'sandbox-hdp.hortonworks.com',
        port: 50070,
        path: '/webhdfs/v1'
    },
    bucketBasePath: _.defaultTo(process.env.BASE_BUCKET_PATH, './temp/buckets')
};

module.exports = configs;
