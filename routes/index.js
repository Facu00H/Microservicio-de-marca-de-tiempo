var express = require("express");
var router = express.Router();


router.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

router.get("/api/", (req, res) => {
  res.status(200).json({
    utc: `${new Date().toUTCString()}`,
  });
});

router.get("/api/:date", (req, res) => {
  const param = req.params['date'];
  const todayDate = new Date(param);
  const unixTimestamp = Math.floor(todayDate.getTime() / 1000);
  if (isNaN(Date.parse(todayDate)) === false) {
    res.status(200).json({
      unix: unixTimestamp,
      utc: `${todayDate.toUTCString()}`,
    });
  }else{
    const unixToUtc = param * 1000;
    let unix = Number(param);
    let dateObj = new Date(unixToUtc);
    if (isNaN(Date.parse(dateObj)) === false) {
      res.status(200).json({
        unix: unix,
        utc: `${dateObj.toUTCString()}`,
      });
    }else{
      res.status(400).json({
        error: "invalid date",
      });
    };
  };
});

module.exports = router;