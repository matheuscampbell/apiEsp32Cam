import face_recognition
import sys
import banco

banco = banco.Banco()

images = banco.getReconhecimentoToVectorize()

for image in images:
    picture_of_me = face_recognition.load_image_file('../public/images/'+image[8])
    my_face_encoding = face_recognition.face_encodings(picture_of_me)[0]
    banco.updateReconhecimentoImageVector(image[0], my_face_encoding)


