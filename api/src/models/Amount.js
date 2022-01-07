const { Schema, SchemaTypes, model } = require("mongoose");



const conceptSchema = new Schema ({

    id: SchemaTypes.ObjectId,
    amount:{
        type:Number
    },
    date:{
        type:Date,
        default: new Date()
    },
    //dont write here
    createdAt:{
        type:Date,
        default: Date.now
    },

    concept:{
        type:Schema.Types.ObjectId,
        ref:'Concept'
    } //one belongs

})

module.exports = model('Amount',conceptSchema)