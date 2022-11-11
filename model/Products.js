var db = require('./Conn');

module.exports = class  {
    static async getProductsForUser(id){
        return await db.query('SELECT * FROM produtos JOIN interesses ON produtos.id = interesses.produto OR produtos.departamento = interesses.departamento WHERE user_id = ?', [id]);
    }

    static async getProducts(){
        return await db.query('SELECT * FROM produtos');
    }

    static async getDepartmentsForUser(id){
        return await db.query('SELECT * FROM departamentos JOIN interesses ON departamentos.id = interesses.departamento WHERE user_id = ?', [id]);
    }

    static async getDepartments(){
        return await db.query('SELECT * FROM departamentos');
    }

    static async addProduct(nome, departamento, preco, imagem){
        return await db.query('INSERT INTO produtos (name, departamento, price, image) VALUES (?, ?, ?, ?)', [nome, departamento, preco, imagem]);
    }

    static async deleteProduct(id){
        return await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    }

    static async addDepartment(nome){
        return await db.query('INSERT INTO departamentos (name) VALUES (?)', [nome]);
    }
}