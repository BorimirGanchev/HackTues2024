const http = require('http');
const url = require('url');
const axios = require('axios');
const config = require('./config.json');

class API {
  getIndexAfterServiceName(subRoute) {
    for (let i = 1; i < subRoute.length; i += 1) {
      if (subRoute[i] === '/') {
        return i;
      }
    }
    return subRoute.length; // Return the length if no '/' is found
  }

  getServiceUrl(subRoute) {
    const serviceName = subRoute.slice(1, this.getIndexAfterServiceName(subRoute));
    return config[serviceName]?.redirect_url || null; // Use optional chaining and provide a default value
  }

  async sendReq(reqConfig) {
    try {
      const response = await axios(reqConfig);
      return response;
    } catch (error) {
      throw new Error(`Error sending request: ${error.message}`);
    }
  }
}

const api = new API();

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  let requestBody = '';

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', async () => {
    console.log('Requested URL:', parsedUrl.pathname);
    console.log('Request Body:', requestBody);
    console.log('Request Method:', req.method);

    const targetUrl = api.getServiceUrl(parsedUrl.pathname);

    if (!targetUrl) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Service not found\n');
      return;
    }

    try {
      const axiosConfig = {
        method: req.method,
        url: targetUrl + parsedUrl.pathname,
        data: requestBody,
        headers: req.headers,
      };

      const response = await api.sendReq(axiosConfig);

      res.writeHead(response.status, response.headers);
      res.end(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error\n');
    }
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
