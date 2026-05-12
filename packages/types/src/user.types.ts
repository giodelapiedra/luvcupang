// Shared user-related types used by both backend and mobile.
// Phase 0 keeps this minimal — Phase 1 fleshes out auth/profile fields.

export enum UserRole {
  RESIDENT = 'RESIDENT',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

export interface UserSummary {
  id: string;
  fullName: string;
  role: UserRole;
  createdAt: string; // ISO-8601
}
