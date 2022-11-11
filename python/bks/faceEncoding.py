import face_recognition
import sys
picture_of_me = face_recognition.load_image_file(sys.argv[1])
my_face_encoding = face_recognition.face_encodings(picture_of_me)[0]
sys.exit(my_face_encoding)
