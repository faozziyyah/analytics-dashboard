import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../stores/authStore";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cards, timeseries, summaryCards, lineData, pieData, barData } from '../data/dashboard';

const COLORS = ["#1659E6", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {

  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return (
    <div className="space-y-6">
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div key={i}
            className="bg-white shadow-sm rounded-xl p-4 border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-2xl font-bold mt-1 text-gray-900">
              {card.value}
            </p>
            <p
              className={`text-xs mt-1 ${
                card.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {card.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold text-gray-700 mb-3">
            Change Request by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Tickets"
                stroke="#1659E6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Closed"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold text-gray-700 mb-3">
            Change Result by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="font-semibold text-gray-700 mb-3">
          Pending Tickets - Team
        </h2>
        <table className="w-full border-t text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-2 px-3 text-gray-600">Title</th>
              <th className="text-left py-2 px-3 text-gray-600">Created By</th>
              <th className="text-left py-2 px-3 text-gray-600">Created On</th>
              <th className="text-left py-2 px-3 text-gray-600">Due Date</th>
              <th className="text-left py-2 px-3 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="py-2 px-3">Request for Application Upgrade</td>
              <td className="py-2 px-3">Cynthia Njiva</td>
              <td className="py-2 px-3">24/04/2025</td>
              <td className="py-2 px-3">24/04/2025</td>
              <td className="py-2 px-3">
                <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="font-semibold text-gray-700 mb-3">
          Ticket Resolution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Open" fill="#1659E6" />
            <Bar dataKey="Closed" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}
