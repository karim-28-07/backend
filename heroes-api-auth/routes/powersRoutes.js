const express = require("express")
const router = express.Router()
const { continueIfPowerExists, continueIfPowerDoesntExists } = require("../middlewares/powerMiddlewares")
const { validationPower, validationForcePower } = require("../middlewares/validationsMiddlewares")
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddlewares")

const {
    getPowers,
    getPower,
    addNewPower,
    deletePower,
    replacePower,
    updateForcePower
} = require("../controllers/powersController")

router.get("/", getPowers)

router.get("/:id", getPower)

router.post("/", verifyToken, onlyAdmin, validationPower, continueIfPowerDoesntExists, addNewPower)

router.delete("/:id", verifyToken, onlyAdmin, deletePower)

router.put("/:id", verifyToken, onlyAdmin, validationPower, continueIfPowerExists, replacePower)

router.patch("/:id/force", verifyToken, onlyAdmin, validationForcePower, updateForcePower)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router