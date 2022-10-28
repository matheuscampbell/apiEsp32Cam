import face_recognition
import sys
import json

# json to array conversion

allFaces = json.loads(sys.argv[1])
faceToRecognition = json.loads(sys.argv[2])
tolerance = float(sys.argv[3])



results = face_recognition.compare_faces(allFaces, faceToRecognition, tolerance)

# find the index of the first match
if True in results:
    sys.exit(results.index(True))
else:
    sys.exit(False)

