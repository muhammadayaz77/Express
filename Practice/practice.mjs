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


import express from 'express'

let app = express();
app.use(express.json());
app.get('/',(req,res) => {
  res.json({message : 'Home Page'});
})
app.post('/',(req,res) => {
  res.json({data : req.body});
})
app.put('/:id',(req,res) => {
  res.json({id : req.params.id,data : req.body});
})

app.listen(3000,() => {
  console.log(`http://localhost:3000`);
})