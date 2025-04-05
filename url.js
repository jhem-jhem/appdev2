const url = require('url');

const myUrl = 'http://www.example.com:8080/pathname?name=JohnDoe#fragment';

const parsedUrl = url.parse(myUrl);

console.log('Parsed URL:', parsedUrl);

const queryParams = new URLSearchParams(parsedUrl.query);
console.log('Name parameter:', queryParams.get('name'));
