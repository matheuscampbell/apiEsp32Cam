var db = require('../bin/dataBaseConn');

function getImages(req, res) {
    db.query('SELECT * FROM images', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
}

async function getUsers(){
    await db.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

exports.getImages = getImages;
exports.getUsers = getUsers;