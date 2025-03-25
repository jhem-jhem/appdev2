const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

/** Logger using EventEmitter */ 
const emitter = new EventEmitter();

/** Event listener for logging */ 
emitter.on('log', (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  console.log(logMessage);

  const logFilePath = path.join(__dirname, 'logs', 'app.log');
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
});

emitter.on('log', (message) => {
  console.log(`Additional log handler: ${message}`);
});

function logEvent(message) {
  emitter.emit('log', message);
}

/** applying path module */
function createFile(filename, content, callback) {
  const filePath = path.join(__dirname, filename);
  fs.writeFile(filePath, content, callback);
}

function readFile(filename, callback) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, 'utf8', callback);
}

function updateFile(filename, content, callback) {
  const filePath = path.join(__dirname, filename);
  fs.appendFile(filePath, content, callback);
}

function deleteFile(filename, callback) {
  const filePath = path.join(__dirname, filename);
  fs.unlink(filePath, callback);
}

/** Creating HTTP server*/ 
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/create' && query.filename) {
    createFile(query.filename, query.content || '', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err.message}`);
      } else {
        logEvent(`File created: ${query.filename}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File created successfully');
      }
    });
  } else if (pathname === '/read' && query.filename) {
    readFile(query.filename, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err.message}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (pathname === '/update' && query.filename) {
    updateFile(query.filename, query.content || '', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err.message}`);
      } else {
        logEvent(`File updated: ${query.filename}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File updated successfully');
      }
    });
  } else if (pathname === '/delete' && query.filename) {
    deleteFile(query.filename, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err.message}`);
      } else {
        logEvent(`File deleted: ${query.filename}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File deleted successfully');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid route or missing parameters');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
