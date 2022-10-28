import cv2
import sys
import os
imagePath = sys.argv[1]
cascPath = os.path.dirname(os.path.abspath(__file__))+'/haarcascade_frontalface_default.xml'
faceCascade = cv2.CascadeClassifier(cascPath)
image = cv2.imread(imagePath)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
faces = faceCascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30),
    flags=cv2.CASCADE_SCALE_IMAGE
)
if (len(faces) > 0):
    print("true")
    sys.exit("True")
else:
    print("false")
    sys.exit("False")
