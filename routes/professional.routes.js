const router = require("express").Router()
const mongoose = require('mongoose')
const Professional = require('./../models/professional.model.js')


router.post('/newProfessional', (req, res, next) => {

  const {
    firstName,
    lastName,
    membershipNumber,
    phone,
    email,
    password,
    schedule,
    emergencies,
    rate,
    reviews,
    clinic: {
      name,

      address: {
        street,
        zipCode,
        city,
        country,
        longitude,
        latitude
      }
    }
  } = req.body

  Professional
    .create({
      firstName,
      lastName,
      membershipNumber,
      phone,
      email,
      password,
      schedule,
      emergencies,
      rate,
      reviews,
      clinic: {
        name,

        address: {
          street,
          zipCode,
          city,
          country,
          location: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    })
    .then(newProfessional => res.status(201).json(newProfessional))
    .catch(err => {
      next(err)
    })
})


router.get('/', (req, res, next) => {
  Professional
    .find()
    .then(allProfessionals => res.status(200).json(allProfessionals))
    .catch(err => {
      next(err)
    })
})


router.get('/:professionalId', (req, res, next) => {

  const { professionalId } = req.params

  if (!mongoose.Types.ObjectId.isValid(professionalId)) {
    res.status(400).json({ message: 'Id de profesional no válido' })
    return
  }

  Professional
    .findById(professionalId)
    .populate('request')
    .then(professional => res.status(200).json(professional))
    .catch(err => {
      next(err)
    })
})


router.put('/:professionalId', (req, res, next) => {

  const { professionalId } = req.params

  const {
    firstName,
    lastName,
    membershipNumber,
    phone,
    email,
    password,
    schedule,
    emergencies,
    rate,
    reviews,
    clinic: {
      name,

      address: {
        street,
        zipCode,
        city,
        country,
        longitude,
        latitude
      }

    }

  } = req.body


  if (!mongoose.Types.ObjectId.isValid(professionalId)) {
    res.status(400).json({ message: 'Id de profesional no válido' })
    return
  }

  Professional
    .findByIdAndUpdate(
      professionalId,
      {
        firstName,
        lastName,
        membershipNumber,
        phone,
        email,
        password,
        schedule,
        emergencies,
        rate,
        reviews,
        clinic: {
          name,

          address: {
            street,
            zipCode,
            city,
            country,
            location: {
              type: "Point",
              coordinates: [longitude, latitude]
            }
          }
        }
      },
      { new: true, runValidators: true })
    .populate('request')
    .then(updatedProfessionals => res.json(updatedProfessionals))
    .catch(err => {
      next(err)
    })
})


router.delete('/:professionalId', (req, res, next) => {

  const { professionalId } = req.params

  if (!mongoose.Types.ObjectId.isValid(professionalId)) {
    res.status(400).json({ message: 'Id de profesional no válido' })
    return
  }

  Professional
    .findByIdAndDelete(professionalId)
    .populate('request')
    .then(() => res.sendStatus(204))
    .catch(err => {
      next(err)
    })
})


module.exports = router
