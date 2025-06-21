export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  rateAvg: number;
  rateCount: number;
  sold?: number;
  isSuperAdmin: boolean;
}

export interface ProductsResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  products: Product[];
} 

export interface AddProduct {
  title: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  category: string;
  occasion: string;
  imgCover: File;
  images: File[];
}

export interface UpdateProduct {
  price: number;
  rateAvg: number;
  rateCount: number;
}
  

