const express = require('express');
const cors = require('cors');
const { connectDB, } = require('./configs/db');
const usersRouter = require('./routers/usersRouter');
const loginRouter=require('./routers/loginRouter')
const movieRouter=require('./routers/movieRouter')

const app = express();
const port = 8000;

connectDB();


app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/movies',movieRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
