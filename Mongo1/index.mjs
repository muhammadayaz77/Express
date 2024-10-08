import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
let app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(`mongodb://localhost:27017/mongo-user`);
let userSchema = mongoose.Schema({
  name : String,
  email : String,
})
let User = mongoose.model('user',userSchema);


app.post('/users',async (req,res) => {
 try {
  let user = new User(req.body);
  await user.save();
  res.status(201).send(user);
 } catch (error) {
  res.status(400).send({ error: error.message });
 }
})

app.get('/users',async (req,res) => {
    try {
      let users = await User.find();
    res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }

})
app.put('/users/:id',async (req,res) => {
    let updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(updateUser);
})
app.listen(3000,() => {
  console.log('http://localhost:3000');
})