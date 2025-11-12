import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Reports = () => {
  const { user,  setLoading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `https://fine-ease-server.vercel.app/my-transactions?email=${user?.email}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          toast.error("Invalid data format from server");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching data");
      } finally {
        setFetching(false);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchTransactions();
    }
  }, [user?.email, setLoading]);

  const toNumber = (val) => {
    const parsed = parseInt(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.date);
      const byMonth =
        monthFilter === "All" || date.getMonth() + 1 === Number(monthFilter);
      const byCategory =
        categoryFilter === "All" || t.category === categoryFilter;
      return byMonth && byCategory;
    });
  }, [transactions, monthFilter, categoryFilter]);

  const pieData = Object.entries(
    filteredTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + toNumber(t.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Monthly totals for bar chart
  const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(0, i).toLocaleString("default", {
      month: "short",
    });
    const income = transactions
      .filter(
        (t) =>
          t.type?.toLowerCase() === "income" &&
          new Date(t.date).getMonth() === i
      )
      .reduce((sum, t) => sum + toNumber(t.amount), 0);
    const expense = transactions
      .filter(
        (t) =>
          t.type?.toLowerCase() === "expense" &&
          new Date(t.date).getMonth() === i
      )
      .reduce((sum, t) => sum + toNumber(t.amount), 0);
    return { month: monthName, income, expense };
  });

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f97316", "#a855f7"];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl md:text-6xl text-center font-extrabold leading-tight shadow-text mt-12">
        Financial Reports
      </h1>
      <p className="text-xl text-center md:text-2xl mt-3 mb-4 font-light">
        Visual overview of your income and expenses
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="bg-neutral-500 border border-gray-700 px-4 py-2 rounded-lg">
          <option value="All">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-neutral-500 border border-gray-700 px-4 py-2 rounded-lg">
          <option value="All">All Categories</option>
          {[...new Set(transactions.map((t) => t.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="bg-neutral-500 border border-gray-700 flex justify-center items-center px-10 rounded-lg">
          Total $: {totalBalance}
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Expense Breakdown by Category
          </h2>
          {fetching ?
            <div className="text-center text-gray-400">Loading chart...</div>
            : pieData.length === 0 ?
              <p className="text-center text-gray-400">No data to display</p>
              :
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
          }
        </div>
        <div className="p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Monthly Income vs Expense
          </h2>
          {fetching ?
            <div className="text-center text-gray-400">Loading chart...</div>
            :
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="income" fill="#22c55e" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    </div>
  );
};

export default Reports;
