// MOCK AUTH SERVICE — offline testing version

interface LoginCredentials {
  email: string;
  password: string;
}

type Role = "tenant" | "landlord" | "admin";

interface LoginUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
  role: Role;
  business_name?: string;
  company_name?: string;
  phone?: string;
  address?: string;
  is_verified?: boolean;
}

interface LoginSuccessResponse {
  token: string;
  user: LoginUser;
}

interface RegisterSuccessResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}

/**
 * User login
 *
 * Supports both:
 *
 * loginUser({ email, password }, role)
 *
 * and:
 *
 * loginUser(email, password, role)
 */
export const loginUser = async (
  credentialsOrEmail: LoginCredentials | string,
  passwordOrRole: string,
  possibleRole?: "tenant" | "landlord" | "admin"
): Promise<LoginSuccessResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const email =
    typeof credentialsOrEmail === "string"
      ? credentialsOrEmail
      : credentialsOrEmail.email;

  const role =
    possibleRole ||
    (passwordOrRole as "tenant" | "landlord" | "admin");

  return {
    token: "mock-token-123",
    user: {
      id: 1,
      username: email.split("@")[0],
      full_name: email.split("@")[0],
      email,
      role,
      phone: "",
      address: "",
      is_verified: true,
    },
  };
};

/**
 * Admin login
 */
export const loginAdmin = async (
  email: string,
  password: string
): Promise<LoginSuccessResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    token: "mock-admin-token-123",
    user: {
      id: 999,
      username: "admin",
      full_name: "Administrator",
      email,
      role: "admin",
      phone: "",
      address: "",
      is_verified: true,
    },
  };
};

/**
 * User registration
 */
export const registerUser = async (
  formData: {
    username: string;
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    company_name?: string;
  },
  role: "tenant" | "landlord"
): Promise<RegisterSuccessResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    message: "Registered successfully (mock)",
  };
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (
  email: string,
  role: Role
): Promise<ResetPasswordResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    message: `Password reset email sent to ${email} (${role})`,
  };
};

/**
 * Reset password
 */
export const resetPassword = async (): Promise<ResetPasswordResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    message: "Password reset successful (mock)",
  };
};