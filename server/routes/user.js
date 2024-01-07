const express = require("express");
const router = express.Router();

router.get("/", (res, req) => {
  res.send("User List");
});

router.get("/new",(res,req)=>{
    res.send('new user');
})

router.post('/', (req,res)=>{
  res.send('create user')
})

router.get('/:id',(req,res)=>{
  res.send(`Get user with ID ${req.params.id}`)
})

module.exports = router;