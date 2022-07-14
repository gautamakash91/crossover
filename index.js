#! /usr/bin/env node
const { program } = require('commander')
var searchDomain = require("./src/routes/index");

program
  .command('search <domain>')
  .description('calling domain without workers')
  .option('-n <threads>', '')
  .action((domain, threads) => {
    if (threads.n) {
      //NEED TO CREATE MULTIPLE WORKERS AND PASS DATA TO THEM ONE BY ONE
      searchDomain(domain);
    } else {
      //NO WORKER THREADS SPECIFIED. PROCEED WITH 1 WORKER. 
      searchDomain(domain);
    }
  })

program.parse()
