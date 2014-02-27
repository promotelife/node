

function route(handle,pathname,response,request)
{
	console.log("About to route a reauest for "+ pathname);

	if (typeof handle[pathname] === 'function'){
		handle[pathname](response,request);
	}
	else{
		console.log("No request handler found for " + pathname);
		return "404 Not Found";

		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("404 Not Found");
		response.end(); 
	}
}

exports.route=route;