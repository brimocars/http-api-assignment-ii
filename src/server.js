const http = require('http');
const clientHandler = require('./clientHandler.js');
const dataHandler = require('./dataHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request) => {
  const body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  return new Promise((resolve, reject) => {
    request.on('error', (err) => {
      console.dir(err);
      reject(err);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      resolve(JSON.parse(bodyString));
    });
  });
};

const onRequest = async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  const baseUrl = req.url.split('?')[0];

  switch (baseUrl) {
    case '/':
      clientHandler.getIndex(req, res);
      break;
    case '/style.css':
      clientHandler.getStyle(req, res);
      break;
    case '/getUsers':
      dataHandler.getUsers(res);
      break;
    case '/addUser':
      req.body = await parseBody(req);
      dataHandler.addUser(req, res);
      break;
    case '/notReal':
      dataHandler.get404(req, res);
      break;
    default:
      dataHandler.get404(req, res);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
