
const { Schema, model } = require('mongoose')

const requestSchema = new Schema(
    {
        clients: {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        },
        professionals: {
            type: Schema.Types.ObjectId,
            ref: 'Professional'
        },
        pets: {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        },
        status: {
            type: String,
            enum: ['Pendiente', 'Resuelta'],
            default: 'Pendiente'
        },
        question: {
            type: String,
            //required: true
        },
        answer: {
            type: String,
            //required: true
        },
        image: {
            type: String,
            default: '#'
        }
    },

    {
        timestamps: true

    })



const Request = model("Request", requestSchema)

module.exports = Request