import type { Meta, StoryObj } from '@storybook/react';
import UpdateProfileModal, { UpdateProfileModalRef } from './UpdateProfileModal';
import { useRef } from 'react';

const meta = {
  title: 'Pages/Profile/UpdateProfileModal',
  component: UpdateProfileModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UpdateProfileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle the ref
const UpdateProfileModalWrapper = (args: any) => {
  const modalRef = useRef<UpdateProfileModalRef>(null);

  return (
    <div>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>
      <UpdateProfileModal
        ref={modalRef}
        setUser={(user) => console.log('User updated:', user)}
        onOpen={() => console.log('Modal opened')}
        onClose={() => console.log('Modal closed')}
        {...args}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <UpdateProfileModalWrapper {...args} />,
};

export const WithPrefilledData: Story = {
  render: (args) => (
    <UpdateProfileModalWrapper
      {...args}
      defaultValues={{
        username: 'johndoe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Software Developer',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        interestedIn: 'female',
        location: {
          type: 'Point',
          coordinates: null,
        },
        relationStatus: 'single',
        height: '175',
        interests: 'coding, reading',
        occupation: 'Software Engineer',
        education: 'Bachelor Degree',
        phoneNumber: '1234567890',
        live: {
          city: 'Bangkok',
          country: 'Thailand',
        },
      }}
    />
  ),
};

export const LoadingState: Story = {
  render: (args) => (
    <UpdateProfileModalWrapper
      {...args}
      isLoading={true}
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <UpdateProfileModalWrapper
      {...args}
      error="Failed to update profile"
    />
  ),
};
