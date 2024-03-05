const router = require("express").Router()
const mongoose = require('mongoose')
const Professional = require('./../models/professional.model.js')

router.get('/', (req, res, next) => {

    Request
        .find()
        .populate("client", "pet", "professional")
        .then(allRequests => res.json(allRequests))
        .catch(err => { next(err) })

})

router.post('/newRequest', (req, res, next) => {

    const { client, professional, pet, status, question, answer, image } = req.body

    Request
        .create({ client, professional, pet, status, question, answer, image })
        .populate("client", "pet", "professional")
        .then(newRequest => res.json(newRequest))
        .catch(err => { next(err) })
})

router.get('/requestId', (req, res, next) => {

    const { requestId } = req.params

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }
    Request
        .findById(requestId)
        .populate("client", "pet", "professional")
        .then(request => res.json(request))
        .catch(err => { next(err) })
})

router.put('/requestId', (req, res, next) => {

    const { requestId } = req.params
    const { client, professional, pet, status, question, answer, image } = req.body

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }
    Request
        .findByIdAndUpdate(
            requestId,
            { client, professional, pet, status, question, answer, image },
            { new: true, runValidators: true }
                .populate("client", "pet", "professional")
                .then(updatedRequests => res.json(updatedRequests))
                .catch(err => { next(err) })
        )
})

router.delete('/requestId', (req, res, next) => {

    const { requestId } = req.params

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }
    Request
        .findByIdAndDelete(requestId)
        .populate("client", "pet", "professional")
        .then(() => res.sendStatus(204))
        .catch(err => { next(err) })
})

module.exports = router