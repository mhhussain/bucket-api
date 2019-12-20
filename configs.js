let configs = {
    port: 110,
    hdfs: {
        user: 'maria_dev',
        host: 'sandbox-hdp.hortonworks.com',
        port: 50070,
        path: '/webhdfs/v1'
    },
    bucketBasePath: '/tmp/buckets',
    bucketFileTypes: 'json'
}

module.exports = configs;
