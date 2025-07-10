export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'SYSTEM_ADMIN' | 'NORMAL_USER' | 'STORE_OWNER';
  storeId?: string;
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  rating: number;
  totalRatings: number;
  ownerId: string;
  createdAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  userName: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface CreateUserFormData {
  name: string;
  email: string;
  address: string;
  password: string;
  role: 'SYSTEM_ADMIN' | 'NORMAL_USER' | 'STORE_OWNER';
}

export interface CreateStoreFormData {
  name: string;
  email: string;
  address: string;
  password: string;
}

export interface UserRating {
  storeId: string;
  rating: number;
}