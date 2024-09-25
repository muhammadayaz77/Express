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


import express from 'express'
import cors from 'cors'
let app = express();
app.use(express.json());
app.use(cors());

let users = [
  {id : 1,name : 'ali' , email : 'ali@gmail.com',},
  {id : 2,name : 'fahad' , email : 'fahad@gmail.com',}
]

app.get('/api/data',(req,res) => {
  res.json(users)
})

app.post('/api/data',(req,res) => {
  let newData = {
    id : users.length + 1,
    ...req.body
  }
  users.push(newData);
  res.status(200).json(users);
})
app.delete('/api/data/:id',(req,res) => {
  let userId = parseInt(req.params.id);
  let updatedUser = users.filter(user => user.id !== userId);
  users = updatedUser
    res.json({message : 'data is deleted'});
})
app.put('/api/data/:id',(req,res) => {
  let userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if(userIndex !== -1)
  {
    let newUser = {
        ...users[userIndex],
        ...req.body,
    }
    users[userIndex] = newUser;
    res.status(200).json(users)    
  }
  else{
    res.status(404).json({message : 'Something went wrong'});
  }

})
app.listen(3000,() => {
  console.log('http://localhost:3000');
})