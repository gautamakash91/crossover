const { parentPort } = require('worker_threads')
const axios = require('axios').default;
const https = require('https');
const httpsAgent = new https.Agent({ keepAlive: true });
const urlRegex = /(https?:\/\/[^\s]+)/g;

parentPort.on('message', (data) => {
  axios
  .get(data.url, {
      httpsAgent,
      headers: {
          'Accept-Encoding': 'gzip, deflate, br',
      }
  })
  .then((res) => {
      var body = res.data;
      var checkedURLs = data.checkedURLs;
      var urlToProcess = data.urlToProcess;
      
      body.replace(urlRegex, function (inner_url) {
        //REMOVING PARAMETERS FROM THE URL
        var main_url = inner_url.split("?")[0].split(">")[0];;

        //CHECK IF THE URL HAS THE DOMAIN NAME IN IT AND ALSO IF IT HAS ALREADY BEEN CHECKED ONCE. 
        //A CONDITION HAS BEEN ADDED TO CHECK IF IT IS ALREADY IN PIPELINE TO BE CHECKED (only then we will get unique values)
        if (main_url.includes(data.domain) && !checkedURLs.includes(main_url) && !urlToProcess.includes(main_url)) {
          if(!checkedURLs.includes(main_url) || !urlToProcess.includes(main_url) ){
            console.log(main_url);
            urlToProcess.push(main_url)
            parentPort.postMessage({ action: "add", url: main_url, checked_url:  data.url});
          }
        }
      });
      parentPort.postMessage({ action: "restart"});
  })
  .catch(err => {
    //UNCOMMENT THE BELOW LINE TO LOG ERRORS IN FETCHING HTML
    // console.log(err);
    parentPort.postMessage({ action: "nodata", checked_url:  data.url});
  });
});