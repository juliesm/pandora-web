/*
var spawn = require('child_process').spawn,
    pythonProcess = spawn('python', ['compute.py']);

pythonProcess.stdout.on('data', function(data) {
   console.log('stdout: ' + data);
});

pythonProcess.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

pythonProcess.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
*/






const spawn = require('child_process').spawn;
const scriptExecution = spawn("python.exe", ["compute.py"]);

// Handle normal output
scriptExecution.stdout.on('data', (data) => {
    console.log(String.fromCharCode.apply(null, data));
});

// Write data (remember to send only strings or numbers, otherwhise python wont understand)
var data = JSON.stringify([1,2,3,4,5]);
scriptExecution.stdin.write(data);
// End data write
scriptExecution.stdin.end();