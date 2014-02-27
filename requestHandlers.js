var exec = require("child_process").exec;

function start(response){
	console.log("Request handler 'start' was called.");

	// add block
	function sleep(milliSeconds){
		var startTime = new Date().getTime();
		while(new Date().getTime()<startTime+milliSeconds);
	}
	sleep(10000);


	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hi Start");
	response.end(); 
}


function upload(response){
	console.log("Request handler 'upload' was called.");

	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hi upload");
	response.end(); 
}


function block(response){
	console.log("Request handler 'block' was called.");

	 exec("dir ",function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(stdout);
		response.end(); 
	 })


}


exports.start = start;
exports.upload = upload;
exports.block = block;