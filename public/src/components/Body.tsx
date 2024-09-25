import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import Webcam from 'react-webcam';
import { requestFaceEncodings } from '../core/apis';

export const Body = () => {
  const [photoData, setPhotoData] = useState<number[]>([]);
  const webcamRef = useRef<Webcam>(null);

  /**
   * Receive a facial features
   */
  const captureFaceImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('file', blob);

        try {
          const { data } = await requestFaceEncodings(formData);
          setPhotoData(data.encodings);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (photoData.length > 0) {
      console.log(photoData);
    }
  }, [photoData]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[150px] relative">
        <div className="mb-2 text-2xl">
          The matching rate is <span className="text-red-500">85</span>%
        </div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
        />
        <div className="text-2xl absolute top-16">
          <div className="flex gap-52">
            <div className="w-[70px] h-[70px] border-t-4 border-l-4 whitespace-pre">
              {' '}
            </div>
            <div className="w-[70px] h-[70px] border-t-4 border-r-4 whitespace-pre">
              {' '}
            </div>
          </div>
          <div className="mt-48 flex gap-52">
            <div className="w-[70px] h-[70px] border-b-4 border-l-4 whitespace-pre">
              {' '}
            </div>
            <div className="w-[70px] h-[70px] border-b-4 border-r-4 whitespace-pre">
              {' '}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="contained" onClick={captureFaceImage}>
          <div className="text-xl">CAPTURE</div>
        </Button>
      </div>
    </>
  );
};
