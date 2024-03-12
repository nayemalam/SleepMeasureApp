import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@screens/Home/index';
import familyService from '@services/FamilyService';
import { FamilyMember } from '@types';

jest.mock('@services/FamilyService');

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

const mockFamilyData: FamilyMember[] = [
  { id: '1', name: 'John Doe', relation: 'Father' },
  { id: '2', name: 'Jane Doe', relation: 'Mother' },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    familyService.getFamilyMembers.mockResolvedValue(mockFamilyData);
  });

  it('displays a loading indicator while fetching family members', async () => {
    const { getByText, queryByText } = render(
      <HomeScreen navigation={mockNavigation} />,
    );
    await act(async () => {
      await waitFor(() => {
        expect(queryByText('Retrieving family members...')).toBeTruthy();
      });
    });
  });

  it('displays family members after fetching', async () => {
    const { getByText, queryByText } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(queryByText('Retrieving family members...')).toBeNull();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Father')).toBeTruthy();
      expect(getByText('Jane Doe')).toBeTruthy();
      expect(getByText('Mother')).toBeTruthy();
    });
  });

  it('navigates to the Profile screen when a family member is pressed', async () => {
    const { getByText, queryByText, getByTestId } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(queryByText('Retrieving family members...')).toBeNull();
      expect(getByText('John Doe')).toBeTruthy();
    });

    await act(async () => {
      const memberButton = getByTestId('memberButton-1'); // since 1 is the id of john doe in mockFamilyData
      fireEvent.press(memberButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('Profile', {
      familyMember: mockFamilyData[0],
    });
  });
});
