const express = require("express");
const axios = require("axios");
const config = require("./config.json");
const cors = require("cors");
class API {
  getIndexAfterServiceName(subRoute) {
    for (let i = 1; i < subRoute.length; i += 1) {
      if (subRoute[i] === "/") {
        return i;
      }
    }
    return subRoute.length;
  }

  getServiceUrl(subRoute) {
    const serviceName = subRoute.slice(
      1,
      this.getIndexAfterServiceName(subRoute)
    );
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
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all("*", async (req, res) => {
  const parsedUrl = req.originalUrl;

  console.log("Requested URL:", parsedUrl);
  console.log("Request Body:", req.body);
  console.log("Request Method:", req.method);

  const targetUrl = api.getServiceUrl(parsedUrl);
  console.log("Target URL:", targetUrl + parsedUrl);

  if (!targetUrl) {
    res.status(404).send("Service not found\n");
    return;
  }

  try {
    const axiosConfig = {
      method: req.method,
      url: targetUrl + parsedUrl,
      data: req.body,
      headers: {
        accept: req.headers.accept,
        "User-Agent": req.headers["user-agent"],
      },
    };
    console.log("before", axiosConfig);
    const response = await api.sendReq(axiosConfig);
    console.log("response", response);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error\n");
  }
});

const port = 7000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
