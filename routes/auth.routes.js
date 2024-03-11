const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const Client = require("./../models/Client.model")
const Professional = require("./../models/Professional.model")
const { isAuthenticated } = require('./../middleware/jwt.middleware')

const saltRounds = 10



router.post('/newClient', (req, res, next) => {

    const {
        image,
        email,
        password,
        firstName,
        lastName,
        street,
        phone,
        city,
        country,
        zipCode
    } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Introduce un email o password, por favor.' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Introduce un email válido' })
        return
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'El password tiene que tener al menos, 6 carácteres, un número, una mayúscula y una minúscula' })
        return
    }

    Client
        .findOne({ email })
        .then((foundClient) => {

            if (foundClient) {
                res.status(400).json({ message: 'El usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Client.create({
                image,
                email,
                firstName,
                lastName,
                street,
                phone,
                city,
                country,
                zipCode,
                password: hashedPassword
            })
        })

        .then((createdClient) => {
            const { email, name, _id } = createdClient
            const client = { email, name, _id }
            res.status(201).json({ client: client })
        })

        .catch(err => {
            next(err)
        })

})





router.post('/newProfessional', (req, res, next) => {

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
        name,
        street,
        zipCode,
        city,
        country,
        longitude,
        latitude
    } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Introduce un email o password, por favor.' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Introduce un email válido' })
        return
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'El password tiene que tener al menos, 6 carácteres, un número, una mayúscula y una minúscula' })
        return
    }

    Professional
        .findOne({ email })
        .then((foundProfessional) => {

            if (foundProfessional) {
                res.status(400).json({ message: 'El usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Professional.create({
                image,
                firstName,
                lastName,
                membershipNumber,
                phone,
                email,
                schedule,
                emergencies,
                rate,
                reviews,
                name,
                street,
                zipCode,
                city,
                country,
                longitude,
                latitude,
                password: hashedPassword
            })
        })

        .then((createdProfessional) => {
            const { email, name, _id } = createdProfessional
            const professional = { email, name, _id }
            res.status(201).json({ professional: professional })
        })

        .catch(err => {
            next(err)
        })

})




router.post('/login/client', (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Introduce un email o password.' })
        return
    }

    Client
        .findOne({ email })
        .then((foundClient) => {

            if (!foundClient) {
                res.status(401).json({ message: 'Usuario no encontrado' })
                return
            }

            const passwordCorrect = bcrypt.compareSync(password, foundClient.password)

            if (passwordCorrect) {

                const { _id, email, name } = foundClient
                const payload = { _id, email, name }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                res.status(200).json({ authToken: authToken })
            }

            else {
                res.status(401).json({ message: 'Password incorrect' })
            }
        })
        .catch(err => {
            next(err)
        })
})



router.post('/login/professional', (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Introduce un email o password.' })
        return
    }

    Professional
        .findOne({ email })
        .then((foundProfessional) => {

            if (!foundProfessional) {
                res.status(401).json({ message: 'Usuario no encontrado' })
                return
            }

            const passwordCorrect = bcrypt.compareSync(password, foundProfessional.password)

            if (passwordCorrect) {

                const { _id, email, name } = foundProfessional
                const payload = { _id, email, name }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                res.status(200).json({ authToken: authToken })
            }

            else {
                res.status(401).json({ message: 'Password incorrect' })
            }
        })
        .catch(err => {
            next(err)
        })
})

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.json({ userInfo: req.payload })
})


module.exports = router