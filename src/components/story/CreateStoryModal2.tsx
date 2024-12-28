import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    ChangeEvent,
} from 'react';
import { useUpload } from '@/hooks/useUpload';
import storyService, { CreateStory } from '@/services/story.service';

export interface CreateStoryModalRef {
    open: () => void;
    close: () => void;
}

interface ModalProps {
    onOpen?: () => void;
    onClose?: () => void;
    onUploadSuccess?: (url: string) => void;
    callback?: () => void;
}

const CreateStoryModal = forwardRef<CreateStoryModalRef, ModalProps>(({ onOpen, onClose, onUploadSuccess }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<'image' | 'video'>('image');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { upload, isUploading, error } = useUpload({
        onSuccess: async (url) => {
            const story = await storyService.createStory({
                mediaUrl: String(url),
                mediaType: type === 'image' ? 'image' : 'video',
                mediaDuration: 0,
                thumbnail: '',
                caption: '',
                location: '',
            });
            if (!story) {
                return console.warn('story not found');
            }
            onUploadSuccess?.(String(url));
            setIsOpen(false);
        },
    });

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
            setType(type);
            setSelectedFile(null);
            setPreviewUrl(null);
            onOpen?.();
        },
        close: () => {
            setIsOpen(false);
            onClose?.();
        },
    }));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                return;
            }
            if (!file.type.startsWith('image/')) {
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        await upload(selectedFile, 'storyMedia');
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[800px] h-[800px]">
                {/* Header */}
                <div className="flex justify-between items-center bg-gray-200 p-4 h-16 rounded-t-lg">
                    <h2 className="text-lg font-semibold">Upload Story</h2>
                    <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center gap-4">
                    <div className="w-full max-w-md">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Select Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100
                                        cursor-pointer"
                            />
                        </label>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error.message}</div>
                    )}

                    {previewUrl && (
                        <div className="mt-4 relative">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-md max-h-[400px] object-contain rounded-lg"
                            />
                        </div>
                    )}

                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                            className={`px-6 py-2 rounded-md text-white font-medium
                                    ${!selectedFile || isUploading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium
                                    hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
);

export default CreateStoryModal;
