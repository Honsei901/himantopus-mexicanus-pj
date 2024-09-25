from fastapi import APIRouter, UploadFile, HTTPException, File
from PIL import Image
from io import BytesIO

import numpy as np
import face_recognition

router = APIRouter()


# Get facial feature.
@router.post("/facial-features")
async def get_facial_feature(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        image = Image.open(BytesIO(file_content))
        image_array = np.array(image)
        face_encodings = face_recognition.face_encodings(image_array)

        if not face_encodings:
            return {"encodings": None}

        result = face_encodings[0].tolist()
        return {"encodings": result}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": {"code": "INTERNAL_SERVER_ERROR", "message": str(e)}},
        )


# Compare with the first facial feature and return the result as a percentage.
@router.post("/facial-features/compare")
async def compare_facial_feature():
    return {"data": "resul"}
