export interface IProduct {
  id?: string;
  imgCover: string;
  price: number;
  sold: number;
  title: string;
  quantity?: number;
}
export interface IProductByCategory {
  _id: string;
  count: number;
  category: string;
  products: IProduct[];
}
