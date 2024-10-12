import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyData = [
  { month: "Jan", payments: 300, posts: 400, users: 10 },
  { month: "Feb", payments: 600, posts: 300, users: 50 },
  { month: "Mar", payments: 200, posts: 500, users: 40 },
  { month: "Apr", payments: 500, posts: 700, users: 150 },
  { month: "May", payments: 400, posts: 600, users: 220 },
];

export function DashboardAnalytics() {
  return (
    <div className="mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monthly Analytics</h2>
      {/* Outer container with a controlled width and overflow hidden */}
      <div className=" overflow-hidden px-4">
        <ResponsiveContainer height={400} width="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              activeDot={{ r: 8 }}
              dataKey="payments"
              stroke="#8884d8"
              type="monotone"
            />
            <Line dataKey="posts" stroke="#82ca9d" type="monotone" />
            <Line dataKey="users" stroke="#ffc658" type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
