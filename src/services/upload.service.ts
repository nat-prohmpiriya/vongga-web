import vonggaAxios from '../utils/vonggaAxios';

export interface UploadResponse {
  url: string;
  fileName: string;
}

export const uploadService = {
  uploadFile: async (file: File, type: 'photoProfile' | 'photoCover'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const { data } = await vonggaAxios.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
};
