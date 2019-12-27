FROM node:10

# Create working directory
WORKDIR /home/node/app

# Make bucket directory
RUN mkdir -p /data/bucket-api/buckets

# Create test-bucket
RUN mkdir -p /data/bucket-api/buckets/test-bucket

COPY package*.json ./

RUN npm i --no-optional

COPY . .

ENV SERVICE_PORT=110
ENV BASE_BUCKET_PATH=/data/bucket-api/buckets

ENTRYPOINT ["node", "index.js"]