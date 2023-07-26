const express = require("express");

const {
  list,
  add,
  edit,
  remove,
  search,
  sort,
  getById,
  listById,
  listLike,
  listAllById,
  paginate,
} = require("../controller/food.controller");

const router = express.Router();
const { hitProductAll } = require("../middleware/redis");
const upload = require("../middleware/upload");
const auth = require("../middleware/staticAuth");
const verifyToken = require("../middleware/verifyToken");

router.get("/food", list);
router.get("/food_like", listLike);
router.get("/food/:id", listById);
router.get("/foodByUserId", listAllById);
router.post("/food_add", upload, add);
router.put("/food_edit/:id", upload, edit);
router.delete("/food_delete/:id", remove);
router.get("/food_search/:name", search);
router.get("/food_sort", sort);
router.get("/food_pagination", paginate);

// REDIS
router.get("/v1/getFromRedis/:id", hitProductAll, getById);
module.exports = router;
