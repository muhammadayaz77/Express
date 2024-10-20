// import express from "express"

// let app = express();
// app.use(express.json())
// app.get('/api/data',(req,res) => {
//   res.json({message : 'Home Page'});
// })
// app.post('/api/data',(req,res) => {
//   console.log(req.body)
//   res.json({message : 'Home Page',body : req.body});
// })
// app.put('/api/data/:ids',(req,res) => {
//   console.log(req.params.ids)
//   res.json({message : 'Home Page',body : req.body,id : req.params.ids});
// })
// app.delete('/api/data/:ids',(req,res) => {
//   console.log(req.params.ids)
//   res.json({message : 'Home Page',body : req.body,id : req.params.ids});
// })

// app.listen(3000,() => {
//   console.log('http://localhost:3000')
// })


// import express from 'express'

// let app = express();
// app.use(express.json());
// app.get('/',(req,res) => {
//   res.json({message : 'Home Page'});
// })
// app.post('/',(req,res) => {
//   res.json({data : req.body});
// })
// app.put('/:id',(req,res) => {
//   res.json({id : req.params.id,data : req.body});
// })

// app.listen(3000,() => {
//   console.log(`http://localhost:3000`);
// })


// import express from 'express'
// import cors from 'cors'
// let app = express();
// app.use(express.json());
// app.use(cors());

// let users = [
//   {id : 1,name : 'ali' , email : 'ali@gmail.com',},
//   {id : 2,name : 'fahad' , email : 'fahad@gmail.com',}
// ]

// app.get('/api/data',(req,res) => {
//   res.json(users)
// })

// app.post('/api/data',(req,res) => {
//   let newData = {
//     id : users.length + 1,
//     ...req.body
//   }
//   users.push(newData);
//   res.status(200).json(users);
// })
// app.delete('/api/data/:id',(req,res) => {
//   let userId = parseInt(req.params.id);
//   let updatedUser = users.filter(user => user.id !== userId);
//   users = updatedUser
//     res.json({message : 'data is deleted'});
// })
// app.put('/api/data/:id',(req,res) => {
//   let userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
//   if(userIndex !== -1)
//   {
//     let newUser = {
//         ...users[userIndex],
//         ...req.body,
//     }
//     users[userIndex] = newUser;
//     res.status(200).json(users)    
//   }
//   else{
//     res.status(404).json({message : 'Something went wrong'});
//   }

// })
// app.listen(3000,() => {
//   console.log('http://localhost:3000');
// })

// import express from 'express'
// import cors from 'cors'
// let PORT = 3000;
// let users = [
//   {id : 1,name : 'ali',email : 'ali@gmail.com'},
//   {id : 2,name : 'ayaz',email : 'ayaz@gmail.com'},
// ]

// let app = express();
// app.use(express.json());
// app.use(cors());


// app.get('/api/users',(req,res) => {
//   res.status(200).json(users)
// })
// app.post('/api/users',(req,res) => {
//   let body = req.body;
//   let newObj = {
//     id : users.length + 1,
//     ...body
//   }
//   users.push(newObj);
//   res.json({message : `data has been post`,data: newObj})
// })
// app.delete('/api/users/:id',(req,res) => {
//     let userId = parseInt(req.params.id);
//     let userIndex = users.findIndex(item => item.id == userId);
//     if(userIndex != -1){
//       users = users.filter(item => item.id !== userId);
//       res.status(200).json({message : `data of Id : ${userId} deleted`});
//     }
//     else{
//       res.status(404).json({message : 'id is invalid'});
//     }
// })
// app.put('/api/users/:id',(req,res) => {
//     let userId = parseInt(req.params.id);
//     let userIndex = users.findIndex(item => item.id == userId);
//     if(userIndex != -1){
//       let newObj = {...users[userIndex],...req.body};
//       users[userIndex] = newObj;
      
//       res.status(200).json({message : `data of Id : ${userId} update`});
//     }
//     else{
//       res.status(404).json({message : 'id is invalid',id:userId});
//     }
// })

// app.listen(PORT,() => {
//   console.log(`http://localhost:${PORT}`);
// })

import express from 'express'
import mongoose  from 'mongoose'
import cors from 'cors'
let app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/user-management');
let userSchema = new mongoose.Schema({
  name : String,
  email : String,
})
let userModel = mongoose.model('Userr',userSchema);

app.post('/users', async (req, res) => {
  try {
      const user = new userModel(req.body);
      await user.save();
      res.status(201).send(user);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
});
app.get('/users', async (req, res) => {
  try {
      const users = await userModel.find();
      res.status(200).send(users);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});
app.delete('/users/:id', async (req, res) => {
  try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});
app.put('/users/:id', async (req, res) => {
  try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
});
app.listen(3000,() => {
  console.log('http://localhost:3000');
})