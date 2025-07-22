const httpServer = require('http-server');
require('dotenv').config();

// Parse command line arguments
const args = process.argv.slice(2);
let directory = process.env.PROTOCOL || 'reproschema-demo-protocol';
let port = process.env.BACKEND_PORT || 3508;

// Check for command line arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--protocol' && args[i + 1]) {
    directory = args[i + 1];
    i++; // Skip next argument since we used it
  } else if (args[i] === '--port' && args[i + 1]) {
    port = parseInt(args[i + 1]);
    i++; // Skip next argument since we used it
  } else if (args[i] === '--help') {
    console.log('Usage: node server.js [--protocol <directory>] [--port <port>]');
    console.log('  --directory <directory>  Directory to serve (default: from .env or demo-protocol)');
    console.log('  --port <port>           Port to serve on (default: from .env or 3508)');
    console.log('  --help                  Show this help message');
    process.exit(0);
  }
}

console.log(`Starting http-server, serving ${directory} on port ${port}`);

const server = httpServer.createServer({
  root: directory,
  port: port,
  cors: true,
  cache: -1, // Disable caching
  showDir: true,
  autoIndex: true
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Serving files from: ${directory}`);
});
