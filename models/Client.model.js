const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      //required: true
    },
    lastName: {
      type: String,
      //required: true
    },
    phone: {
      type: Number,
      match: /[0-9]{9}/,
      //required: true
    },
    email: {
      type: String,
      //required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      //required: true
    },
    image: {
      type: String,
      default: '#'
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
      country: {
        type: String,
        //required: true
      },
      location: {
        type: {
          type: String
        },
        coordinates: {
          type: [Number],
          //required: true
        }
      }
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    },
    request: {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    },
    role: {
      type: String,
      enum: ["Client", "Professional"]
    }
  },
  {
    timestamps: true
  }
)

clientSchema.index({ location: '2dsphere' })

const Client = model("Client", clientSchema)

module.exports = Client