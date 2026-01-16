const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
 
const urlRoutes = require("./routes/url");
const { connectDB } = require("./routes/connect");

const URL = require("./models/url");

connectDB(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});


app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});


app.use("/",urlRoutes);
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);


app.get("/r/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) return res.status(404).send("Not found");

  res.redirect(entry.redirectURL);
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});