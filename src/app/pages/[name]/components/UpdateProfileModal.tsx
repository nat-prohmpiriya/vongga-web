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
            firstName: '',
            lastName: '',
            bio: '',
            dateOfBirth: '',
            gender: '',
            interestedIn: '',
            location: {
                type: '',
                coordinates: null
            },
            relationStatus: '',
            height: '',
            interests: '',
            occupation: '',
            education: '',
            phoneNumber: '',
            live: {
                city: '',
                country: '',
            },
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

        const handleSubmit = async () => {
            try {
                setIsLoading(true);
                // Filter out empty fields and format data
                const formattedData = Object.entries(dataForm).reduce((acc: Record<string, any>, [key, value]) => {
                    // Handle live object separately
                    if (key === 'live') {
                        const liveValue = value as { city: string; country: string };
                        if (liveValue.city || liveValue.country) {
                            acc[key] = {
                                ...(liveValue.city && { city: liveValue.city }),
                                ...(liveValue.country && { country: liveValue.country })
                            };
                        }
                        return acc;
                    }

                    // Handle location object separately
                    if (key === 'location') {
                        const locationValue = value as { type: string; coordinates: number[] | null };
                        if (locationValue.type || locationValue.coordinates) {
                            acc[key] = {
                                type: locationValue.type || '',
                                coordinates: locationValue.coordinates || null
                            };
                        }
                        return acc;
                    }
                    
                    // Skip empty strings, null, or undefined values
                    if (value === '' || value === null || value === undefined) {
                        return acc;
                    }

                    // Convert camelCase to snake_case for API
                    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                    
                    // Format date if it's dateOfBirth
                    if (key === 'dateOfBirth' && value) {
                        const date = new Date(value as string);
                        acc[snakeKey] = date.toISOString();
                    } else {
                        acc[snakeKey] = value;
                    }
                    
                    return acc;
                }, {});

                const updatedUser = await userService.updateUserProfile(formattedData);
                if (updatedUser) {
                    setUser?.(updatedUser);
                    setIsOpen(false);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                setIsLoading(false);
            }
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

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onClose?.();
                            }}
                            className="text-3xl text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 overflow-y-auto max-h-[calc(100%-4rem)]">
                        <div className="grid grid-cols-2 gap-4">
                            <VTextInput
                                label="Username"
                                value={dataForm.username}
                                onChange={(e) => setDataForm({ ...dataForm, username: e.target.value })}
                                data-testid="username-input"
                            />
                            <VTextInput
                                label="Email"
                                value={dataForm.email}
                                onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
                                data-testid="email-input"
                            />
                            <VTextInput
                                label="First Name"
                                value={dataForm.firstName}
                                onChange={(e) => setDataForm({ ...dataForm, firstName: e.target.value })}
                                data-testid="firstName-input"
                            />
                            <VTextInput
                                label="Last Name"
                                value={dataForm.lastName}
                                onChange={(e) => setDataForm({ ...dataForm, lastName: e.target.value })}
                                data-testid="lastName-input"
                            />
                            <VTextInput
                                label="Bio"
                                value={dataForm.bio}
                                onChange={(e) => setDataForm({ ...dataForm, bio: e.target.value })}
                                data-testid="bio-input"
                            />
                            <VTextInput
                                label="Date of Birth"
                                type="date"
                                value={dataForm.dateOfBirth}
                                onChange={(e) => setDataForm({ ...dataForm, dateOfBirth: e.target.value })}
                                data-testid="dateOfBirth-input"
                            />
                            <VTextInput
                                label="Gender"
                                value={dataForm.gender}
                                onChange={(e) => setDataForm({ ...dataForm, gender: e.target.value })}
                                data-testid="gender-input"
                            />
                            <VTextInput
                                label="Interested In"
                                value={dataForm.interestedIn}
                                onChange={(e) => setDataForm({ ...dataForm, interestedIn: e.target.value })}
                                data-testid="interestedIn-input"
                            />
                            <VTextInput
                                label="Location Type"
                                value={dataForm.location.type}
                                onChange={(e) => setDataForm({ 
                                    ...dataForm, 
                                    location: { 
                                        ...dataForm.location, 
                                        type: e.target.value 
                                    } 
                                })}
                                placeholder="Enter location type"
                                data-testid="locationType-input"
                            />
                            <VTextInput
                                label="Relation Status"
                                value={dataForm.relationStatus}
                                onChange={(e) => setDataForm({ ...dataForm, relationStatus: e.target.value })}
                                data-testid="relationStatus-input"
                            />
                            <VTextInput
                                label="Height"
                                type="number"
                                value={dataForm.height}
                                onChange={(e) => setDataForm({ ...dataForm, height: e.target.value })}
                                data-testid="height-input"
                            />
                            <VTextInput
                                label="Interests"
                                value={dataForm.interests}
                                onChange={(e) => setDataForm({ ...dataForm, interests: e.target.value })}
                                data-testid="interests-input"
                            />
                            <VTextInput
                                label="Occupation"
                                value={dataForm.occupation}
                                onChange={(e) => setDataForm({ ...dataForm, occupation: e.target.value })}
                                data-testid="occupation-input"
                            />
                            <VTextInput
                                label="Education"
                                value={dataForm.education}
                                onChange={(e) => setDataForm({ ...dataForm, education: e.target.value })}
                                data-testid="education-input"
                            />
                            <VTextInput
                                label="Phone Number"
                                value={dataForm.phoneNumber}
                                onChange={(e) => setDataForm({ ...dataForm, phoneNumber: e.target.value })}
                                data-testid="phoneNumber-input"
                            />
                            <VTextInput
                                label="City"
                                value={dataForm.live.city}
                                onChange={(e) => setDataForm({ ...dataForm, live: { ...dataForm.live, city: e.target.value } })}
                                placeholder="Enter your current live status"
                                data-testid="city-input"
                            />
                            <VTextInput
                                label="Country"
                                value={dataForm.live.country}
                                onChange={(e) => setDataForm({ ...dataForm, live: { ...dataForm.live, country: e.target.value } })}
                                placeholder="Enter your current live status"
                                data-testid="country-input"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <VBtn
                                variant="primary"
                                onClick={handleSubmit}
                                className="w-40 flex items-center justify-center"
                                disabled={isLoading}
                                loading={isLoading}
                            >
                                Update
                            </VBtn>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }
);

export default UpdateProfileModal;
