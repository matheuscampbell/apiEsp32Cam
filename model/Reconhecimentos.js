var db = require('./Conn');

module.exports = class  {
    static async getAllReconhecimentosAProcessar(){
        return await db.query('SELECT * FROM reconhecimentos WHERE processado = 0');
    }

    static async getAllClientesOfReconhecimentosAProcessar(){
        return await db.query('SELECT * FROM reconhecimentos WHERE processado = 0 AND user_id IS NOT NULL GROUP BY user_id');
    }
    static async getAllProdductsOfCliente(id){
        return await db.query('SELECT * FROM reconhecimentos WHERE user_id = ? AND processado = 0 GROUP BY produto', [id]);
    }

    static async getAllDepartamentosOfCliente(id){
        return await db.query('SELECT * FROM reconhecimentos WHERE user_id = ? AND processado = 0 GROUP BY departamento', [id]);
    }

    //get all by product and user
    static async getAllReconhecimentosByProductAndUser(id, produto){
        return await db.query('SELECT * FROM reconhecimentos WHERE user_id = ? AND produto = ? AND processado = 0', [id, produto]);
    }

    //get all by department and user
    static async getAllReconhecimentosByDepartmentAndUser(id, departamento){
        return await db.query('SELECT * FROM reconhecimentos WHERE user_id = ? AND departamento = ? AND processado = 0', [id, departamento]);
    }

    //get all by user
    static async getAllReconhecimentosByUser(id){
        return await db.query('SELECT * FROM reconhecimentos WHERE user_id = ? AND processado = 0', [id]);
    }

    static async setReconcimentoProcessado(id){
        return await db.query('UPDATE reconhecimentos SET processado = 1 WHERE id = ?', [id]);
    }

    //add reconhecimento
    static async addReconhecimento(dispositivo,loja, produto, departamento, image){
        return await db.query('INSERT INTO reconhecimentos (dispositivo, loja, produto, departamento, image) VALUES (?, ?, ?, ?, ?)', [ dispositivo, loja, produto, departamento, image]);
    }

    //set reconhecimento user
    static async updateReconhecimentoUser(id, user_id){
        return await db.query('UPDATE reconhecimentos SET user_id = ? WHERE id = ?', [user_id, id]);
    }

    //update reconhecimento imageVector
    static async updateReconhecimentoImageVector(id, imageVector){
        return await db.query('UPDATE reconhecimentos SET imagevector = ? WHERE id = ?', [imageVector, id]);
    }

    //get to vectorize reconhecimento
    static async getReconhecimentoToVectorize(){
        return await db.query('SELECT * FROM reconhecimentos WHERE imagevector IS NULL');
    }

    static async getReconhecimentoToRecognize(){
        return await db.query('SELECT * FROM reconhecimentos WHERE imagevector IS NOT NULL AND user_id IS NULL');
    }



}