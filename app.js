require("dotenv").config()
require("./db")


const express = require("express")
const app = express()
// TODO: incluir isAuthenticated en todas las routes

require("./config")(app)

//const { isAuthenticated } = require("./middleware/jwt.middleware")

const clientRouter = require("./routes/client.routes.js")
app.use("/api/clients", clientRouter)

const professionalRouter = require("./routes/professional.routes.js")
app.use("/api/professionals", professionalRouter)

const petRouter = require("./routes/pet.routes.js")
app.use("api/pets", petRouter)

const requestRouter = require("./routes/request.routes.js")
app.use("/api/requests", requestRouter)

const authRoutes = require("./routes/auth.routes.js")
app.use("/api/auth", authRoutes)


require("./error-handling")(app)

module.exports = app