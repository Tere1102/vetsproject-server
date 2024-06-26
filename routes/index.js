const { isAuthenticated } = require("../middleware/jwt.middleware.js")

module.exports = app => {



    const clientRouter = require("./client.routes.js")
    app.use("/api/clients", isAuthenticated, clientRouter)

    const professionalRouter = require("./professional.routes.js")
    app.use("/api/professionals", isAuthenticated, professionalRouter)

    const petRouter = require("./pet.routes.js")
    app.use("/api/pets", isAuthenticated, petRouter)

    const requestRouter = require("./request.routes.js")
    app.use("/api/requests", isAuthenticated, requestRouter)

    const authRouter = require("./auth.routes.js")
    app.use("/api/auth", authRouter)

    const uploadRouter = require("./upload.routes")
    app.use("/api/upload", uploadRouter)
}