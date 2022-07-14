const { Worker } = require('worker_threads')

function searchDomain (domain) {
    console.log("--STARTING PROCESS-- ");

    //URLS THAT ARE IN PIPELINE TO BE CHECKED ARE STORED IN urlToProcess
    //URLS THAT ARE ALREADY CHECKED ARE STORED IN checkedURLs
    var checkedURLs = [], urlToProcess = [];

    return new Promise((resolve, reject) => {
      const worker = new Worker('./src/workers/searchWorker.js', { domain });
      //CALLING THE WORKER WITH THE DOMAIN NAME
      worker.postMessage({
        url: domain,
        domain: domain,
        checkedURLs: checkedURLs,
        urlToProcess: urlToProcess
      })
  
      //RECURSIVE FUNCTION THAT PASSES A NEW URL FROM THE PIPELINE
      function searchUrl(){
        var data = {
          url: urlToProcess[0],
          domain: domain,
          checkedURLs: checkedURLs,
          urlToProcess: urlToProcess
        }       
        worker.postMessage(data)
      }
  
      worker.on('message', (data)=>{
        //3 TYPES OF RESPONSE IS RECEIVED FROM THE WORKER
        //add - A NEW URL HAS BEEN FOUND AND NEEDS TO BE ADDED TO PIPELINE
        //nodata - NO URLS FOUND FROM THE HTML WHICH WAS JUST PARSED. REMOVE URL FROM PIPELINE AND PROCEED
        //restart - PROCEES COMPLETE FOR CURRENT URL. PROCEED TO NEXT URL. 
        
        //ADD
        if(data.action === "add"){
          if(!checkedURLs.includes(data.checked_url)){
            checkedURLs.push(data.checked_url);
          }
          if(!checkedURLs.includes(data.url) || !urlToProcess.includes(data.url) ){
            urlToProcess.push(data.url);
          }
          
        }
        //NO DATA 
        else if(data.action === "nodata"){
          if(!checkedURLs.includes(data.checked_url)){
            checkedURLs.push(data.checked_url);
          }
          urlToProcess.splice(0, 1);
          if(urlToProcess.length>0){  
            searchUrl();
          }else{
            console.log("--ENDING PROCESS-- ");
            process.exit(0);
          }
        }
        //RESTART
        else if(data.action === "restart"){
          if(urlToProcess.length>0){
            urlToProcess.splice(0, 1);
            searchUrl();
          }else{
            console.log("--ENDING PROCESS-- ");
            process.exit(0);
          }
        }
      });
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Stopped the Worker Thread with the exit code: ${code}`));
      })
    })
  }

  module.exports = searchDomain