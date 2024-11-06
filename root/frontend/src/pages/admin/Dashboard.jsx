import { useEffect, useState } from "react";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import DashboardSection from "../../features/admin/dashboard/DashboardSection.jsx";
import DashboardSectionHeader from "../../features/admin/dashboard/DashboardSectionHeader.jsx";
import Field from "../../ui/Field.jsx";
import {
  getDaysInMonth,
  monthNumberToString,
  months,
} from "../../utils/helpers.js";
import {
  getDailySales,
  getMonthlyNewUsers,
  getMonthlySales,
  getTopSoldProducts,
} from "../../services/statisticsAPI.js";
import { serverUrl } from "../../../configs.js";

function Dashboard() {
  const [generalStatistics, setGeneralStatistics] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  useEffect(() => {
    getMonthlySales().then((data) => {
      setGeneralStatistics(data);
    });

    getMonthlyNewUsers().then((data) => {
      setMonthlyUsers(data);
    });
  }, []);

  const totalSalesPercentage = (
    (generalStatistics[0]?.sales * 100) /
    generalStatistics[1]?.sales
  ).toFixed(2);

  const totalIncomePercentage = (
    (generalStatistics[0]?.total * 100) /
    generalStatistics[1]?.total
  ).toFixed(2);

  const totalNewUsersPercentage = (
    (monthlyUsers[0]?.total * 100) /
    monthlyUsers[1]?.total
  ).toFixed(2);

  return (
    <div>
      <div className={"grid grid-cols-3 gap-8"}>
        {generalStatistics[0] && (
          <>
            <StatisticField
              title={"Total Sales"}
              value={generalStatistics[0]?.sales}
              percentageOfGrowth={totalSalesPercentage}
            />
            <StatisticField
              title={"Total Income"}
              value={"$" + generalStatistics[0]?.total}
              percentageOfGrowth={totalIncomePercentage}
            />
          </>
        )}

        {monthlyUsers.length > 0 && (
          <StatisticField
            title={"Monthly New Users"}
            value={monthlyUsers[0]?.total}
            percentageOfGrowth={totalNewUsersPercentage}
          />
        )}
      </div>
      <div className={"flex gap-6 mt-9"}>
        <SalesStatistics />
        <TopSoldProducts />
      </div>
    </div>
  );
}

export default Dashboard;

function TopSoldProducts() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getTopSoldProducts().then((data) => setTopProducts(data));
  }, []);

  return (
    <DashboardSection className={"w-full"}>
      <DashboardSectionHeader>
        <h3>Top Sold Products</h3>
      </DashboardSectionHeader>
      <div className={"space-y-6"}>
        {topProducts.length !== 0 &&
          topProducts.map((topProduct) => (
            <div className={"flex gap-6"} key={topProduct._id}>
              <div className={"w-20 h-20 border border-zinc-200 "}>
                <img
                  src={`${serverUrl}/imgs/products/${topProduct.coverImage}`}
                  className={"w-full"}
                  alt=""
                />
              </div>
              <div className={"flex gap-4 py-2"}>
                <div>
                  <p>{topProduct.name}</p>
                  <p>{topProduct.quantity}</p>
                </div>
                <div>
                  <p>${topProduct.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </DashboardSection>
  );
}

function SalesStatistics() {
  const [salesStatistics, setSalesStatistics] = useState([]);
  const [a, setA] = useState("monthly");

  useEffect(() => {
    if (a === "daily") {
      getDailySales().then((dailySales) => {
        const [currYear, currMonth] = [
          new Date().getFullYear(),
          new Date().getMonth() + 1,
        ];

        const dailyIncome = Array.from(
          { length: getDaysInMonth(currYear, currMonth) },
          (_, i) => i + 1,
        ).map((day, index) => ({
          name: day,
          pv:
            dailySales.filter((dayS) => dayS._id.day === index + 1)[0]?.total ||
            0,
        }));

        setSalesStatistics(dailyIncome);
      });
    } else {
      getMonthlySales().then((monthlySales) => {
        const monthlyIncome = months.map((month, index) => ({
          name: month,
          pv:
            monthlySales.filter((monthS) => monthS._id.month === index + 1)[0]
              ?.total || 0,
        }));
        setSalesStatistics(monthlyIncome);
      });
    }
  }, [a]);

  return (
    <DashboardSection header={"Sale Statistics"} className={"w-fit"}>
      <DashboardSectionHeader>
        <h3>Sale Statistics</h3>
        <ul className="flex gap-6">
          <button onClick={() => setA("daily")}>daily</button>
          <button onClick={() => setA("monthly")}>monthly</button>
        </ul>
      </DashboardSectionHeader>
      <LineChart width={500} height={300} data={salesStatistics}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </DashboardSection>
  );
}

function StatisticField({ title, value, percentageOfGrowth }) {
  return (
    <Field legend={title} className={"pb-2"} childrenClassName={"gap-3"}>
      <div
        className={
          "flex justify-center flex-wrap gap-4  items-baseline mt-[-6px]  mb-6"
        }
      >
        <strong className={"text-5xl text-gray-700"}>{value}</strong>
        <p
          className={`text-right ${percentageOfGrowth > 0 ? "text-green-700" : "text-red-700"} text-[1.5rem] -translate-y-1/4 flex gap-2`}
        >
          <span>
            {percentageOfGrowth > 0 ? (
              <HiArrowTrendingUp />
            ) : (
              <HiArrowTrendingDown />
            )}
          </span>
          <span>{percentageOfGrowth} %</span>
        </p>
      </div>
      <p className={"text-center text-zinc-500"}>
        Compared to {monthNumberToString(new Date().getMonth())}{" "}
        {new Date().getFullYear()}
      </p>
    </Field>
  );
}
