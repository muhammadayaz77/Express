import express from 'express'

let app = express();
let users = [
  {id : 1,name : 'ali',email : 'ali@gmail.com'},
]
app.get('/',(req,res) => {
  res.json({users});
})

app.listen(3000,() => {
  console.log('http://localhost:3000')
})