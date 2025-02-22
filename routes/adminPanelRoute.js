const express = require("express");
const router = express.Router();
const { renderAdminLogin, handleAdminLogin, renderAdminPanel, handleAdminLogout, getAllUsers, updateUserRole,
    deleteUser
} = require("../controllers/adminController");

router.get("/login", renderAdminLogin);
router.post("/login", handleAdminLogin);
router.get("/dashboard", renderAdminPanel);
router.get("/logout", handleAdminLogout);
router.get("/users", getAllUsers)
router.put("/update-role", updateUserRole)
router.delete("/deleteUser/:id", deleteUser);


module.exports = router;
