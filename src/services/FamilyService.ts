// ideally we'd return family members from a database, but for now we'll just return a hardcoded list

import { FamilyMember } from '../types';

const familyMembers: FamilyMember[] = [
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

const getFamilyMembers = async (): Promise<FamilyMember[]> => {
  return familyMembers;
};

export default {
  getFamilyMembers,
};
