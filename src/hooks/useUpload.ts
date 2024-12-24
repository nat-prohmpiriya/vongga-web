import { useState } from 'react';
import { uploadService } from '@/services/upload.service';

interface UseUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export const useUpload = (options?: UseUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File, type: 'photoProfile' | 'photoCover') => {
    try {
      setIsUploading(true);
      setError(null);

      const response = await uploadService.uploadFile(file, type);
      options?.onSuccess?.(response.url);

      return response;
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
