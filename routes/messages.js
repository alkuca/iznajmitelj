const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Get user messages
GET REQUEST - /getUserItems
 */
router.get("/getUserMessages", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userMessages = await pool.query("SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1", [user_id.id]);

        res.json(userMessages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get single message
GET REQUEST - /getSingleMessage
 */
router.get("/getSingleMessage/:message_id",authorization, async (req, res) => {
    const user_id = req.user.id;
    const message_id = req.params.message_id;

    try {
        const message = await pool.query("SELECT * FROM messages WHERE message_id = $1", [message_id]);

        await pool.query("UPDATE messages SET message_is_read=true WHERE message_id = $1 AND receiver_id=$2",[message_id, user_id]);

        res.json(message.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Send message
POST REQUEST - /sendMessage
 */
router.post("/sendMessage", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {receiver_id, message_title, message_text, sender_name, receiver_name} = req.body;

    const notificationType = "new_message"
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString()

    try {
        const newMessage = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, message_title, message_text, sender_name, receiver_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING  *", [
                user_id, receiver_id, message_title, message_text, sender_name, receiver_name]
        );

        await pool.query(
            "INSERT INTO notifications (notification_owner_id,notification_maker_id,notification_maker_name,notification_type,time_created,related_item_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING  *", [
                receiver_id, user_id, sender_name , notificationType, today, message_title]
        );

        res.json(newMessage.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;