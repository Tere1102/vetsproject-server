// QUIEN LA HACE (ID)
// QUIEN LA RECIBE (ID)
// PARA QUE ANIMAL (ID)
// TEXTO DE LA PETICION
// RESPUESTA DE LA PETICION

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
            type: String,
            enum: ['Pendiente', 'Resuelta']
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



requestSchema.index({ location: '2dsphere' })

const Request = model("Request", requestSchema)

module.exports = Request