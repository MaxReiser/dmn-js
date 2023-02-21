var http = require('http')
var fs = require('fs')

const PORT = 8080
console.log('Startup Server at http://localhost:'+PORT);
console.log(process.cwd())
fs.readFile('util/gpt_modeler.html', function(error, html){
    if (error) throw error
    http.createServer(function(request, response){
        response.writeHeader(200, {'content-type':'text/html'});
        response.write(html);
        response.end();
    }).listen(PORT)
    console.log('listening')
});