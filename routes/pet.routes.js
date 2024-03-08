const router = require("express").Router()
const mongoose = require('mongoose')
const Client = require('./../models/Client.model')
const Pet = require("../models/Pet.model")

router.post('/newPet', (req, res, next) => {

    const { owner, name, type, breed, birth, sex, weigth, chipNumber, chipOwner, clientId } = req.body

    Pet
        .create({ owner, name, type, breed, birth, sex, weigth, chipNumber, chipOwner, client: clientId })
        .then(newPet => {
            return Client.findByIdAndUpdate(clientId, {
                $push: { pet: newPet._id }
            })
        })
        .then((response) => res.json(response))
        .catch(err => {
            next(err)
        })
})


router.get('/', (req, res, next) => {

    Pet
        .find()
        .then(allPets => res.status(200).json(allPets))
        .catch(err => {
            next(err)
        })
})


router.get('/:petId', (req, res, next) => {

    const { petId } = req.params

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: "Id de mascota no válido" })
        return
    }

    Pet
        .findById(petId)
        .then(pet => res.status(200).json(pet))
        .catch(err => {
            next(err)
        })
})


router.put('/:petId', (req, res, next) => {

    const { petId } = req.params
    const { owner, name, type, breed, birth, sex, weigth, chipNumber, chipOwner } = req.body

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: "Id de mascota no válido" })
        return
    }

    Pet
        .findByIdAndUpdate(
            petId,
            { owner, name, type, breed, birth, sex, weigth, chipNumber, chipOwner },
            { new: true, runValidators: true })
        .then(updatedPets => res.json(updatedPets))
        .catch(err => {
            next(err)
        })
})


router.delete('/:petId', (req, res, next) => {

    const { petId } = req.params

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: "Id de mascota no válido" })
        return
    }

    Pet
        .findByIdAndDelete(petId)
        .then(() => res.sendStatus(204))
        .catch(err => {
            next(err)
        })

})


module.exports = router