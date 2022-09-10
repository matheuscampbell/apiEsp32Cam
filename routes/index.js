var express = require('express');
var router = express.Router();
var db = require('../bin/dataBaseConn');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/db', async function(req, res, next) {
  await db.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    return results;
  });
});


module.exports = router;
