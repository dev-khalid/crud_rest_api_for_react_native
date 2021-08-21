import mongoose from 'mongoose'; 
import validator from 'validator'; 
const userSchema = mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    trim: true, 

  }, 
  email: { 
    type:String, 
    validate: [validator.isEmail,'please enter a valid email']
  }
})

const User = mongoose.model('User',userSchema); 
export default User; 