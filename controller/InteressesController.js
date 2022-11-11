var interesses = require('../model/Interesses');
var reconhecimentos = require('../model/Reconhecimentos');
var faces = require('../model/Faces');
var faceController = require('../controller/FaceController');
const {exec} = require("child_process");
module.exports = class {
    static async processInteresses() {
        console.log('Processing Interesses Start...');
        await this.vectorizeImages();
        await this.processFaceIdentification();
        var clientes = await reconhecimentos.getAllClientesOfReconhecimentosAProcessar();
        for (var i = 0; i < clientes.length; i++) {
            var produtos = await reconhecimentos.getAllProdductsOfCliente(clientes[i].user_id);
            var departamentos = await reconhecimentos.getAllDepartamentosOfCliente(clientes[i].user_id);
            var tempoInicial = produtos[0].timestamp;
            var somaMediaDeTempo = 0;
            var j;
            for (j = 0; j < produtos.length; j++) {
                var registros = await reconhecimentos.getAllReconhecimentosByProductAndUser(clientes[i].user_id, produtos[j].produto);
                tempoInicial = registros[0].timestamp;
                registros.forEach(function (registro) {
                    somaMediaDeTempo += produtos[j].timestamp - tempoInicial;
                });
                var mediaDeTempo = somaMediaDeTempo / registros.length;
                if (mediaDeTempo >= 1000) {
                    await interesses.addInteressesForUser(clientes[i].user_id, produtos[j].produto, 0, 0);
                }
            }

            for (j = 0; j < departamentos.length; j++) {
                var registros = await reconhecimentos.getAllReconhecimentosByDepartmentAndUser(clientes[i].user_id, departamentos[j].departamento);
                tempoInicial = registros[0].timestamp;
                registros.forEach(function (r) {
                    somaMediaDeTempo += r.timestamp - tempoInicial;
                });
                var mediaDeTempo = somaMediaDeTempo / registros.length;
                if (mediaDeTempo >= 1000) {
                    await interesses.addInteressesForUser(clientes[i].user_id, 0, departamentos[j].departamento, 0);
                }
            }
        }
        console.log('Processing Interesses End...');
    }

    static async vectorizeImages() {
        console.log('Vectorizing Images Start...');
        exec("python ./python/faceEncoding.py ", async (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
        });
        console.log('Vectorizing Images End...');
    }

    static async processFaceIdentification() {
        console.log('Face Identification Start...');
        exec(`python ./python/faceRecognition.py`, async (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
        });
        console.log('Face Identification End...');
    }
}
