import {
  Area,
  AreaChart,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardSection from "../../features/admin/dashboard/DashboardSection.jsx";
import DashboardSectionHeader from "../../features/admin/dashboard/DashboardSectionHeader.jsx";
import Field from "../../ui/Field.jsx";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../configs.js";
import axios from "axios";

function Dashboard() {
  const bestSellers = {
    // headerRow: ["Image", "Product Name", "Price", "Sold"],
    bodyRows: [
      ["../imgs/products/product-1.png", "Nmd_r1 shoes", 537.0, 144531],
      ["../imgs/products/product-1.png", "Nmd_r1 shoes", 537.0, 144531],
      ["../imgs/products/product-1.png", "Nmd_r1 shoes", 537.0, 144531],
    ],
  };

  const [generalStatistiques, setGeneralStatistiques] = useState({});
  const [percentageOfGrowth, setPercentageOfGrowth] = useState(0);
  useEffect(() => {
    axios
      .get(`${serverUrl}/api/v1/everdrop/orders/salesPerMonth`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGeneralStatistiques(res.data.data);
      });
  }, []);
  console.log(generalStatistiques);
  return (
    <div>
      <div className={"grid grid-cols-3 gap-8"}>
        {generalStatistiques[0] && (
          <StatistiqueField
            title={"Total Sales"}
            totalSales={generalStatistiques[0]?.sales}
            percentageOfGrowth={
              (generalStatistiques[0]?.sales * 100) /
              generalStatistiques[1]?.sales
            }
          />
        )}
        <StatistiqueField title={"Total income"} totalSales={generalStatistiques[0]?.total}  percentageOfGrowth={
            (generalStatistiques[0]?.total * 100) /
            generalStatistiques[1]?.total
        } />
        {/*<StatistiqueField />*/}
      </div>
      <div className={"flex gap-6 mt-9"}>
        {/*<ActiveUsersField />*/}
        {/*<SalesStatistics />*/}
      </div>
    </div>
  );
}

export default Dashboard;

function SalesStatistics() {
  const areaData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    {
      name: "Aug",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    { name: "Sep", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Oct", uv: 2000, pv: 9800, amt: 2290 },
    {
      name: "Nov",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    { name: "Dec", uv: 1890, pv: 4800, amt: 2181 },
  ];

  return (
    <DashboardSection header={"Sale Statistics"}>
      <DashboardSectionHeader>
        <h3>Sale Statistics</h3>
        <ul className="flex gap-6">
          <li>
            <a href="">daily</a>
          </li>
          <li>
            <a href="">weekly</a>
          </li>
          <li>
            <a href="">monthly</a>
          </li>
        </ul>
      </DashboardSectionHeader>
      <AreaChart width={600} height={400} data={areaData}>
        <Area type="monotone" dataKey={"pv"} stroke="#06b6d4" fill="#06b6d4" />
        <YAxis />
        <XAxis dataKey={"name"} />
        <Tooltip />
      </AreaChart>
    </DashboardSection>
  );
}

function CategoriesMarketShare() {
  const pieData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    {
      name: "Category C",
      value: 200,
    },
    { name: "Category D", value: 500 },
  ];
  return (
    <div className="pie-chart">
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey={"value"}
          nameKey={"name"}
          innerRadius={"100"}
          cx={"50%"}
          cy={"50%"}
          label
        />
        <Legend />
      </PieChart>
    </div>
  );
}

function ActivePage() {
  return (
    <tr>
      <td className={"py-3 "}>/products/brandix-z4</td>
      <td className={"text-right "}>15</td>
    </tr>
  );
}

function StatistiqueField({ title, totalSales, percentageOfGrowth }) {
  return (
    <Field legend={title} className={"pb-2"} childrenClassName={"gap-3"}>
      <div className={"flex justify-between items-baseline"}>
        <strong className={"text-6xl text-gray-700"}>${totalSales}</strong>
        <p
          className={
            "text-right text-green-700 text-[1.8rem] -translate-y-1/4 "
          }
        >
          ↗️{percentageOfGrowth}
        </p>
      </div>
      <p className={"text-center text-zinc-500"}>Compared to April 2021</p>
    </Field>
  );
}

function ActiveUsersField() {
  return (
    <Field legend={"Active users"} className={"grow"}>
      <div
        className={
          "w-[90%] h-32 flex justify-center items-center mx-auto text-6xl  bg-blue-300"
        }
      >
        148
      </div>
      <table>
        <thead>
          <tr>
            <th className={"text-left py-6"}>Active pages</th>
            <th className={"text-right "}>Users</th>
          </tr>
        </thead>
        <tbody>
          <ActivePage />
          <ActivePage />
          <ActivePage />
          <ActivePage />
          <ActivePage />
          <ActivePage />
        </tbody>
      </table>
    </Field>
  );
}
