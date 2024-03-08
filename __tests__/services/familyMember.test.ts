import familyMemberService from '../../src/services/FamilyService';

describe('familyMemberService', () => {
  const mockData = [
    {
      id: '2228b530e055401f81ba37b51ff6f81d',
      name: 'Bart',
      age: 10,
      relation: 'Son',
    },
    {
      id: 'd6c1355e38194139b8d0c870baf86365',
      name: 'Lisa',
      age: 8,
      relation: 'Daughter',
    },
    {
      id: 'f9bf229fd19e4c799e8c19a962d73449',
      name: 'Maggie',
      age: 1,
      relation: 'Daughter',
    },
  ];
  describe('getFamilyMembers', () => {
    it('should return a list of family members', async () => {
      const expectedFamilyMembers = mockData;

      const familyMembers = await familyMemberService.getFamilyMembers();

      expect(familyMembers).toEqual(expectedFamilyMembers);
    });
  });
});
