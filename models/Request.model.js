
const { Schema, model } = require('mongoose')

const requestSchema = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        },
        professional: {
            type: Schema.Types.ObjectId,
            ref: 'Professional'
        },
        pet: {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        },
        status: {
            type: Boolean,
            default: false
        },
        question: {
            type: String,
            //required: true
        },
        response: {
            type: Array,
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