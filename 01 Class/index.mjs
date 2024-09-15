import express from 'express';
let app = express(); 

const PORT = 3000;
app.use(express.json());
app.get('/',(req,res) => {
  res.json({message : 'This is Home Page'});
})
app.get('/about',(req,res) => {
  res.json({message : 'This is About Page'});
})
app.post('/api/data',(req,res) => {
  console.log(req.body)
  res.json({message:'POST Request :',data : req.body});
})
app.put('/api/data/:id',(req,res) => {
  console.log(req.params.id)
  res.json({message:'POST Request :',id : req.params.id });
})
app.delete('/api/data/:id',(req,res) => {
  console.log(req.params.id);
  res.json({message:'POST Request :',id : req.params.id });
})
app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}`)
})