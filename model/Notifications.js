var db = require('./Conn');

module.exports = class  {
    static async getNotificationsForUser(id){
        return await db.query('SELECT * FROM notificacoes WHERE user_id = ? AND lida = 0', [id]);
    }

    static async readNotificationUser(id){
        return await db.query('UPDATE notificacoes SET lida = 1 WHERE id = ?', [id]);
    }

    static async addNotificationUser(id, mensagem, link){
        return await db.query('INSERT INTO notificacoes (user_id, message, link) VALUES (?, ?, ?)', [id, mensagem, link]);
    }
}