import cookieParser from 'cookie-parser';
import express from 'express'
let app = express();
app.use(cookieParser());
app.get("/",(req,res) => {
  res.cookie("name","ayaz");
  res.send("Done");
})
app.get("/read",(req,res) => {
  console.log(req.cookies)
  res.send("read")
})
app.listen(3000,() => {
  console.log(`http://localhost:3000`);
})