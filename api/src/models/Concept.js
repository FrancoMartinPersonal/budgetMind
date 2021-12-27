const { Schema, SchemaTypes, model } = require("mongoose");



const conceptSchema = new Schema ({
    concept: {
        type:String,

    },
    id: SchemaTypes.ObjectId,
    amount:{
        type:Number
    },
    date:{
        type:Date,
        default: new Date()
    },
    user:{type:Schema.Types.ObjectId,
        ref:'User'}
        //one belongs 
})

module.exports = model('Concept',conceptSchema)