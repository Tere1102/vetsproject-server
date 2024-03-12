const router = require("express").Router()
const mongoose = require('mongoose')
const Request = require('./../models/Request.model.js')



router.post('/newRequest', (req, res, next) => {

    const { client, professional, pet, status, question, image } = req.body

    Request
        .create({ client, professional, pet, status, question, image })
        // .populate('Client Pet Professional')
        .then(newRequest => res.status(201).json(newRequest))
        .catch(err => {
            next(err)
        })
})


router.get('/', (req, res, next) => {

    Request
        .find()
        .populate('client pet professional')
        .then(allRequests => res.status(201).json(allRequests))
        .catch(err => {
            next(err)
        })

})


router.get('/:requestId', (req, res, next) => {

    const { requestId } = req.params

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Id de request no válido" })
        return
    }
    Request
        .findById(requestId)
        .populate('client pet professional')
        .then(request => res.status(200).json(request))
        .catch(err => {
            next(err)
        })
})


router.get('/client/:clientId', (req, res, next) => {

    const { clientId } = req.params

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: "Id de request no válido" })
        return
    }

    Request
        .find({ client: clientId })
        .populate('client pet professional')
        .then(request => res.status(200).json(request))
        .catch(err => {
            next(err)
        })
})


router.get('/professional/:professionalId', (req, res, next) => {

    const { professionalId } = req.params

    if (!mongoose.Types.ObjectId.isValid(professionalId)) {
        res.status(400).json({ message: "Id de request no válido" })
        return
    }

    Request
        .find({ professional: professionalId })
        .populate('client pet professional')
        .then(request => res.status(200).json(request))
        .catch(err => {
            next(err)
        })
})





router.put('/:requestId', (req, res, next) => {

    const { requestId } = req.params
    const { client, professional, pet, status, question, answer, image, response } = req.body

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Id de request no válido" })
        return
    }

    Request
        .findByIdAndUpdate(
            requestId,
            { client, professional, pet, status, question, answer, image, response },
            { new: true, runValidators: true }
        )
        .then(updatedRequest => res.json(updatedRequest))
        .catch(err => {
            next(err)
        })
})


router.delete('/:requestId', (req, res, next) => {

    const { requestId } = req.params

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Id de request no válido" })
        return
    }
    Request
        .findByIdAndDelete(requestId)
        // .populate('client pet professional')
        .then(() => res.sendStatus(204))
        .catch(err => {
            next(err)
        })
})


module.exports = router