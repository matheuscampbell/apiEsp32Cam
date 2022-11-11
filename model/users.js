


var db = require('./Conn');
module.exports = class  {
    static async getUsers() {
        return await db.query('SELECT * FROM users');
    }

    static async getUsersById(id) {
        return await db.query('SELECT * FROM users WHERE id = ?', [id]);
    }

    static async getUserByToken(token) {
        return await db.query('SELECT * FROM users WHERE token = ?', [token]);
    }

    static async getUserByEmail(email) {
        return await db.query('SELECT * FROM users WHERE email = ?', [email]);
    }

    static async setUserToken(id, token) {
        return await db.query('UPDATE users SET token = ? WHERE id = ?', [token, id]);
    }

    static async deleteUserByToken(token) {
        return await db.query('DELETE FROM users WHERE token = ?', [token]);
    }

    static async createUser(name, email, password) {
        return await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    }

    static async setUserImage(id, fileName) {
        return await db.query('UPDATE users SET image = ? WHERE id = ?', [fileName, id]);
    }

    static async getUserImage(id) {
        return await db.query('SELECT image FROM users WHERE id = ?', [id]);
    }

    //add user image
    static async addUserImage(id, fileName, imageVector='') {
        return await db.query('INSERT INTO userimages (user_id, image, imageVector) VALUES (?, ?, ?)', [id, fileName, imageVector]);
    }


};