const { Schema, model } = require("mongoose");

const professionalSchema = new Schema(
    {
        firstname: {
            type: String,
            //requiered: true,
            lowercase: true
        },

        lastName: {
            type: String,
            //required: true,
            lowercase: true
        },

        membershipNumber: {
            type: Number,
            match: /[0-9]{4}/,
            //requiered: true
        },

        phone: {
            type: Number,
            match: /[0-9]{9}/,
            //required: true
        },

        email: {
            type: String,
            //required: [true, 'Email is required.'],
            unique: true
        },

        clinic: {

            name: {
                type: String
            },
            address: {
                street: {
                    type: String,
                    //required: true
                },
                zipCode: {
                    type: Number,
                    //required: true
                },
                city: {
                    type: String,
                    //required: true
                },
                contry: {
                    type: String,
                    //required: true
                },
                location: {
                    type: {
                        type: String
                    },
                    coordinates: {
                        type: [Number],
                        //requiered: true
                    }
                }
            }
        },


        schedule: {
            type: String,
            //requiered: true
        },

        emergencies: {
            type: Boolean,
            default: false
        },

        rate: {
            type: [Number]
        },
        request: {
            type: Schema.Types.ObjectId,
            ref: 'Request'
        },
    },
    {
        timestamps: true
    }
);

professionalSchema.index({ location: '2dsphere' })

const Professional = model("Professional", professionalSchema)

module.exports = Professional