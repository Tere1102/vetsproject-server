const router = require("express").Router()
const mongoose = require('mongoose')
const Client = require('./../models/Client.model')


router.get('/', (req, res, next) => {
    Client
        .find()
        .populate('pet')
        .then(allClients => res.status(200).json(allClients))
        .catch(err => {
            next(err)
        })
})


router.get('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'Id de cliente no válido' })
        return
    }

    Client
        .findById(clientId)
        .populate('pet')
        .then(client => res.status(200).json(client))
        .catch(err => {
            next(err)
        })
})


router.put('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    const {
        firstName,
        lastName,
        phone,
        email,
        password,
        address: {
            street,
            zipCode,
            city,
            country,
            longitude,
            latitude
        },
        image,
        pet
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'Id de cliente no válido' })
        return
    }

    Client
        .findByIdAndUpdate(
            clientId,
            {
                firstName,
                lastName,
                phone,
                email,
                password,
                address: {
                    street,
                    zipCode,
                    city,
                    country,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                },
                image,
                pet
            },
            { new: true, runValidators: true }
        )
        .populate('pet')
        .then(updatedClients => res.json(updatedClients))
        .catch(err => {
            next(err)
        })
})


router.delete('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    Client
        .findByIdAndDelete(clientId)
        .populate('pet')
        .then(() => res.sendStatus(204))
        .catch(err => {
            next(err)
        })
})


module.exports = router