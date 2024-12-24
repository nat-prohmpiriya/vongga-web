import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    ReactNode,
    CSSProperties,
} from 'react';
import VTextInput from '@/components/common/VTextInput';

export interface UpdatePhotoModalRef {
    open: (type: 'photoProfile' | 'photoCover') => void;
    close: () => void;
}

interface ModalProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onOpen?: () => void;
    onClose?: () => void;
}

const UpdatePhotoModal = forwardRef<UpdatePhotoModalRef, ModalProps>(
    ({ children, className = '', style, onOpen, onClose }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [type, setType] = useState<'photoProfile' | 'photoCover'>('photoProfile');

        useImperativeHandle(ref, () => ({
            open: (type: 'photoProfile' | 'photoCover') => {
                setIsOpen(true);
                setType(type);
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

        return isOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div
                    className={`relative bg-white rounded-lg shadow-lg w-[800px] h-[800px] ${className}`}
                    style={style}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center bg-gray-200 p-4 h-16 rounded-t-lg">
                        <h2 className="text-lg font-semibold">{type === 'photoProfile' ? 'Upload Profile Photo' : 'Upload Cover Photo'}</h2>

                        <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    {/* Content */}


                </div>
            </div>
        ) : null;
    }
);

export default UpdatePhotoModal;
