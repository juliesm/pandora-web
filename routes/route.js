var PBAuto = require("pandora-node");
var http = require('http');

var pb = new PBAuto({ip: '10.45.114.39'});

var appRouter = function(app) {
 

app.get("/play2", function(req, res) {
    var assignOpacity = pb.getParam(2,7,'Opacity',function(res){
	var opacity = res.parameterValue;

	if (opacity==0) { 
		pb.assignResource(2, 7, 1, 8, false, false);
	}
	else {
		pb.assignResource(2, 8, 1, 5, false, false);
	}   

	pb.setSequenceTransportMode(2, 1, false); 

	pb.storeActiveToTime(2, 0, 0, 5, 0, false); 
 
}); 
    res.send('Assigned successfully');
});



// GET size
app.get("/size", function(req,res) {

		pb.getParam(2,7,'X Scale', function(resource) {
			var size = resource.parameterValue;

		res.send('' + size);
	})

});

// GET position
app.get("/position", function(req,res) {

		pb.getParam(2,7,'X Pos', function(resource) {
			var position = resource.parameterValue;

		res.send('' + position);
	})

});

/* Probably won't be needed anymore
// GET play
app.get("/play",function(req,res) {
	pb.setSequenceTransportMode(2,1,false);

	res.send("Played sucessfully :-)");
});
*/

// GET load
app.get("/load",function(req,res) {
	var path = "C:/coolux/content/Brennpunkt/ID01 Grafiken/BP-Junge.png";
	pb.addContentToPath(path, 1, 1, 10, "ID01 Grafiken", false);

	res.send('' + path);
});

// Assign Media
app.get("/media",function(req,res) {
	var assign = function(folderId, fileId) {
		//var folderId = 1;
		//var fileId = 1;
		pb.assignResource(2, 7, folderId, fileId, false, false);

		res.send("Assigned " + " Folder ID: " + folderId + " File ID: " + fileIde + " to 2.7");
	}
});

// GET thumbnails
app.get("/image", function(req,res) {

	pb.getTreeItemCount(function(resource){
		var count = resource.treeItemCount;

		res.send('' + count);
	})


});


/* Require and configure multer for image upload */
var multer = require('multer');
var upload = multer({
  storage: multer.diskStorage({
  destination: 'public/images/uploads/',
    filename: function(req,file,cb) {
      // overwrites the default multer renaming, saves file with original filename
      cb(null, file.originalname);
    }
  })
})


/*
* Route to upload images to Express server
*/
app.post('/upload', upload.array('file', 10), function(req, res) {
	// Log uploaded files array to the console
	console.log(req.files);
	files = req.files;
	// Send uploaded files array back to the application
	res.send(files);
});


//Get count variable 
app.get('/count', function(req,res,next) {
	var imageCount = JSON.parse(req.query.count);
	console.log("Query: ", req.query.count);
	startPy(imageCount);
	console.log("Image count to Python: ", imageCount);
});


function startPy(count) {
	/* Spawn child process to retrieve media info via Python */

var spawn = require('child_process').spawn,
    py    = spawn('python', ['pandora.py']);

    var myString = "";

  /* Every time the node application receives data from the python output stream (on 'data'), 
  convert that received data into a string and append it to the overall myString */
  py.stdout.on('data', function(data){
      myString += data.toString();
  });

  /* Error Handling */
  py.stderr.on('data', function(err) {
    console.log("This was an error, oops!" + err)
  });

  /* Write count to Python */
  py.stdin.write(JSON.stringify(count));
  //py.stdin.write(JSON.stringify(imageCount));

  /* End input stream after all data has been received */
  py.stdin.end();

  // Send the data (myString) to the application
app.get("/info", function(req,res) {
	console.log("Media from Route: ", myString);
	res.json(myString);
});

}


}


module.exports = appRouter;