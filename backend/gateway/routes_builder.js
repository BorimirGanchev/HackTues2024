const fs = require("fs");

const microservices = JSON.parse(fs.readFileSync("microservices.json", "utf8"));

for (const serviceName in microservices) {
  const serviceConfig = microservices[serviceName];
  const baseURL = serviceConfig.baseURL;
  const routes = serviceConfig.routes;
  console.log(baseURL);
  for (const route in routes) {
    const sub_route = microservices[serviceName]["routes"][route]["url"];
    console.log("----");
    const method = microservices[serviceName]["routes"][route]["method"];
    console.log(sub_route, method);
  }
}
