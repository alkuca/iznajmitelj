const router =  require("express").Router()
const pool = require("../db")

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


module.exports = router;