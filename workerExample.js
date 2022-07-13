const { workerData, parentPort } = require('worker_threads')

// console.log('Technical Articles on ' + workerData);
request(workerData, function (err, res, body) {
  if (err) {
    console.log(err, "error occurred while hitting URL");
  }
  else {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    body.replace(urlRegex, function (inner_url) {
      //REMOVING PARAMETERS FROM THE URL
      var main_url = inner_url.split("?")[0];
      //CHECK IF THE URL HAS THE DOMAIN NAME IN IT AND ALSO IF IT HAS ALREADY BEEN CHECKED ONCE. 
      //A CONDITION HAS BEEN ADDED TO CHECK IF IT IS ALREADY IN PIPELINE TO BE CHECKED (only then we will get unique values)
      if (main_url.includes(process.argv[3]) && !checkedURLs.includes(main_url) && !urlToProcess.includes(main_url)) {
        urlToProcess.push(main_url);
        console.log(main_url);
      }
    });

    //IF THERE ARE NO MORE VALUES IN urlToProcess IT MEANS THAT THERE ARE NO MORE CHECKS TO BE PERFORMED
    //EXIT THE CHECK WITH EXIT CODE 0
    if (urlToProcess.length === 0) {
      console.log("--ENDING PROCESS-- ");
      process.exit(0);
    }
    //PASS THE FIRST ELEMENT OF urlToProcess BACK TO getUrlsWithin
    //REMOVING THAT ELEMENT urlToProcess AND ADDING IT TO checkedURLs
    else {
      var temp = urlToProcess[0];
      checkedURLs.push(temp);
      urlToProcess.splice(0, 1);
      getUrlsWithin(temp);
      parentPort.postMessage({ fileName: workerData, status: 'Done' });

    }
  }
});


// parentPort.postMessage({ fileName: workerData, status: 'Done' });