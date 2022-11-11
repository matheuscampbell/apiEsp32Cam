var db = require('./Conn');

module.exports = class  {
    static async getAllImageVectorFaces(){
        var array = [];
        var users = [];
        var faces = await db.query('SELECT imageVector FROM faces');
        if(faces && faces.length > 0){
            for(var i = 0; i < faces.length; i++){
                array.push(faces[i].imageVector);
                users.push(faces[i].user_id);
            }
        }
        return {imagesVector, users};
    }

    static async getFaceById(id){
        return await db.query('SELECT * FROM faces WHERE id = ?', [id]);
    }

}