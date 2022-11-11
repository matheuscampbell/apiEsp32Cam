var db = require('./Conn');
module.exports = class  {
    static async getDispositivos(){
        return await db.query('SELECT * FROM dispositivos');
    }

    static async addDispositivo(mac, loja, departamento, produto){
        return await db.query('INSERT INTO dispositivos (mac, loja, departamento, produto) VALUES (?, ?, ?, ?)', [mac, loja, departamento, produto]);
    }

    static async getDispositivoByMac(mac){
        return await db.query('SELECT * FROM dispositivos WHERE mac = ?', [mac]);
    }

    static async removeDispositivo(mac){
        return await db.query('DELETE FROM dispositivos WHERE mac = ?', [mac]);
    }
}