const express = require("express")
const router = express.Router()
const heroesRoutes  = require("./heroesRoutes")
const powersRoutes  = require("./powersRoutes")
const authRoutes  = require("./authRoutes")

router.use("/auth", authRoutes)
router.use("/heroes", heroesRoutes)
router.use("/powers", powersRoutes)

module.exports = router