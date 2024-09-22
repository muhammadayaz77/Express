import express from 'express'

let app = express();
let users = [
  {id : 1,name : 'ali',email : 'ali@gmail.com'},
]
app.get('/',(req,res) => {
  res.status(200).json({users});
})
app.post('/api/users',(req,res) => {
  res.json({message : 'data is posted',data : req.body});
})

app.listen(3000,() => {
  console.log('http://localhost:3000')
})