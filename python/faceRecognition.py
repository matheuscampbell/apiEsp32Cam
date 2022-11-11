import face_recognition
import sys
import json

# json to array conversion
import banco
from bks.faceRecognition import allFaces

banco = banco.Banco()

images = banco.getReconhecimentoToRecognize()

allFaces = banco.getAllImageVectorFaces()

for image in images:
    results = face_recognition.compare_faces(allFaces, image[9], 80)
    if True in results:
        r = images[results.index(True)][1]
        banco.updateReconhecimentoUser(image[0], r)
    else:
        banco.updateReconhecimentoUser(image[0], 0)

