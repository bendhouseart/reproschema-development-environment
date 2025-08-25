const httpServer = require('http-server');
const { exec } = require('child_process');
require('dotenv').config();

// Function to kill process on a specific port
function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    exec(`lsof -ti:${port}`, (error, stdout, stderr) => {
      if (error) {
        // No process found on port, which is fine
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }
      
      const pids = stdout.trim().split('\n').filter(pid => pid);
      if (pids.length === 0) {
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }
      
      console.log(`Found process(es) on port ${port}: ${pids.join(', ')}`);
      
      // Kill each process
      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, (killError) => {
          if (killError) {
            console.log(`Failed to kill process ${pid}: ${killError.message}`);
          } else {
            console.log(`Killed process ${pid}`);
          }
        });
      });
      
      // Wait a moment for processes to be killed
      setTimeout(resolve, 1000);
    });
  });
}

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

// Kill any existing process on the port before starting
async function startServer() {
  try {
    await killProcessOnPort(port);
    
    const server = httpServer.createServer({
      root: directory,
      port: port,
      cors: true,
      cache: -1, // Disable caching
      showDir: true,
      autoIndex: true
    });

    process.env.REPROSCHEMA_GITHUB_SRC = `http://localhost:${port}`;

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Serving files from: ${directory} at http://localhost:${port}`);
      console.log(`REPROSCHEMA_GITHUB_SRC: ${process.env.REPROSCHEMA_GITHUB_SRC}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
