import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import Webcam from 'react-webcam';
import { compareFacialFeatures } from '../core/apis';

export const Body = () => {
  const [isFirstPhotoCaptured, setIsFirstPhotoCaptured] =
    useState<boolean>(false);

  const [firstFacialFeature, setFirstFacialFeature] = useState<Blob | null>(
    null
  );

  const [matchingRate, setMatchingRate] = useState<number>(0);

  const webcamRef = useRef<Webcam>(null);

  const resetApp = (): void => {
    setMatchingRate(0);
    setFirstFacialFeature(null);
  };

  /**
   * Receive first facial features.
   */
  const captureFirstFaceImage = async (): Promise<void> => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        setFirstFacialFeature(blob);
      }
    }
  };

  /**
   * Compare with first facial features and get matching rate.
   */
  const getMatchingRate = async (): Promise<void> => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc && firstFacialFeature) {
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('second_file', blob);
        formData.append('first_file', firstFacialFeature);

        try {
          const { data } = await compareFacialFeatures(formData);
          console.log(data);
          setMatchingRate(100);
        } catch (error) {
          console.error(error);
        }

        resetApp();
        setIsFirstPhotoCaptured(false);
      }
    }
  };

  useEffect(() => {
    if (firstFacialFeature) {
      setIsFirstPhotoCaptured(true);
    }
  }, [firstFacialFeature]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[150px] relative">
        <div className="mb-2 text-2xl">
          The matching rate is{' '}
          <span className="text-red-500">{matchingRate}</span>%
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

      {isFirstPhotoCaptured ? (
        <div className="mt-10 flex justify-center">
          <Button variant="contained" color="error" onClick={getMatchingRate}>
            <div className="text-xl">SECOND CAPTURE</div>
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <Button variant="contained" onClick={captureFirstFaceImage}>
            <div className="text-xl">FIRST CAPTURE</div>
          </Button>
        </div>
      )}
    </>
  );
};
