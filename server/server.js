const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});

const cloudwatch = new AWS.CloudWatch();

app.post("/apitest", (req, res) => {
  const { IP, startTime, endTime, period } = req.body;

  const params = {
    MetricName: "CPUUtilization",
    StartTime: new Date(startTime),
    EndTime: new Date(endTime),
    Period: parseInt(period),
    Namespace: "AWS/EC2",
    Statistics: ["Maximum"],
    Dimensions: [
      {
        Name: "Instance",
        Value: IP,
      },
    ],
  };
  cloudwatch.getMetricStatistics(params, (err, data) => {
    if (err) {
      console.error("Error fetching data from AWS CloudWatch:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
