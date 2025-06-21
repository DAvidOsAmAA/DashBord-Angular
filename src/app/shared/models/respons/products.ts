import {
  IProduct,
  IProductByCategory,
} from '../../interfaces/Overview/Iproduct';
export interface Products {
  message: string;
  statistics: {
    lowStockProducts: [];
    productsByCategory: IProductByCategory[];
    topSellingProducts: IProduct[];
  };
}
