const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Get user messages
GET REQUEST - /getUserItems
 */
router.get("/getUserNotifications", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const notifications = await pool.query("SELECT * FROM notifications WHERE notification_owner_id = $1", [user_id.id]);

        res.json(notifications.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


router.post("/clearUserNotifications", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        await pool.query("UPDATE notifications SET clear_notification=true WHERE notification_owner_id=$1", [user_id.id]);

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;