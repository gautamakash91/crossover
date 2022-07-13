const { workerData, parentPort } = require('worker_threads')
// const request = require('request');

// console.log('Technical Articles on ' + workerData);


parentPort.on('message', (data) => {
  console.log("worker",data)
  parentPort.postMessage(data);
  // port.postMessage(data);
});