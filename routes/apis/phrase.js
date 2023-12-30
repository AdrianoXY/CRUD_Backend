const express = require("express");
const router = express.Router();
const PHRASE = require("../../models/phrase");

router
  .route("/")
  .post((req, res) => {
    try {
      const phraseData = req.body;
      const addPhrase = new PHRASE(phraseData);
      addPhrase.save();
      res.status(201).json({ message: "新增成功" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "新增失敗" });
    }
  })
  .get(async (req, res) => {
    try {
      const getPhrase = await PHRASE.find();
      if (getPhrase.length === 0) {
        res.status(204).json({ results: getPhrase });
      } else {
        res.status(200).json({ results: getPhrase });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "查詢失敗" });
    }
  });

router
  .route("/:phraseId")
  .delete(async (req, res) => {
    try {
      const { phraseId } = req.params;
      const deletePhrase = await PHRASE.findOneAndDelete({ _id: phraseId });
      if (!deletePhrase) {
        res.status(404).json({ message: "無此資料" });
      } else {
        res.status(200).json({ message: "刪除成功" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "刪除失敗" });
    }
  })
  .patch(async (req, res) => {
    try {
      const { phraseId } = req.params;
      const updatePhrase = await PHRASE.findOneAndUpdate(
        { _id: phraseId },
        { $set: req.body },
        { returnDocument: "after" }
      );
      res.status(200).json({ results: updatePhrase });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "更新失敗" });
    }
  });

module.exports = router;
