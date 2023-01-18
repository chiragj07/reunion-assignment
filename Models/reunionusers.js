const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const reunionUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },

      followers:[this],
  
      following:[this]
        
})

reunionUserSchema.statics.matchPassword = async function (enteredPassword, password) {
   
        return await bcrypt.compare(enteredPassword, password)
      }
      
reunionUserSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
          next()
        }
      
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
      })
      

module.exports= mongoose.model('ReunionUser', reunionUserSchema);