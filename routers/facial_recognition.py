from fastapi import APIRouter, UploadFile, HTTPException, File
from PIL import Image
from io import BytesIO

import numpy as np
import face_recognition

router = APIRouter()


# Get facial feature.
@router.post("/facial-features")
async def get_facial_feature():
    return {"data": "facial feature"}


# Compare with the first facial feature and return the result as a percentage.
@router.post("/facial-features/compare")
async def compare_facial_feature():
    return {"data": "resul"}
