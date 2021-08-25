const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

/*
Add rented item
POST REQUEST - /rentItem
 */
router.post("/rentItem", authorization, async (req, res) => {
    const user_id = req.user.id;
    const {id, itemOwner, name, rentType, price, finalPrice, duration, paid, ownerName, renterName,item_image} = req.body;
    const notificationType = 'renting'

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString()

    try {

        const newRentItem = await pool.query(
            "INSERT INTO rented_items (owner_id,renter_id,item_id,duration,price_per_day,price,delivery_type,item_name,paid,owner_name,renter_name,item_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING  *", [
                itemOwner, user_id, id, duration, price, finalPrice, rentType, name, paid, ownerName, renterName, item_image]
        );

        await pool.query(
            "INSERT INTO notifications (notification_owner_id,notification_maker_id,notification_maker_name,notification_type,related_item_id,related_item_name,delivery_type,time_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING  *", [
                itemOwner, user_id, renterName, notificationType, id, name, rentType,today]
        );

        await pool.query("UPDATE items SET item_posted=false WHERE item_id=$1",[id]);

        res.json(newRentItem.rows);
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
            await pool.query("UPDATE rented_items SET code_entered=true, time_rent_started=NOW()  WHERE rented_item_id=$1",[rented_item_id]);
            res.json(true);
        }else {
            res.json(false);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


/*
Sets item renting_status to true
PATCH REQUEST - /finishRenting
 */
router.post("/finishRenting/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await pool.query("UPDATE rented_items SET renting_status=false WHERE item_id=$1",[id]);

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/*
Sets item renting_status to true && return type
PATCH REQUEST - /finishRenting
 */
router.post("/finishRentingByRenter/:id", authorization, async (req, res) => {
    const id = req.params.id;
    const {returnType} = req.body;
    const user_id = req.user.id;

    const notificationType = "renting_finished"
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString()

    try {
        await pool.query("UPDATE rented_items SET renting_status=false , return_type=$2 WHERE rented_item_id=$1 AND renter_id=$3",[id,returnType,user_id]);

        const r = await pool.query("SELECT * FROM rented_items WHERE rented_item_id=$1", [id]);

        await pool.query(
            "INSERT INTO notifications (notification_owner_id,notification_maker_id,notification_maker_name,notification_type,related_item_id,related_item_name,return_type,time_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING  *", [
                r.rows[0].owner_id, user_id, r.rows[0].renter_name , notificationType, id, r.rows[0].item_name, r.rows[0].return_type,today]
        );

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



module.exports = router;