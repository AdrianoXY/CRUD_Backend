const express = require("express");
const router = express.Router();
const USER = require("../../models/user");

router
  .route("/")
  .post(async (req, res) => {
    try {
      const userData = req.body;
      const addUser = await USER.findOne({ userId: req.body.userId });
      if (!addUser) {
        var user = new USER(userData);
        user = await user.save();
        res.status(201).json({ message: "建立成功" });
      } else {
        res.status(409).json({ message: "使用者已存在" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "建立失敗" });
    }
  })
  .get(async (req, res) => {
    try {
      const getUser = await USER.find();
      if (getUser.length === 0) {
        res.status(204).json({ results: getUser });
      } else {
        res.status(200).json({ results: getUser });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "查詢失敗" });
    }
  });

router
  .route("/:userId")
  .get(async (req, res) => {
    try {
      const getOneUser = await USER.findOne({ userId: req.params.userId });

      if (!getOneUser) {
        res.status(204).json({ message: "查無使用者" });
      } else {
        res.status(200).json({ results: getOneUser });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "查詢失敗" });
    }
  })
  .patch(async (req, res) => {
    try {
      const { userId } = req.params;
      const updateUser = await USER.findOneAndUpdate(
        { userId: userId },
        { $set: req.body },
        { returnDocument: "after" }
      );
      res.status(200).json({ results: updateUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "更新失敗" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId } = req.params;
      const deleteUser = await USER.findOneAndDelete({ userId: userId });
      if (!deleteUser) {
        res.status(404).json({ message: "查無使用者" });
      } else {
        res.status(200).json({ message: "刪除成功" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "刪除失敗" });
    }
  });

module.exports = router;
