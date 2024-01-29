const express = require("express");
const fs = require("fs");
const path = require("path");
const cityList = require("./citiesList");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://Max-Admin:Max-Admin@cluster-1.5mgi6n1.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "PikudHaoref",
    }
  )
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });

const alertSchema = mongoose.Schema({
  city: String,
  time: Date,
  area: String,
});

const YourModel = mongoose.model("Alerts", alertSchema);

async function saveManyDocs(docs) {
  try {
    // Using the create method to insert many documents at once
    const result = await YourModel.create(docs);
    console.log("Documents saved:", result.length);
  } catch (error) {
    console.error("Error saving documents:", error);
  }
}

const filePath = path.join(__dirname, "result.json");

app.get("/", (req, res) => {
  res.send("Hello, this is a simple Express app!");
});

app.get("/data", async (req, res) => {
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const jsonArray = JSON.parse(data);
      const formatedAlerts = formatJson(jsonArray);
      const finalAlerts = separeteAlerts(formatedAlerts);
      await saveManyDocs(finalAlerts);
      // res.json(finalAlerts);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const separeteAlerts = (alerts) => {
  const finalAlerts = [];
  alerts.forEach((alert) => {
    date = alert.date;
    area = alert.area;
    alert.cityList.forEach((city) => {
      finalAlerts.push({
        time: date,
        area: area,
        city: city,
      });
    });
  });
  return finalAlerts;
};

function filterStringByArray(inputString, filterArray) {
  const filteredWords = [];

  for (const filterWord of filterArray) {
    if (inputString.includes(filterWord)) {
      filteredWords.push(filterWord);
    }
  }

  return filteredWords;
}

const formatJson = (data) => {
  const alerts = [];
  data.forEach((alert) => {
    if (
      alert.text_entities.length !== 0 &&
      alert.text_entities[0].text === "🔴 צבע אדום"
    ) {
      let dateText = alert.text_entities[2].text;
      let alertsArray = arrangeTimeAreaCities(alert.text_entities);
      let currentAlertsFormated = arrangeFinalAlerts(dateText, alertsArray);
      alerts.push(...currentAlertsFormated);
    }
  });
  return alerts;
};

function removeParentheses(dateString) {
  const formattedDate = dateString.replace(/[()]/g, "");
  return formattedDate;
}

function removeCharacters(inputString, charsToRemove) {
  let stringWithoutChars = inputString;
  charsToRemove.forEach((char) => {
    const regex = new RegExp(char, "g");
    stringWithoutChars = stringWithoutChars.replace(regex, "");
  });
  return stringWithoutChars;
}

const arrangeFinalAlerts = (dateText, alertsArray) => {
  const finalAlerts = [];
  alertsArray.forEach((alert) => {
    finalAlerts.push({
      date: createDateObject(
        removeParentheses(dateText),
        removeCharAtIndex(alert.timeText, alert.timeText.length - 1)
      ),
      area: removeCharacters(alert.area, ["•", ":"]).trim(),
      // cityList:alert.cityList,
      cityList: filterStringByArray(alert.cityList, cityList.cityList),
    });
  });
  return finalAlerts;
};

function createDateObject(dateString, timeString) {
  const [day, month, year] = dateString.split("/").map(Number);
  const [hours, minutes] = timeString.split(":").map(Number);

  // Creating a date string in ISO format: yyyy-mm-ddThh:mm
  const isoString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  // Creating the Date object from the ISO string in UTC
  const dateObject = new Date(`${isoString}Z`);
  return dateObject;
}

function removeCharAtIndex(inputString, indexToRemove) {
  const stringWithoutChar =
    inputString.slice(0, indexToRemove) + inputString.slice(indexToRemove + 1);
  return stringWithoutChar;
}

const arrangeTimeAreaCities = (alertText) => {
  const alertsObjects = [];
  let time = "";
  let area = "";
  let cities = "";
  for (let i = 4; i < alertText.length; i++) {
    if (alertText[i].type === "italic") {
      time = alertText[i].text;
    } else {
      if (alertText[i].type === "bold") {
        area = alertText[i].text;
      } else {
        if (
          alertText[i].type === "plain" &&
          alertText[i].text !== "" &&
          alertText[i].text !== "\n"
        ) {
          cities = alertText[i].text;
        }
      }
    }
    if (area !== "" && cities !== "") {
      alertsObjects.push({ timeText: time, area: area, cityList: cities });
      area = cities = "";
    }
  }
  return alertsObjects;
};
