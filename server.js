
var http = require("http");
var url = require("url");
function start(route,handle){
	function onRequest(request,response)
	{	
		var pathname = url.parse(request.url).pathname;
		if(pathname!="/favicon.ico"){
			console.log("Request for "+pathname+" received.");

			// route(handle,pathname);
			route(handle,pathname,response);
		}

	}	

	http.createServer(onRequest).listen(8888);
	console.log("服务器运行在 http://127.0.0.1:8888");
}

exports.start=start;