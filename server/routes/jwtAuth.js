const router = require("express").Router()
const pool = require ("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

// register route
router.post("/register", validInfo, async (req, res) => {
    try {
        const {name, email, password, street, street_number, city, state, lat, long} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if(user.rows.length !== 0){
            return res.status(401).send("User already exists")
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password, user_street, user_street_number, user_city, user_state, lat, long ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [name,email,bcryptPassword,street,street_number,city,state,lat,long]);

        const token = jwtGenerator(newUser.rows[0].user_id);


        res.json({token})
    } catch (err){
        console.log(err.message);
        res.status(500).send("Server error")
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/verify", authorization, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;