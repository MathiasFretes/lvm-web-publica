/**
 * Admin Type Definitions
 * Single source of truth for admin types across the app
 * Consolidates types from AdminContext.tsx and admin/types/index.ts
 */

// ============================================
// Admin User Types
// ============================================

export type AdminRole = 'superadmin' | 'editor';

export interface AdminUser {
  email: string;
  role: AdminRole;
  name: string;
  uid: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  twoFactorBackupCodes?: string[];
  lastActivity?: Date;
  failedLoginAttempts?: number;
}

// ============================================
// Admin Permissions
// ============================================

export type AdminPermission = 'read' | 'write' | 'delete' | 'manage_users';

// ============================================
// Feature Flags
// ============================================

export interface AdminFeatureFlags {
  USE_NEW_ADMIN: boolean;
  ENABLE_2FA: boolean;
}

export const DEFAULT_ADMIN_FLAGS: AdminFeatureFlags = {
  USE_NEW_ADMIN: true,
  ENABLE_2FA: true,
};
