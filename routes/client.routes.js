const router = require("express").Router()
const mongoose = require('mongoose')
const Client = require('./../models/Client.model')


router.post('/newClient', (req, res, next) => {


    const {
        firstName,
        lastName,
        phone,
        email,
        address: {
            street,
            zipCode,
            city,
            country,
            longitude,
            latitude
        },
        image,
        petNumber
    } = req.body


    Client

        .create({
            firstName,
            lastName,
            phone,
            email,
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
            petNumber
        })
        .then(newClient => res.status(201).json(newClient))
        .catch(err => { next(err) })

})

router.get('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'La identificación especificada no es válida' })
        return
    }

    Client
        .findById(clientId)
        .populate('pet')
        .then(client => res.status(200).json(client))
        .catch(err => { next(err) })
})

router.put('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    const {
        firstName,
        lastName,
        phone,
        email,
        address: {
            street,
            zipCode,
            city,
            country,
            longitude,
            latitude
        },
        image,
        petNumber
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'La identificación especificada no es válida' })
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
                address: {
                    street,
                    zipCode,
                    city,
                    country,
                    location,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                },
                image,
                petNumber,
            },
            { new: true, runValidators: true }
        )
        .then(updatedClient => {
            console.log('---', req.body)
            res.json(updatedClient)
        })
        .catch(err => { next(err) })
})

router.delete('/:clientId', (req, res, next) => {

    const { clientId } = req.params

    Client
        .findByIdAndDelete(clientId)
        .populate('pet')
        .then(() => res.sendStatus(204))
        .catch(err => { next(err) })
})

module.exports = router