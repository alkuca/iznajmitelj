const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Create new item
POST REQUEST - /createItem
 */
router.post("/createItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {name, description, price, image, user_state} = req.body;

    try {
        const item = await pool.query("SELECT * FROM items WHERE item_name = $1", [name]);

        if (item.rows.length > 0) {
            return res.status(401).send("Item with that name already exists");
        }
        const newItem = await pool.query("INSERT INTO items (item_name, item_description, item_price, item_image, item_owner, item_state) VALUES ($1,$2,$3,$4,$5,$6) RETURNING  *", [
            name, description, price, image, user_id, user_state]);

        res.json({"success": true});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


/*
Get user items
GET REQUEST - /getUserItems
 */
router.get("/getUserItems", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userItems = await pool.query("SELECT * FROM items WHERE item_owner=$1", [user_id.id]);

        res.json(userItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;