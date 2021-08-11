const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Create new item
POST REQUEST - /createItem
 */
router.post("/createItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {name, description, price, image} = req.body;

    try {
        const item = await pool.query("SELECT * FROM items WHERE item_name = $1", [name]);

        if (item.rows.length > 0) {
            return res.status(401).send("Item with that name already exists");
        }
        const newItem = await pool.query("INSERT INTO items (item_name, item_description, item_price, item_image, item_owner) VALUES ($1,$2,$3,$4,$5) RETURNING  *", [
            name, description, price, image, user_id]);

        res.json({"success": true});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;