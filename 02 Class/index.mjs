import express from 'express'
// first commit 

let app = express();
app.use(express.json())
// second commit
let items = []
app.get('/',(req,res) => {
  res.json(items);
})
// third commit
app.post('/api/data',(req,res) => {
  // Forth commit
  let newItem = {
      id : items.length + 1,
      name : req.body.name,
  }
  items.push(newItem);
  res.status(201).json({message : 'data is Post',newItem});
  // Fifth commit
})
app.delete('/api/data/:id',(req,res) => {
    let itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    // Sixth commit 
    if(itemIndex == -1) return res.status(404).json({message : `item at index : ${itemIndex} not found`})

    let deletedItem = items.splice(itemIndex,1);
    res.json(deletedItem);
    // seventh commit
})
app.put('/api/data/:id',(req,res) => {
  // eighth commit 
  const index = parseInt(req.params.id - 1);
  if (index < 0 || index >= items.length) return res.status(404).send('Item not found.');
  // tenth commit 
  const updateItem = {id : items[index].id,...req.body};
  items[index] = updateItem;
  res.json(updateItem)
  // ninth commit
})
app.listen(3000,() => {
  console.log('http://localhost:3000');
})