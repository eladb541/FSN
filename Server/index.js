const express = require('express');
const cors = require('cors');
const { connectDB,keyDB } = require('./configs/db');
const usersRouter = require('./routers/usersRouter');
const loginRouter=require('./routers/loginRouter')

const app = express();
const port = 3000;

connectDB();
keyDB();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/login',loginRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
