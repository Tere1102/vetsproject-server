const { Schema, model } = require('mongoose')

const petSchema = new Schema(
    {
        image: {
            type: "String",
            default: "#"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        },
        name: {
            type: String,
            //required: true
        },
        type: {
            type: String,
            //required: true
        },
        breed: {
            type: String,
            //required: true
        },
        birth: {
            type: Date,
            //required: true
        },
        sex: {
            type: String,
            enum: ["Hembra", "Macho"],
            //required: true
        },
        weight: {
            type: Number,
            //required: true
        },
        chipNumber: {
            type: Number,
            match: /[0-9]{15}/
        },
        chipOwner: {
            type: String
        }
    },
    {
        timestamps: true

    })



petSchema.index({ location: '2dsphere' })

const Pet = model("Pet", petSchema)

module.exports = Pet