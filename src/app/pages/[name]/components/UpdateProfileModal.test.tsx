import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UpdateProfileModal, { UpdateProfileModalRef } from './UpdateProfileModal';
import userService from '@/services/user.service';

// Mock the user service
jest.mock('@/services/user.service', () => ({
  updateUserProfile: jest.fn(),
}));

describe('UpdateProfileModal', () => {
  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    dateOfBirth: '2000-01-01',
    gender: 'male',
    interestedIn: 'female',
    location: {
      type: 'Point',
      coordinates: null,
    },
    relationStatus: 'single',
    height: '170',
    interests: 'coding',
    occupation: 'developer',
    education: 'university',
    phoneNumber: '1234567890',
    live: {
      city: 'Bangkok',
      country: 'Thailand',
    },
  };

  const mockSetUser = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  let modalRef: React.RefObject<UpdateProfileModalRef>;

  beforeEach(() => {
    modalRef = React.createRef() as React.RefObject<UpdateProfileModalRef>;
    jest.clearAllMocks();
  });

  it('renders modal when opened', async () => {
    render(
      <UpdateProfileModal
        ref={modalRef}
        setUser={mockSetUser}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    // Modal should not be visible initially
    expect(screen.queryByText('Update Profile')).not.toBeInTheDocument();

    // Open modal
    await act(async () => {
      if (modalRef.current) {
        modalRef.current.open();
      }
    });

    // Modal should be visible
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(
      <UpdateProfileModal
        ref={modalRef}
        setUser={mockSetUser}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    // Open modal
    await act(async () => {
      if (modalRef.current) {
        modalRef.current.open();
      }
    });

    expect(screen.getByText('Update Profile')).toBeInTheDocument();

    // Click close button
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '×' }));
    });

    // Modal should not be visible
    expect(screen.queryByText('Update Profile')).not.toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('updates user profile when form is submitted', async () => {
    (userService.updateUserProfile as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <UpdateProfileModal
        ref={modalRef}
        setUser={mockSetUser}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    // Open modal
    await act(async () => {
      if (modalRef.current) {
        modalRef.current.open();
      }
    });

    // Fill form fields using test-id
    await act(async () => {
      const usernameInput = screen.getByTestId('username-input');
      const emailInput = screen.getByTestId('email-input');
      const firstNameInput = screen.getByTestId('firstName-input');
      const bioInput = screen.getByTestId('bio-input');
      const cityInput = screen.getByTestId('city-input');
      const countryInput = screen.getByTestId('country-input');

      await userEvent.type(usernameInput, mockUser.username);
      await userEvent.type(emailInput, mockUser.email);
      await userEvent.type(firstNameInput, mockUser.firstName);
      await userEvent.type(bioInput, mockUser.bio);
      await userEvent.type(cityInput, mockUser.live.city);
      await userEvent.type(countryInput, mockUser.live.country);

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    });

    // Wait for the update to complete
    await waitFor(() => {
      expect(userService.updateUserProfile).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    });
  });

  it('handles API error gracefully', async () => {
    const errorMessage = 'Update failed';
    (userService.updateUserProfile as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Mock console.error to prevent error output in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <UpdateProfileModal
        ref={modalRef}
        setUser={mockSetUser}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    // Open modal
    await act(async () => {
      if (modalRef.current) {
        modalRef.current.open();
      }
    });

    // Fill a field and submit
    await act(async () => {
      const usernameInput = screen.getByTestId('username-input');
      await userEvent.type(usernameInput, 'testuser');

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    });

    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error updating profile:', expect.any(Error));
    });

    // Modal should still be open
    expect(screen.getByText('Update Profile')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
