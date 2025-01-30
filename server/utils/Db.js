const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const ConnectDB =  async()=>{
   try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log('connected with database 🎉')
   } catch (error) {
      console.log(error.message)
   }
}
module.exports = ConnectDB