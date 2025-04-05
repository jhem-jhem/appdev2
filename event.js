const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
  console.log('Application Started!');
});

eventEmitter.on('data', (data) => {
  console.log(`Data received: ${JSON.stringify(data)}`);
});

eventEmitter.on('error', (error) => {
  console.error(`Error occurred: ${error}`);
});

eventEmitter.emit('start');
eventEmitter.emit('data', { name: 'John Doe', age: 25 });

eventEmitter.emit('error', 'Boss may mali ka ngani');


