const { Schema, model } = require("mongoose");

const professionalSchema = new Schema(
    {
        image: {
            type: String,
            default: ""
        },

        firstName: {
            type: String
        },

        lastName: {
            type: String,
        },

        membershipNumber: {
            type: Number,
            match: /[0-9]{4}/
        },

        phone: {
            type: Number,
            match: /[0-9]{9}/
        },

        phone2: {
            type: Number,
            match: /[0-9]{9}/
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        clinic: {

            name: {
                type: String
            },

            address: {
                type: String
            }

        },

        specialty: {
            type: String
        },

        schedule: {
            type: String
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