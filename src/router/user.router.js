const express = require("express");

const {
  list,
  listById,
  register,
  edit,
  remove,
  login,
  paginate,
  refreshToken,
  logout,
  uploadPhoto,
} = require("../controller/user.controller");
const auth = require("../middleware/staticAuth");
const verifyToken = require("../middleware/verifyToken");
// const { isAdmin } = require("../middleware/authorization");
const upload = require("../middleware/upload");
const router = express.Router();
// auth, isAdmin,
router.get("/user", list);
router.get("/getuser/:id", verifyToken, listById);
router.post("/user_register", register);
router.put("/user_edit", verifyToken, edit);
router.put("/user_image", upload, uploadPhoto);

router.delete("/user_delete", remove);
router.post("/user_login", login);
router.get("/user_pagination", paginate);
router.get("/token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
