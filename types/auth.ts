export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  mobileNumber: string;
  age: number;
  profileComplete: boolean;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}
