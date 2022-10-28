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

async function getUsersById(id) {
    await db.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

async function createUser(name, email, password) {
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

async function setUserImage(id, fileName){
    await db.query('UPDATE users SET image = ? WHERE id = ?', [fileName, id], function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

exports.getImages = getImages;
exports.getUsers = getUsers;