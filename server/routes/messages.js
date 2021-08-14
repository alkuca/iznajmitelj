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
        const userMessages = await pool.query("SELECT * FROM messages WHERE sender_id = $1 OR reciever_id = $1", [user_id.id]);

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
router.get("/getSingleMessage/:message_id", async (req, res) => {
    const message_id = req.params.message_id;

    try {
        const message = await pool.query("SELECT * FROM messages WHERE message_id = $1", [message_id]);
        if (message.rows.length === 0) {
            return res.status(401).send("message does not exist");
        }

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
    const {receiver_id, message_title, message_text} = req.body;

    try {

        const newMessage = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, message_title, message_text) VALUES ($1,$2,$3,$4) RETURNING  *", [
                user_id, receiver_id, message_title, message_text]
        );

        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
/*
get single user message
send message
delete message
 */




module.exports = router;