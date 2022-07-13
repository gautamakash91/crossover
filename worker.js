const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');

const { progressPath } = workerData;

const progress = (path) => {
  const progressData = fs.readFileSync(path);
  const progressJson = JSON.parse(progressData);
  return progressJson;
};

parentPort.postMessage(progress(progressPath));