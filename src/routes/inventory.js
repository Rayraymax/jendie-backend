const express = require("express");
const router = express.Router();

const {
  getParts,
  createPart,
  updatePart,
  deletePart
} = require("../controllers/inventoryController");

router.get("/", getParts);
router.post("/", createPart);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

module.exports = router;