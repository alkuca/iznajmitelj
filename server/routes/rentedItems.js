const router =  require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")


/*
Get items rented by current user
GET REQUEST - /getRentedItems
 */
router.get("/getRentedItems", authorization, async (req, res) => {
    const user_id = req.user;

    try {
        const userRentedItems = await pool.query("SELECT * FROM rentedItems WHERE renter_id=$1", [user_id.id]);

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
        const userRentedOutItems = await pool.query("SELECT * FROM rentedItems WHERE owner_id=$1", [user_id.id]);

        res.json(userRentedOutItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;