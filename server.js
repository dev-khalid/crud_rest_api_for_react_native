import express from 'express'; 
import dotenv from 'dotenv'; 
import User from './models/userModel.js'; 
import mongoose from 'mongoose'; 

dotenv.config({path: 'config.env'}); 
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
  console.log("Connected to Database 😀")
}).catch(err=> {
  console.log('Something went wrong please try again!'); 
  console.log(err); 
})
const app = express(); 
app.use(express.json()); 
app.get("/",(req,res,next)=> {
  res.send("App is running perfectly"); 
}); 
app.post('/api/users',async (req,res,next) => { 
  const user = await User.create(req.body); 
  res.status(201).json({
    status:'success', 
    data: user
  }); 
}); 
app.get('/api/users',async (req,res,next)=> { 
  const users = await User.find(); 
  res.status(200).json({
    status: 'success', 
    results: users.length, 
    data: users
  }); 
}); 
app.get('/api/users/:id',async (req,res,next)=> { 
  const user = await User.findById(req.params.id); 
  res.status(200).json({
    status: 'success',  
    data: user
  });
}); 
app.patch('/api/users/:id',async (req,res,next)=> { 
  const user = await User.findByIdAndUpdate(req.params.id,req.body,{
    new: true, 
    runValidators: true
  }); 
  res.status(200).json({
    status: 'success',  
    data: user
  });
}); 
app.delete('/api/users/:id',async (req,res,next)=> { 
  const user = await User.findByIdAndDelete(req.params.id); 
  res.status(204).json({
    status: 'success',  
    data: null
  });
});  


const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=> { 
  console.log(`Server is running on port ${PORT}`); 
})
