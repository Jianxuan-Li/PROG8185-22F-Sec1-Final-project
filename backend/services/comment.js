import path from "path";
import express from "express";
import commentModel from "../models/comment.js";
import shortid from "shortid";
import { staticPath } from "../config.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the get route
router.get("/", async (req, res) => {
  // send comment
  const comment = await commentModel.find({});
  res.send(comment);
});

// get comment by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await commentModel.findById(id);
    res.send(comment);
  } catch (err) {
    res.status(404).send({ message: "comment Not Found." });
  }
});

// get comment by product id
router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await commentModel
      .find({ product: id })
      .populate("user");
    res.send(comment);
  } catch (err) {
    res.status(404).send({ message: "comment Not Found." });
  }
});

// delete comment by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedComment = await commentModel.findByIdAndDelete(id);
    if (deletedComment) {
      res.send({ message: "Comment Deleted" });
    }else{
      res.status(404).send({ message: "Comment Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "Comment Not Found." });
  }
});

// create comment
router.post("/product/:id", (req, res) => {
  const data = req.body;
  data.product = req.params.id;
  const comment = new commentModel(data);
  comment.save((err, comment) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(comment);
    }
  });
});

// update comment
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  let newFileName = null;

  // extract image from form data
  if (req.files) {
    const image = req.files.image;
    const ext = image.name.split(".").pop();
    const filename = `image/${shortid.generate() + "." + ext}`;
    const imagePath = path.join(staticPath, filename);

    // save image to disk
    image.mv(imagePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });

    newFileName = filename;
  }

  try {
    const comment = await commentModel.findById(id);
    if (comment) {
      comment.text = data.text;
      comment.credate = data.credate;
      if (newFileName) {
        comment.image = newFileName;
      }
      const updatedComment = await comment.save();
      res.send(updatedComment);
    } else {
      res.status(404).send({ message: "Comment Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "Comment Not Found." });
  }
});

export default router;
