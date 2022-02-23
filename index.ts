import express from "express";
import { usersRouter } from "./users/users";

const port = 5000;

const app = express();

app.route('/hello')
  .get((req, res) => {
    res.send('Hello get');
  })
  .post((req, res) => {
    res.send('Hello post');
  });

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
