INSTRUCTIONS ON HOW TO RUN THE PROGRAM. 

please execute the command "npm i -g" to install the cli. This will install a CLI with the keyword crawl. 

You can use the command "crawl --help" to see the possible cli commands. 

crawl search <domain>

crawl search <domain> -n <threads>
//APOLOGIES, I RAN OUT OF TIME TO IMPLEMENT THREADS

example usage: crawl search https://www.flipkart.com

NOTE: some website like https://www.amazon.com were able to detect that their page is being crawled and it is returning a message to use amazon apis to extract data from their domain. But the example of flipkart in the example usage works well. 