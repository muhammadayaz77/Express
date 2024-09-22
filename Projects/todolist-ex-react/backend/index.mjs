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

app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}`)
})