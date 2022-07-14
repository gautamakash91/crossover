#! /usr/bin/env node
const { program } = require('commander')
var searchDomain = require("./src/routes/index");

program
  .command('search <domain>')
  .description('calling domain to search for URLs.')
  .option('-n <threads>', '')
  .action((domain, threads) => {
    if (threads.n) {
      //NEED TO CREATE MULTIPLE WORKERS AND PASS DATA TO THEM ONE BY ONE
      //** WAS NOT ABLE TO COMPLETE THIS PART ** 
      runSearch(domain);
    } else {
      //NO WORKER THREADS SPECIFIED. PROCEED WITH 1 WORKER. 
      runSearch(domain);
    }
  })

async function runSearch(domain) {
  const result = await searchDomain(domain)
  console.log(result);
}

program.parse()
