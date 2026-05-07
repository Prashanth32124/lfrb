const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ❤️");
})
.catch((err) => {
  console.log(err);
});

const responseSchema = new mongoose.Schema({

  answer: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },

});

const Response = mongoose.model("Response", responseSchema);

app.post("/api/response", async (req, res) => {

  try {

    const newResponse = new Response({
      answer: req.body.answer,
    });

    await newResponse.save();

    res.status(200).json({
      success: true,
      message: "Response Saved ❤️",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

});

app.get("/", (req, res) => {
  res.send("Love Server Running ❤️");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});