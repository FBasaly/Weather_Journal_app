// To create enviroment packages
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* To add port*/
const port = process.env.PORT || 3000;
const app = express();

const projectData = {};

/* Middleware*/
// ading cors
app.use(cors());
// ading bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static("website"));

app.get("/api/v1/entry", (req, res) => {
  res.json(projectData);
});

app.post("/api/v1/entry", (req, res) => {
  const { temperature, date, feeling } = req.body;
  Object.assign(projectData, {
    temperature: `${temperature}°C`,
    date,
    feeling
  });

  res.status(201).json(projectData);
});

// Setup Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
