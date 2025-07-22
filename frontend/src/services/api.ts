
const API_BASE_URL = 'http://0.0.0.0:8000/api/auth';

export interface User {
  id: number;
  email: string;
  name: string;
  is_investor: boolean;
  is_individual: boolean;
  investorprofile?: {
    contact_info: string;
    address_info: string;
    is_local: boolean;
    avatar: string | null;
    interests: number[];
  };
  businessprofile?: {
    business_name: string;
    contact_info: string;
    address_info: string;
    is_local: boolean;
    avatar: string | null;
    category: number;
  };
}

export interface LoginResponse {
  message: string;
  refresh: string;
  access: string;
  user: User;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  is_investor: boolean;
  is_individual: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OTPVerificationData {
  email: string;
  otp: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  new_password: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

export interface Sector {
  id: number;
  name: string;
  description: string;
}

class ApiService {
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Authentication endpoints
  async register(data: RegisterData): Promise<{ message: string; email: string }> {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/logout/`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ refresh: refreshToken }),
    });
    return this.handleResponse(response);
  }

  // OTP verification endpoints
  async verifyOTP(data: OTPVerificationData): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/verify-otp/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async resendOTP(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/resend-otp/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });
    return this.handleResponse(response);
  }

  // Password management endpoints
  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/forgot-password/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/reset-password/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/change-password/`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Profile endpoints
  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });
    return this.handleResponse(response);
  }

  async updateProfile(profileData: any): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  // Sectors endpoint
  async getSectors(): Promise<Sector[]> {
    const response = await fetch(`${API_BASE_URL}/sectors/`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Token management
  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refresh: refreshToken }),
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
