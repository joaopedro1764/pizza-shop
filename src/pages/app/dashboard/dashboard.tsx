import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCanceledOrdersAmountCard } from "./month-cancel-orders-amount";
import { MonthOrdersAmountCard } from "./month-orders-amount-card";
import { MonthRevenueCard } from "./month-revenue-card";
import { PopularProductsCharts } from "./popular-products-charts";
import { RevenueCharts } from "./revenue-charts";

export function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
      </div>
      <div className="grid grid-cols-9 gap-4">
        <RevenueCharts />
        <PopularProductsCharts />
      </div>
    </>
  );
}
