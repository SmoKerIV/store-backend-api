const express = require("express");
const { getStudents, addStudent } = require("../models/Student");
const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);

module.exports = router;
