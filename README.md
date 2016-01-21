Philby
======

Philby is a simple proxy server that allows you to run website functional tests, or website automation scripts, directly in a browser, using ordinary JavaScript tools.

The Problem
-----------

There are many tools for running tests in browsers, and they have been widely used for unit tests for years.

But creating tests to run in a browser against another website runs into difficulties very quickly, because of the same origin rule.
Your test page can load easily a page from the target website in an iframe, but you can't get at the content of the iframe if it comes from a different host.

How Philby helps
----------------

Philby makes your test page look as if it came from the target website, so if the test loads a target page in a frame, it has complete freedom to interact with the content.
You can then write your test, using any tools you like, such as Mocha.  
You can use jQuery in your test page to find, update and inspect elements in the page under test, whether the target site uses it or not.

How it works
------------

- First you start Philby, pointing it to the directory containing your test pages and scripts.  
- Then you start the browser using Philby as its proxy server - see below.
- You open the test page by requesting a URL with the target host name and the path to its file in the test directory.
- Any request (for any host) whose path matches a file in the local directory is served from there; other requests are passed on to the target host.
- The browser thinks that both the test pages and the real pages all come from the target website, which
 satisfies the same origin rule, so JavaScript running in the test page can access the content of pages or Ajax requests loaded from the target site.

Getting started
---------------

- You will need node.js installed
- Clone this repository
- Run `npm install`
- Start Philby: run `node src/philby <test-dir>`  (or use the `startProxy.sh` script on OS X).  It prints out the port it is running on.
- Configure a new user profile for your browser to run a separate instance that uses Philby as its proxy server.  
   You will have to look up how to do this for your browser - it seems to be easiest for Chrome.  On OS X you can use the `startChrome.sh` script.
- Open a test page by typing  `<target-host>/<path-to-test-file>` in the address bar
- To stop Philby: find the process and kill it (or use the `killphil.sh` script on OS X)
   
Examples
--------

### Horse Data

This example is a tool built for a real world problem: assisting the collection of data on race horse performance for a scientific research project.
It lets you search for a list of horse names on the UK Racing Post website.  For each name, you may get multiple results, so you can click on the correct one.  
It then displays the statistics page for that horse from the website, and extracts from it the numbers of interest and puts them into the results table.
The code is all contained in the `horseData.html` file.  So long as you request this file from www.racingpost.com via Philby, 
it has access to the ajax calls and the content of the horse statistics iframe.

Run the `start.sh` script (on OS X) to see the tool in action.

#### Test
There is also a functional test for the tool, written with Mocha and jQuery.  The main test runner page is `test/SearchTest.html`.  
The test loads `horseData.html` in an iframe, again requesting it from www.racingpost.com to ensure access to everything it needs.
At the end, the test uploads a summary of the results to Philby to save in a local file.  
This gives a way of communicating the test results back to the test host, so that it could be used in a continuous integration build. 

Run the `test.sh` script (on OS X) to see the tool in action.
