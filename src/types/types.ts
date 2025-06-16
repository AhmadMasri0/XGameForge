import "@mui/material/styles";

export interface Product {
  _id: string;
  name: string;
  title?: string;
  price: number;
  images: { url: string; alt?: string }[];
  category: string;
  platform: string;
  amount: number;
  rating: number;
  brand: string;
  description: string;
  discount: number,
  isFeatured: boolean
}

export interface User {
  _id?: string;
  email?: string;
  username?: string;
  token?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  phone?: string
};


export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface OrderDetail {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  notes?: string;
}

export interface Order {
  _id: string;
  user: User;
  status: 'paid' | 'unpaid' | 'cancelled';
  isDelivered: boolean;
  orderDetail: OrderDetail;
  address: string;
  items: OrderItem[];
  createdAt: string;
  totalAmount: number;
}

export interface NavItem {
  name: string;
  path: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Booking {
  _id?: string;
  sessionType: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: 'upcoming' | 'inprogress' | 'completed' | 'cancelled';
  user?: {
    username?: string;
    email?: string;
  };

}
export interface BarItem {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export interface RegistrationData {
  username?: string;
  email: string;
  password: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

export interface TouchedFields {
  username?: boolean;
  email?: boolean;
  password?: boolean;
}

declare module "@mui/material/styles" {
  interface Theme {
    customColors: {
      activelink: string;
      inactivelink: string;
      primary: string;
      activeTab: string;
      inactiveTab: string;
    };
  }

  interface ThemeOptions {
    customColors?: {
      activelink?: string;
      inactivelink?: string;
      primary?: string;
      activeTab?: string;
      inactiveTab?: string;
    };
  }
}
