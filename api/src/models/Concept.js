const { Schema, SchemaTypes, model } = require("mongoose");



const conceptSchema = new Schema ({
    concept: {
        type:String,

    },
    id: SchemaTypes.ObjectId,
    date:{
        type:Date,
        //default: new Date()
    },
    user:{type:Schema.Types.ObjectId,
        ref:'User'},
        //one belongs 
        amounts:[{
        type:Schema.Types.ObjectId,
        ref:'Amount'
    }]
    //to many
})

module.exports = model('Concept',conceptSchema)