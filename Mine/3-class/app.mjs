import express from 'express'
import usermodel from './usermodel.mjs'
let app = express();

app.get('/',(req,res) => {
  res.send('Get Data');
})
app.get('/create',async (req,res) => {
  let createdUser = await usermodel.create({
    name : 'khan',
    username : 'ayaz',
    email : 'ayaz@gmail.com'
  })
  res.send(createdUser)
})
app.get('/update',async (req,res) => {
  let updateUser = await usermodel.findOneAndUpdate({name : 'ayaz'},{name : 'khan wali'},{new : true})
  res.send(updateUser)
})
app.get('/read',async (req,res) => {
  let users = await usermodel.find();
  res.send(users)
})
app.get('/delete',async (req,res) => {
  let deletedUser = await usermodel.findOneAndDelete({name : "khan wali"});
  res.send(deletedUser)
})

app.listen(3000,() => {
  console.log('http://localhost:3000')
})