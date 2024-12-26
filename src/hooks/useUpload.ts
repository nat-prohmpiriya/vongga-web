import { useState } from 'react';
import { uploadService, UploadType } from '@/services/upload.service';

interface UseUploadOptions {
  onSuccess?: (urls: string | string[]) => void;
  onError?: (error: Error) => void;
}

export const useUpload = (options?: UseUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File | File[], type: UploadType) => {
    try {
      setIsUploading(true);
      setError(null);

      if (Array.isArray(file)) {
        const responses = await uploadService.uploadMultipleFiles(file, type);
        const urls = responses.map(response => response.url);
        options?.onSuccess?.(urls);
        return responses;
      } else {
        const response = await uploadService.uploadFile(file, type);
        options?.onSuccess?.(response.url);
        return response;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
  };
};
