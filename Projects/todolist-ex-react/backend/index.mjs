import express from 'express'
import cors from 'cors'
let app = express();
let PORT = 3000;

app.use(express.json());
app.use(cors())

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

app.get('/api/data',(req,res) => {
  res.status(200).json(users)
})
app.post('/api/data',(req,res) => {
  let body = req.body;

  let newUser = {
    id : users.length + 1,
    ...body,
  }
  users.push(newUser);
  res.status(201).json({ message: 'New user created!', data: newUser })

})

app.delete('/api/data/:id',(req,res) => {
    console.log(req.params.id)
    let userId = parseInt(req.params.id);
    let userIndex = users.findIndex(user => user.id == userId);

    if(userIndex !== -1){
      users.splice(userIndex,1);
      res.status(200).json({message : `Users with ID : ${userId} Deleted`})
    }
    else{
      res.status(404).json({message : `Users with ID : ${userId} not found`})
    }
})

app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}`)
})