var express = require('express');
var router = express.Router();
const { exec } = require("child_process");

router.post('/:depositId', function(req, res, next) {

  const { imageFile } = req.files;
  if (!imageFile) return res.sendStatus(400);
  imageFile.mv(__dirname + '/' + imageFile.name);

  exec("python ./python/faceDetection.py " + __dirname + '/' + imageFile.name, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout} stderr: ${stderr}`);
  });

  res.send('respond with a resource');
});

module.exports = router;
