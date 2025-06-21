import { IRevenue } from '../../interfaces/Overview/IRevenue';

export interface Orders {
  message: string;
  statistics: {
    dailyRevenue: IRevenue[];
    monthlyRevenue: IRevenue[];
    ordersByStatus: IRevenue[];
  };
}
