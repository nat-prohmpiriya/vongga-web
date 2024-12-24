import vonggaAxios from '../utils/vonggaAxios';

export interface UploadResponse {
  url: string;
  fileName: string;
}

export const uploadService = {
  uploadFile: async (file: File, type: 'photoProfile' | 'photoCover'): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const { data } = await vonggaAxios.post<UploadResponse>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    } catch (error: any) {
      console.error('uploadFile error', {
        message: error.response.data.message,
        status: error.response.status
      })
      throw error
    }
  },
};
