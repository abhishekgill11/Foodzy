const express = require('express')
const router = express.Router()

router.post('/foodData', (req,res) => {
    try {
        res.send([global.food_menu, global.foodCategory])
        console.log(global.food_menu)
    } catch(error) {
        console.error(error.message);
        res.send("Server Error")
    }
})
module.exports = router;