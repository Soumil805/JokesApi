import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON requests

let jokes = [
  {
    id: 1,
    jokeText: "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  },
  // ... (other jokes)
];

// 1. GET a random joke
app.get("/random", (req, res) => {
  const randomjoke = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomjoke]);
});

// 2. GET a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const joke = jokes.find((joke) => joke.id === id);
  if (joke) {
    res.json(joke);
  } else {
    res.status(404).json({ message: "Joke not found" });
  }
});

// 3. GET jokes by filtering on the joke type
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredJokes = jokes.filter((joke) => joke.jokeType === type);
  if (filteredJokes.length > 0) {
    res.json(filteredJokes);
  } else {
    res.status(404).json({ message: "No jokes found for this type" });
  }
});

// 4. POST a new joke
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeType: req.body.type,
    jokeText: req.body.text,
  };
  jokes.push(newJoke);
  res.status(201).json(newJoke);
});

// 5. PUT a joke (replace entirely)
app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = jokes.findIndex((joke) => joke.id === id);

  if (searchIndex !== -1) {
    const replacementJoke = {
      id,
      jokeType: req.body.type,
      jokeText: req.body.text,
    };
    jokes[searchIndex] = replacementJoke;
    res.json(replacementJoke);
  } else {
    res.status(404).json({ message: "Joke not found" });
  }
});

// 6. PATCH a joke (partially update)
app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);

  if (existingJoke) {
    const updatedJoke = {
      id: existingJoke.id,
      jokeType: req.body.type || existingJoke.jokeType,
      jokeText: req.body.text || existingJoke.jokeText,
    };
    const searchIndex = jokes.findIndex((joke) => joke.id === id);
    jokes[searchIndex] = updatedJoke;
    res.json(updatedJoke);
  } else {
    res.status(404).json({ message: "Joke not found" });
  }
});

// 7. DELETE a specific joke
app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = jokes.findIndex((joke) => joke.id === id);
  if (index > -1) {
    jokes.splice(index, 1);
    res.status(200).json({ message: "Joke deleted" });
  } else {
    res.status(404).json({ message: "Joke not found" });
  }
});

// 8. DELETE all jokes (protected by a key)
app.delete("/all", (req, res) => {
  const userkey = req.query.key;
  if (userkey === masterKey) {
    jokes = [];
    res.status(200).json({ message: "All jokes deleted" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
