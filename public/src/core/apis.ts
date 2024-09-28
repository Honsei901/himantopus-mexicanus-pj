/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

export const requestFaceEncodings = (
  formData: FormData
): Promise<AxiosResponse<{ encodings: number[] }, any>> => {
  return axios.post<{ encodings: number[] }>(
    'http://localhost:8088/api/facial-features',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const compareFacialFeatures = (
  formData: FormData
): Promise<AxiosResponse<{ message: number }, any>> => {
  return axios.post<{ message: number }>(
    'http://localhost:8088/api/facial-features/compare',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
