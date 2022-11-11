const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./model/db/database.db');
//query
module.exports = class {
    static async query(sql, params) {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    //meke database tables
    static async makeTables() {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, loja INTEGER, image TEXT, token TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
//cria a tabela userimages (imagens dos usuarios)
        db.run('CREATE TABLE IF NOT EXISTS userimages (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, image TEXT, imageVector TEXT)');
//cria a tabela lojas
        db.run('CREATE TABLE IF NOT EXISTS lojas (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image TEXT, imageVector TEXT)');
//cria a tabela de departamentos
        db.run('CREATE TABLE IF NOT EXISTS departamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, loja INTEGER)');
//cria a tabela de produtos
        db.run('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, departamento INTEGER, image TEXT, imageVector TEXT, price REAL, loja INTEGER)');
//cria tabela de faces a serem processadas (imagens de usuarios)
        db.run('CREATE TABLE IF NOT EXISTS faces (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, imageVector TEXT, user_id INTEGER, loja INTEGER, departamento INTEGER, produto INTEGER)');
//criar tabela de interesses de ultimos locais de reconhecimento do usuario
        db.run('CREATE TABLE IF NOT EXISTS reconhecimentos (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, dispositivo INTEGER, loja INTEGER, departamento INTEGER, produto INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, processado INTEGER default 0)');
// cria tabela de interesses
        db.run('CREATE TABLE IF NOT EXISTS interesses (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, loja INTEGER, departamento INTEGER, produto INTEGER, date DATETIME DEFAULT CURRENT_TIMESTAMP)');
//cria tabela de notificacoes
        db.run('CREATE TABLE IF NOT EXISTS notificacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, timestamp INTEGER, message TEXT, link TEXT)');
        //cria tabela de dispositivos
        db.run('CREATE TABLE IF NOT EXISTS dispositivos (id INTEGER PRIMARY KEY AUTOINCREMENT, mac TEXT, loja INTEGER, departamento INTEGER, produto INTEGER, date DATETIME DEFAULT CURRENT_TIMESTAMP)');
    }
}
