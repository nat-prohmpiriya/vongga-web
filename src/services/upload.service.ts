import vonggaAxios from '../utils/vonggaAxios';

export interface UploadResponse {
  url: string;
  fileName: string;
}

export type UploadType = 'photoProfile' | 'photoCover' | 'postMedia' | 'story';

export const uploadService = {
  uploadFile: async (file: File, type: UploadType): Promise<UploadResponse> => {
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
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status
      })
      throw error
    }
  },

  uploadMultipleFiles: async (files: File[], type: UploadType): Promise<UploadResponse[]> => {
    try {
      const uploadPromises = files.map(file => uploadService.uploadFile(file, type));
      return await Promise.all(uploadPromises);
    } catch (error: any) {
      console.error('uploadMultipleFiles error', error);
      throw error;
    }
  }
};
