var crypto = require('crypto');

module.exports = class  {
    static getToken(req) {
        return req.headers['Authorization'] || req.headers['authorization'];
    }
    static generateToken(){
        return crypto.randomBytes(20).toString('hex');
    }

    static generateUniqueId() {
        return crypto.randomBytes(1).toString('hex');
    }

    static getImageExtension(imageBase64) {
        var image_extension = imageBase64.split(';')[0].split('/')[1];
        return image_extension;
    }
}