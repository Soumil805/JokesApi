import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON requests

// 1. GET a random joke
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// 2. GET a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const joke = jokes.find((j) => j.id === id);
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

// 4. POST a new joke with setup and delivery
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeType: req.body.type,
    setup: req.body.setup,
    delivery: req.body.delivery,
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
      setup: req.body.setup,
      delivery: req.body.delivery,
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
      setup: req.body.setup || existingJoke.setup,
      delivery: req.body.delivery || existingJoke.delivery,
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
  console.log(`Server started on port ${port}`);
});

var jokes = [
  {
    id: 1,
    setup: "Why don't scientists trust atoms?",
    delivery: "Because they make up everything.",
    jokeType: "Science",
  },
  {
    id: 2,
    setup: "Why did the scarecrow win an award?",
    delivery: "Because he was outstanding in his field.",
    jokeType: "Puns",
  },
  {
    id: 3,
    setup: "I told my wife she was drawing her eyebrows too high.",
    delivery: "She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 4,
    setup: "What did one ocean say to the other ocean?",
    delivery: "Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 5,
    setup: "Why do we never tell secrets on a farm?",
    delivery: "Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 6,
    setup: "How do you organize a space party?",
    delivery: "You planet!",
    jokeType: "Science",
  },
  {
    id: 7,
    setup: "Why don't some couples go to the gym?",
    delivery: "Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 8,
    setup: "Parallel lines have so much in common.",
    delivery: "It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 9,
    setup: "What do you call fake spaghetti?",
    delivery: "An impasta!",
    jokeType: "Food",
  },
  {
    id: 10,
    setup: "Why did the tomato turn red?",
    delivery: "Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 11,
    setup: "What do you get when you cross a snowman and a vampire?",
    delivery: "Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 12,
    setup: "Why did the golfer bring two pairs of pants?",
    delivery: "In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 13,
    setup: "Why are ghosts bad at lying?",
    delivery: "Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 14,
    setup: "Why can't you give Elsa a balloon?",
    delivery: "Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 15,
    setup: "I'm reading a book about anti-gravity.",
    delivery: "It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 16,
    setup: "Why did the coffee file a police report?",
    delivery: "It got mugged.",
    jokeType: "Food",
  },
  {
    id: 17,
    setup: "What did one ocean say to the other?",
    delivery: "Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 18,
    setup: "Why did the stadium get hot after the game?",
    delivery: "All the fans left.",
    jokeType: "Sports",
  },
  {
    id: 19,
    setup: "Why don’t eggs tell jokes?",
    delivery: "Because they’d crack each other up.",
    jokeType: "Food",
  },
  {
    id: 20,
    setup: "Why was the math book sad?",
    delivery: "It had too many problems.",
    jokeType: "Math",
  }
];