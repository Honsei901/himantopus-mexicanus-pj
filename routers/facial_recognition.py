from PIL import Image
from fastapi import APIRouter, UploadFile, HTTPException, File

import numpy as np
import face_recognition

router = APIRouter()


# Compare with the first facial feature and return the result as a percentage.
@router.post("/facial-features/compare")
async def compare_facial_feature(
    first_file: UploadFile = File(...), second_file: UploadFile = File(...)
):
    first_image = np.array(Image.open(first_file.file))
    second_image = np.array(Image.open(second_file.file))

    first_image_encodings = face_recognition.face_encodings(first_image)
    second_image_encodings = face_recognition.face_encodings(second_image)

    if first_image_encodings and second_image_encodings:

        first_encoding = first_image_encodings[0]
        second_encoding = second_image_encodings[0]

        if compare_faces(first_encoding, second_encoding):
            return {"message": "Same face"}
        else:
            return {"message": "Different face"}
    else:
        raise HTTPException(
            status_code=400, detail="Could not detect a face in one or both images"
        )


def compare_faces(first_encoding, second_encoding, threshold=0.5):
    # Calculate Euclidean distance.
    distance = np.linalg.norm(np.array(first_encoding) - np.array(second_encoding))
    # Compare previouse facial feature with new one by using threshold.
    return distance < threshold
