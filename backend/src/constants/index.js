export const USER_STATUS = {
    PENDING_VERIFICATION: "pending_verification",
    ACTIVE: "active",
    SUSPENDED: "suspended",
    BANNED: "banned",
    DELETED: "deleted",
};

export const ROLES = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin",
    SUPER_ADMIN: "super_admin",
};

export const RATE_LIMITS = {
    LOGIN: { windowMs: 15 * 60 * 1000, max: 5 },
    REGISTER: { windowMs: 60 * 60 * 1000, max: 3 },
    FORGOT_PASSWORD: { windowMs: 60 * 60 * 1000, max: 3 },
    RESEND_VERIFICATION: { windowMs: 60 * 1000, max: 1 },
    CHANGE_EMAIL: { windowMs: 60 * 60 * 1000, max: 3 },
};

export const TOKEN_EXPIRY = {
    EMAIL_VERIFICATION: 24 * 60 * 60 * 1000,
    PASSWORD_RESET: 15 * 60 * 1000,
};

export const EMAIL_CHANGE_VERIFY_WINDOW = 15 * 60 * 1000;

export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000;
