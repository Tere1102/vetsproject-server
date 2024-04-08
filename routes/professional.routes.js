const router = require("express").Router()
const mongoose = require('mongoose')
const Professional = require('./../models/Professional.model.js')


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
    image,
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
      address
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
        image,
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
          address
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
