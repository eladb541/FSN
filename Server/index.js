const express = require('express');
const cors = require('cors');
const { connectDB, } = require('./configs/db');
const usersRouter = require('./routers/usersRouter');
const loginRouter=require('./routers/loginRouter')
const movieRouter=require('./routers/movieRouter')
const genresRouter=require('./routers/genresRouter')
const maxssidRouter=require('./routers/maxsidRouter')

const app = express();
const port = 8000;

connectDB();


app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/movies',movieRouter);
app.use('/genres',genresRouter);
app.use('/maxsId',maxssidRouter);






app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
