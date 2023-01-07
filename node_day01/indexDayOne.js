const http = require("http");
const express = require("express");
const app = express();
app.use(express.json()); // used to get data back through the json body

const cats = [
  {
    id: "abys",
    name: "Abyssinian Cat",
  },
  {
    id: "bob",
    name: "Bob cat",
  },
];

app.get("/breeds", (req, res) => {
  console.log(req.headers);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(cats));
});

app.get("/breeds/:breedId", (req, res) => {
  const catBreedId = req.params["breedId"];
  console.log(catBreedId);
  res.setHeader("Content-Type", "application/json");
  // for (let x = 0; x < cats.length; x++) {
  //   if (catBreedId == cats[x].id) {
  //     res.send(JSON.stringify(cats[x]));
  //   }
  // }
  const catToLookFor = cats.find((c) => c.id == catBreedId);
  if (catToLookFor) {
    res.send(JSON.stringify(catToLookFor));
  } else {
    res.status(404).send("Not Found");
  }
});

app.delete("/breeds/:breedId", (req, res) => {
  const catBreedId = req.params["breedId"];
  console.log(catBreedId);
  const catToLookFor = cats.findIndex((c) => c.id == catBreedId);
  console.log(catToLookFor);
  cats.splice(catToLookFor, 1);
  console.log(cats);
  res.send("The Breed was deleted successfully");
});

app.post("/breeds", (req, res) => {
  const newCatData = req.body;
  // console.log(newCatData);
  const existingCatBreed = cats.find((c) => c.id == newCatData.id);
  if (existingCatBreed) {
    res.status(400).send("Breed already exists");
  } else {
    cats.push(newCatData);
    res.send("The Breed was added successfully");
  }
});

app.put("/breeds/", (req, res) => {
  const catBreedId = req.params["breedId"];
  console.log(catBreedId);
  const catData = req.body;
  console.log(catData);
  const catToLookFor = cats.findIndex((c) => c.id == catBreedId);
  if (catToLookFor) {
    catToLookFor.name = catData.name;
    res.status(200).send("The Breed name was updated successfully");
  } else {
    res.status(404).send("Breed not found");
  }
});

const server = http.createServer(app);

server.listen(3000, "127.0.0.1", () => {
  console.log("Server started successfully");
});
// setHeader method sets the value of an HTTP header for the current response.
