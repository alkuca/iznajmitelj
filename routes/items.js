const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

const {cloudinary} = require('../utils/cloudinary')

/*
Get all items
GET REQUEST - /getAllItems
 */
router.get("/getAllItems", async (req, res) => {

    try {
        const items = await pool.query("SELECT * FROM items");

        res.json(items.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get all posts
GET REQUEST - /getAllPosts
 */
router.get("/getAllPosts", async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM items WHERE item_posted = true");

        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get single item
GET REQUEST - /getSingleItem
 */
router.get("/getSingleItem/:item_id", async (req, res) => {
    const item_id = req.params.item_id;

    try {
        const item = await pool.query("SELECT * FROM items WHERE item_id = $1", [item_id]);
        if (item.rows.length === 0) {
            return res.status(401).send("Item does not exist");
        }

        res.json(item.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Create new item
POST REQUEST - /createItem
 */
router.post("/createItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {name, description, price, item_image, item_state, item_street, item_street_number, item_city, item_lat, item_long} = req.body;

    try {
        await pool.query(
            "INSERT INTO items (item_name,item_description,item_price,item_image,item_owner,item_state,item_street,item_street_number,item_city,item_lat,item_long) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING  *", [
            name, description, price, item_image, user_id, item_state, item_street, item_street_number, item_city, item_lat, item_long]
        );

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/uploadItemImage", async (req, res) => {
    const fileStr = req.body.data;
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        res.json(uploadResponse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.delete("/deleteItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const item_id = req.body.item_id;

    try {
        await pool.query("DELETE FROM items WHERE item_id=$1 AND item_owner=$2", [item_id, user_id]);
        console.log(item_id)
        res.json(true);
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


/*
Sets item posted status to true
PATCH REQUEST - /postItem
 */
router.post("/postItem/:id", authorization, async (req, res) => {
    const user_id = req.user;
    const id = req.params.id;

    try {
        const userItem = await pool.query("SELECT * FROM items WHERE item_owner=$1", [user_id.id])
        if (userItem.rows.length === 0) {
            return res.status(401).send("User is not the owner of that item");
        }
        await pool.query("UPDATE items SET item_posted=true WHERE item_id=$1",[id]);

        res.json({success:"true"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Sets item posted status to false
PATCH REQUEST - /removePost
 */
router.post("/removePost/:id", authorization, async (req, res) => {
    const user_id = req.user;
    const id = req.params.id;

    try {
        const userItem = await pool.query("SELECT * FROM items WHERE item_owner=$1", [user_id.id])
        if (userItem.rows.length === 0) {
            return res.status(401).send("User is not the owner of that item");
        }
        await pool.query("UPDATE items SET item_posted=false WHERE item_id=$1",[id]);

        res.json(req.params.id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get users rented out items
GET REQUEST - /getUserRentedOutItems
 */
router.get("/getUserRentedOutItems", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userItems = await pool.query("SELECT * FROM rentedItems WHERE owner_id=$1", [user_id.id]);

        res.json(userItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;