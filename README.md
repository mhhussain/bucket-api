# hadoop-buckets

Simulating buckets in hadoop.

## High-level

Think of how Amazon S3 works. 

Problem

    How do we abstract the reference to a file from the retrieval of a file?

Basically you create a "bucket" somewhere and store all items in that "bucket". This API then gives your calling applications one consistent REST API for retrieving files, effectively abstracting where the files are actually located.

This example uses HDFS to store the data, but you could also easily use a database or a normal (subjectively) filesystem.

## Requirements

1. Access HDFS cluster with authentication disabled
2. Host and port for HDFS cluster
3. A base "buckets" folder created somewhere in the filesystem
4. A user with permission to read *and* write to the cluster and the "buckets" created above
5. Create a new folder within the "buckets" folder (call it whatever you want, this will be your first bucket)
6. (optional) Create any additional buckets you want

## Functionality

Run the application:

`npm start`

Server should be running on port 110 (default).

To create a file:

`curl -d '{"abcde":"efghi"}' -H 'Content-type: application/json' -X POST http://localhost:110/test-bucket/first-file`

Posting to `http://localhost:110/test-bucket/first-file` will create a new file in the "test-bucket" folder called "first-file" and the contents will be `{"abcde":"efghi"}`.


To retrieve a file:

`curl -X GET http://localhost:110/test-bucket/first-file`

A GET request to the same url `http://localhost:110/test-bucket/first-file` will then retrieve that file.

