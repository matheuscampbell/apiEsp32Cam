const { exec } = require("child_process");
var faces = require('../model/Faces');
module.exports = class  {
    static async hasFaceInImage(imageFile){

        return new Promise((resolve, reject) => {
            exec(`python ./python/faceDetection.py  ${imageFile}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(stderr);
                }
                console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        });
    }

    static async DetectFaceRecognize(vector){
        return new Promise(async (resolve, reject) => {
            var facesVector = (await faces.getAllImageVectorFaces()).imagesVector;
            facesVector = JSON.stringify(facesVector);
            vector = JSON.stringify(vector);
            exec(`python ./python/faceRecognition.py  ${facesVector} ${vector} 80`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(stderr);
                }
                console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        });
    }

}