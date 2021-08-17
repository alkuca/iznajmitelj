const router =  require("express").Router()
const pool = require("../db")
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization")

router.get("/getSingleUser/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// edit profile
router.post("/editProfile", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {street, street_number, city, state, lat, long} = req.body;
    try {
        await pool.query("UPDATE users SET user_street=$1, user_street_number=$2, user_city=$3, user_state=$4, lat=$5, long=$6 WHERE user_id = $7", [
            street,street_number,city,state,lat,long,user_id
        ]);

        res.json(true)
    } catch (err){
        console.log(err.message);
        res.status(500).send("Server error")
    }
});


module.exports = router;