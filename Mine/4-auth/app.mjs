import cookieParser from 'cookie-parser';
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
let app = express();
app.use(cookieParser());
app.get("/",(req,res) => {
  let token = jwt.sign({email : "ayaz@gmail.com"},"secret");
  console.log(token)
});
app.get("/read",(req,res) => {
 res.send("Ok")
})

app.listen(3000,() => {
  console.log(`http://localhost:3000`);
})