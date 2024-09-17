import express from "express";
const app = express();

app.get('/',(req,res) => {
  res.send('Home Page')
})
app.get('/profile',(req,res) => {
  res.send('Profile Page')
})

app.listen(300,() => {
  console.log('http://localhost:3000')
})