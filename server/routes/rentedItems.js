const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Add rented item
POST REQUEST - /rentItem
 */
router.post("/rentItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {id, itemOwner, name, rentType, price, finalPrice, duration, paid, ownerName, renterName} = req.body;

    try {

        const newRentItem = await pool.query(
            "INSERT INTO rented_items (owner_id,renter_id,item_id,duration,price_per_day,price,delivery_type,item_name,paid,owner_name,renter_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING  *", [
                itemOwner, user_id, id, duration, price, finalPrice, rentType, name, paid, ownerName, renterName]
        );

        await pool.query("UPDATE items SET item_posted=false WHERE item_id=$1",[id]);

        res.json(newRentItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



/*
Get items rented by current user
GET REQUEST - /getRentedItems
 */
router.get("/getRentedItems", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userRentedItems = await pool.query("SELECT * FROM rented_items WHERE renter_id=$1", [user_id.id]);

        res.json(userRentedItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Get items being currently rented out by current user
GET REQUEST - /getRentedOutItems
 */
router.get("/getRentedOutItems", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userRentedOutItems = await pool.query("SELECT * FROM rented_items WHERE owner_id=$1", [user_id.id]);

        res.json(userRentedOutItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
verify renting code
POST REQUEST - /getRentedOutItems
 */
router.post("/verifyCode", async (req, res) => {
    const {code,rented_item_id} = req.body;

    try {

        const verifyCode = await pool.query("SELECT confirmation_code FROM rented_items WHERE rented_item_id=$1", [rented_item_id]);

        if(verifyCode.rows[0].confirmation_code === code) {
            await pool.query("UPDATE rented_items SET code_entered=true WHERE rented_item_id=$1",[rented_item_id]);
            res.json(true);
        }else {
            res.json(false);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



module.exports = router;