const https = require('https');
const { workerData, parentPort } = require('worker_threads');

https.get(workerData, { rejectUnauthorized: false }, res => {
  parentPort.postMessage({code: res.statusCode, location: res.headers.location});
});
