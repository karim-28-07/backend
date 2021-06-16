const express = require("express")
const router = express.Router()
const { continueIfHeroExists, continueIfHeroDoesntExists, transformName } = require("../middlewares/heroesMiddlewares")
const { 
    sendHeroList, 
    sendHero, 
    sendHeroPower, 
    addNewHero, 
    addNewPowerHero,
    deleteHero,
    deletePowerFromHero,
    replaceHero
} = require("../controllers/heroesController")

router.get("/", sendHeroList)

router.get("/:name", sendHero)

router.get("/:name/powers", sendHeroPower)

router.post("/", transformName, continueIfHeroDoesntExists, addNewHero)

router.post("/:name/powers", continueIfHeroExists, addNewPowerHero)

router.delete("/:name", continueIfHeroExists, deleteHero)

router.delete("/:name/power/:power", continueIfHeroExists, deletePowerFromHero)

router.put("/:name", continueIfHeroExists, replaceHero)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = {
    heroesRoutes: router
}