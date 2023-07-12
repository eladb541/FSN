const express = require('express');
const cors = require('cors');
const { connectDB, } = require('./configs/db');
const usersRouter = require('./routers/usersRouter');
const loginRouter=require('./routers/loginRouter')
const movieRouter=require('./routers/movieRouter')
const genresRouter=require('./routers/genresRouter')
const maxssidRouter=require('./routers/maxsidRouter')
const membersRouter=require('./routers/membersRouter')
const subscribesRouter=require('./routers/subscribesRouter')
const adminRouter=require('./routers/adminRouter')
const checkduplicateRouter=require('./routers/checkduplicateRouter')




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
app.use('/members',membersRouter);
app.use('/subscribes',subscribesRouter);
app.use('/admin',adminRouter);
app.use('/checkd',checkduplicateRouter)





app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
