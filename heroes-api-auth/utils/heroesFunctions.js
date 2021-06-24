const heroModel = require("../models/hero")

const findHeroByName = async (name, withPowers) => {
    try {
        if (withPowers) {
            return await heroModel.findOne({
                name: {
                    $regex: new RegExp("^" + name, "i")
                }
            }).populate("powers")
        } else {
            return await heroModel.findOne({
                name: {
                    $regex: new RegExp("^" + name, "i")
                }
            }).select({ powers: 0 })
        }

    } catch (error) {
        console.log(error)

        return null
    }
}

const heroExists = async (name) => {

    try {
        const hero = await findHeroByName(name)

        if (hero) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)

        return false
    }
    
}

const heroExistsByID = async (id) => {

    try {
        const hero = await heroModel.findById(id)

        if (hero) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)

        return false
    }
    
}

module.exports = {
    findHeroByName,
    heroExists,
    heroExistsByID
}