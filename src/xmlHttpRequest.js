// 1. Create a new XMLHttpRequest object
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
//    and Send the request over the network
xhr.open('GET', 'https://adventofcode.com/2019/day/2/input');
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.loaded} bytes`); // no Content-Length
  }
};

xhr.onerror = function() {
  console.log("Request failed");
};