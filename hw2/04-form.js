// using express for this
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5001;

app.get("/form", (req, res) => {
  res.send(`
        <h1> A Very Cool Form</h1>

        <form action="/submit" method="POST">
            <label>Username:</label>
            <input type="text" name="username" required>

            <br><br>

            <label>Email:</label>
            <input type="email" name="email" required>

            <br><br>

            <label>Comments:</label>
            <textarea name="comments"></textarea>

            <br><br>

            <label>
            <input type="checkbox" name="newsletter" value="yes">
            Sign me up for the sweet newsletter!
            </label>

            <br><br>

            <button type="submit">Submit</button>
        </form>
        `);
});

app.post("/submit", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const comments = req.body.comments || "";
  const newsletter = req.body.newsletter === "yes" ? "Yes" : "No";

  res.send(`
        <h1>Submitted Information:</h1>
        <p>Username: ${username || ""}</p>
        <p>Email: ${email || ""}</p>
        <p>Comments: ${comments}</p>
        <p>Newsletter signup: ${newsletter}</p>
        `);
});

// for any other URL
app.use((req, res) => {
  res.status(404).send("404 - page not found");
});

// starting server up
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
