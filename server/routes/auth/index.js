const router = require("express").Router();
const { ROLE } = require("../../config/roles");
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../../Controllers/auth");

router.get("/", async (req, res) => {
  return res.send("Auth service running...");
});

// Admin Registration Route
router.post("/signup-admin", async (req, res) => {
  await userRegister(req.body, ROLE.admin, res);
});

router.post("/signup-operator", async (req, res) => {
  await userRegister(req.body, ROLE.operator, res);
});
 
router.post("/signup-analytics", async (req, res) => {
  await userRegister(req.body, ROLE.analytics, res);
});

router.post("login-operator", async (req, res) => {
  await userLogin(req.body, ROLE.operator, res);
});
 
router.post("login-analytics", async (req, res) => {
  await userLogin(req.body, ROLE.analytics, res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, ROLE.admin, res);
});


// Super Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole([ROLE.admin]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Admin Protected Route
router.get(
  "/operator-protected",
  userAuth,
  checkRole([ROLE.operator]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// User Protected Route
router.get(
  "/analytics-protected",
  userAuth,
  checkRole([ROLE.analytics]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

module.exports = router;
