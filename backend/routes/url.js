const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const { handleGenerateShortUrl, handleGetAnalytics, handleGetUserUrls } = require('../controllers/url');


router.post('/',auth, handleGenerateShortUrl);

router.get('/analytics/:shortID',handleGetAnalytics);

router.get("/my",auth, handleGetUserUrls);


module.exports = router;    