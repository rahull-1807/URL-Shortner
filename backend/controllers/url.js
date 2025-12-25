const { nanoid } = require("nanoid"); 
const URL = require("../models/url");


async function handleGenerateShortUrl(req, res) {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "URL required" });
  }

  const shortID = customAlias ? customAlias : nanoid(8);

  
  const existing = await URL.findOne({ shortID });
  if (existing) {
    return res.status(409).json({ message: "Custom alias already taken" });
  }

  await URL.create({
    shortID,
    redirectURL: originalUrl,
    createdBy: req.user.id,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}


async function handleGetAnalytics(req, res) {     
    const  shortID = req.params.shortID;
    const url = await URL.findOne({shortID: shortID});
    return res.json({
        totalClicks: url.visitHistory.length,
        visitHistory: url.visitHistory
    });
}


async function handleGetUserUrls(req, res) {
  const userId = req.user.id;

  const urls = await URL.find({ createdBy: userId });

  return res.json(urls);
}


module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
    handleGetUserUrls,
};