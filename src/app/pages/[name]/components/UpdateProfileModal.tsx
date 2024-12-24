import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    ReactNode,
    CSSProperties,
} from 'react';
import VTextInput from '@/components/common/VTextInput';
import VBtn from '@/components/common/VBtn';
import { User } from '@/types/user';
import userService from '@/services/user.service';

export interface UpdateProfileModalRef {
    open: () => void;
    close: () => void;
}

interface ModalProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onOpen?: () => void;
    onClose?: () => void;
    setUser?: (user: User) => void;
}

const UpdateProfileModal = forwardRef<UpdateProfileModalRef, ModalProps>(
    ({ children, className = '', style, onOpen, onClose, setUser }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [dataForm, setDataForm] = useState({
            username: '',
            email: '',
        })
        const [isLoading, setIsLoading] = useState(false);

        useImperativeHandle(ref, () => ({
            open: () => {
                setIsOpen(true);

                onOpen?.();
            },
            close: () => {
                setIsOpen(false);
                onClose?.();
            },
        }));

        const handleSubmit = () => {
            console.log(dataForm);
        };

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
                        <h2 className="text-lg font-semibold">Update Profile</h2>

                        <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <VTextInput label="Username" value={dataForm.username} onChange={(e) => setDataForm({ ...dataForm, username: e.target.value })} className='mb-4' />
                        <VTextInput label="Email" value={dataForm.email} onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })} className='mb-4' />
                        <VBtn variant="primary" onClick={handleSubmit} className="w-40 flex items-center justify-center" disabled={isLoading} loading={isLoading} >
                            Update
                        </VBtn>
                    </div>
                </div>
            </div>
        ) : null;
    }
);

export default UpdateProfileModal;
