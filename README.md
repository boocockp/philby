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

- Clone this repository
- Run `npm install`
- Start Philby: run `node src/testProxy <test-dir>`  (or use the `startProxy.sh` script on OS X).  It prints out the port it is running on.
- Configure a new user profile for your browser to run a separate instance that uses Philby as its proxy server.  
   You will have to look up how to do this for your browser - it seems to be easiest for Chrome.  On OS X you can use the `startChrome.sh` script.
- Open a test page by typing  `<target-host>/<path-to-test-file>` in the address bar
   
Examples
--------

The Horse Data example.