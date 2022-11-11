var db = require('./Conn');

module.exports = class  {
    static async getLojas(){
        return await db.query('SELECT * FROM lojas');
    }

    static async getLojaById(id){
        return await db.query('SELECT * FROM lojas WHERE id = ?', [id]);
    }
}