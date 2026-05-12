export type Role = 'RESIDENT' | 'VERIFIED_RESIDENT' | 'STAFF' | 'ADMIN' | 'LUPON';

export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  purok: string;
  birthday: string;
  gender: string;
  avatar: string;
  role: Role;
  verificationStatus: VerificationStatus;
  verified: boolean;
  joined: string;
  avatarUrl?: string;
};
