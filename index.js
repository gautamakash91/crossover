let express = require("express");
let app = express();
let cors = require("cors");
const routes = require("./src/routes/index");
let config = require("./src/config/config");
let default_path = require("./src/routes/default");
const request = require('request');
const {
  Worker, isMainThread, parentPort, workerData
} = require('node:worker_threads');
require("dotenv").config();

app.set("port", config.PORT);
app.use(cors());

// console.log(process.argv);

app.listen(app.get("port"), function () {
  console.log("--STARTING PROCESS-- ");

  var checkedURLs = [], urlToProcess = [], domain = "", workers = 1;
  switch (process.argv.length) {
    case 2:
      console.log("Please provide the paramters required to run the app. Ex - node index.js -n 2 https://amazon.com");
      process.exit(1);
      break;
    case 3:
      domain = process.argv[2];
      break;
    case 4:
      domain = process.argv[3];
      workers = parseInt(process.argv[2]);
      break;
    default:
      console.log("Incorrect number of arguments passed.");
      break;
  }
  if (domain !== "") {
    // getUrlsWithin(domain);
  }




  const runService = (WorkerData) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./workerExample.js', { WorkerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`stopped with  ${code} exit code`));
      })
    })
  }

  const run = async () => {
    const result = await runService('hello node.js')
    console.log(result);
  }

  run().catch(err => console.error(err))


  //RECURSIVE FUNCTION TO FETCH HTML CONTENT OF THE URL 
  //AND TO FURTHER CHECK IF THE HTML HAS ANY DOMAIN URLS IN IT.
  function getUrlsWithin(url) {
    request(url, function (err, res, body) {
      if (err) {
        console.log(err, "error occurred while hitting URL");
      }
      else {
        // checkedURLs.push(url);
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
        }
      }
    });

  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);
app.use("/", default_path);