//implementa o banco sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./model/db/database.db');
// verifica se o banco de dados existe
