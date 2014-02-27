var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable=require("formidable");
var fs = require("fs");

function start(response,request){
	console.log("Request handler 'start' was called."); 

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html;'+
		'charset=UTF-8"/>'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="upload" multiple = "multiple"/>'+
		// '<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text2" />'+
		'</form>'+
		'</body>'+
		'</html>'


	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end(); 
}


function upload(response,request){
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	form.uploadDir = 'd:/git/node/tmp';
	console.log("about to parse");
	form.parse(request,function(error,fields,files){
		console.log("parsing done");
		console.log(files);
		fs.renameSync(files.upload.path,"d:/git/node/tmp/test.png");
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("Received image:<br/>");
		response.write("<img src = '/show'/>");
		response.end(); 
	})
}

function show(response,request){
	console.log("Request handler 'show' was called.");

	fs.readFile("tmp/test.png","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end(); 
		}
		else{
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(file,"binary");
			response.end(); 
		}

	});
}


function block(response,request){
	console.log("Request handler 'block' was called.");

	 exec("dir ",function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(stdout);
		response.end(); 
	 })


}


exports.start = start;
exports.upload = upload;
exports.show = show;
exports.block = block;