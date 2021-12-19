
const {Schema, SchemaTypes,model} = require('mongoose')



const userSchema = new Schema ({
   
    user : {
        type:String,
        unique:true
    }, //string
    id : SchemaTypes.ObjectId,
    mail: {
        type:String,
        unique:true
    },
    date:{
        type:Date,
        default: new Date(),
    },
    password: String
    

})

module.exports = model('User',userSchema)