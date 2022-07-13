#! /usr/bin/env node

// const request = require('request');
// const {
//   Worker, isMainThread, parentPort, workerData
// } = require('node:worker_threads');
const { Worker } = require('worker_threads')
const { program } = require('commander')

// console.log(process.argv);


// console.log("--STARTING PROCESS-- ");

var checkedURLs = [], urlToProcess = [], domain = "", workers = 1;
// switch (process.argv.length) {
//   case 2:
//     console.log("Please provide the paramters required to run the app. Ex - node index.js -n 2 https://amazon.com");
//     process.exit(1);
//     break;
//   case 3:
//     domain = process.argv[2];
//     break;
//   case 4:
//     domain = process.argv[3];
//     workers = parseInt(process.argv[2]);
//     break;
//   default:
//     console.log("Incorrect number of arguments passed.");
//     break;
// }
if (domain !== "") {
  // getUrlsWithin(domain);
}

// program
//   .command('search <domain>')
//   .description('calling domain without workers')
//   .option('-n <threads>', '')
//   .action((domain, threads) => {
//     console.log(domain, threads.n);
//     if (threads.n) {

//     } else {

//     }
//   })

program.parse()

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./workerExample2.js', { workerData });

    worker.postMessage({
      name: "akash"
    })
    worker.on('message', (data)=>{
      console.log("main", data)
      urlToProcess.push(data.url);
    });
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Stopped the Worker Thread with the exit code: ${code}`));
    })
  })
}

const run = async () => {
  const result = await runService('https://www.amazon.com');
  console.log(result);
  //add response to url to check
}

run().catch(err => console.error(err))


//RECURSIVE FUNCTION TO FETCH HTML CONTENT OF THE URL 
//AND TO FURTHER CHECK IF THE HTML HAS ANY DOMAIN URLS IN IT.
function getUrlsWithin(url) {
  // request(url, function (err, res, body) {
  //   if (err) {
  //     console.log(err, "error occurred while hitting URL");
  //   }
  //   else {
  //     var urlRegex = /(https?:\/\/[^\s]+)/g;
  //     body.replace(urlRegex, function (inner_url) {
  //       //REMOVING PARAMETERS FROM THE URL
  //       var main_url = inner_url.split("?")[0];
  //       //CHECK IF THE URL HAS THE DOMAIN NAME IN IT AND ALSO IF IT HAS ALREADY BEEN CHECKED ONCE. 
  //       //A CONDITION HAS BEEN ADDED TO CHECK IF IT IS ALREADY IN PIPELINE TO BE CHECKED (only then we will get unique values)
  //       if (main_url.includes(process.argv[3]) && !checkedURLs.includes(main_url) && !urlToProcess.includes(main_url)) {
  //         urlToProcess.push(main_url);
  //         console.log(main_url);
  //       }
  //     });

  //     //IF THERE ARE NO MORE VALUES IN urlToProcess IT MEANS THAT THERE ARE NO MORE CHECKS TO BE PERFORMED
  //     //EXIT THE CHECK WITH EXIT CODE 0
  //     if (urlToProcess.length === 0) {
  //       console.log("--ENDING PROCESS-- ");
  //       process.exit(0);
  //     }
  //     //PASS THE FIRST ELEMENT OF urlToProcess BACK TO getUrlsWithin
  //     //REMOVING THAT ELEMENT urlToProcess AND ADDING IT TO checkedURLs
  //     else {
  //       var temp = urlToProcess[0];
  //       checkedURLs.push(temp);
  //       urlToProcess.splice(0, 1);
  //       getUrlsWithin(temp);
  //     }
  //   }
  // });
}