const { Schema, model } = require("mongoose");

const professionalSchema = new Schema(
    {
        image: {
            type: String,
            default: ""
        },

        firstName: {
            type: String,
        },

        lastName: {
            type: String,
            lowercase: true
        },

        membershipNumber: {
            type: Number,
            match: /[0-9]{4}/,
        },

        phone: {
            type: Number,
            match: /[0-9]{9}/,
        },

        phone2: {
            type: Number,
            match: /[0-9]{9}/,
        },

        email: {
            type: String,
            unique: true
        },

        password: {
            type: String,
        },

        clinic: {

            name: {
                type: String
            },

            address: {
                street: {
                    type: String,
                },
                zipCode: {
                    type: Number,
                },
                city: {
                    type: String,
                },
                contry: {
                    type: String,
                },
            }
        },

        specialty: {
            type: String,
        },

        schedule: {
            type: String,
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
        role: {
            type: String,
            enum: ["Client", "Professional"]
        },
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number],
            }
        }
    },
    {
        timestamps: true
    }
);

professionalSchema.index({ location: '2dsphere' })

const Professional = model("Professional", professionalSchema)

module.exports = Professional