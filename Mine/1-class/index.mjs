import express from "express";
const app = express();
app.use((req,res,next) => {
  console.log('Middleware chala');
  next();
})
app.use((req,res,next) => {
  console.log('Middleware chala per se');
  next();
})
app.get('/',(req,res) => {
  res.send('Home Page')
})
app.get('/profile',(req,res,next) => {
  return next(new Error('Something went wrong'))
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(3000,() => {
  console.log('http://localhost:3000')
})