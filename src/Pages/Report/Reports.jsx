import React, { useState, useMemo, useEffect, useContext } from "react";
import { Spinner } from "@/components/ui/spinner"
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
  const { user, setLoading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:3000/my-transactions?email=${user.email}`);
        const data = await res.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Error Fethcing Data')
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user.email, setTransactions, setLoading]);

  const totalIncome = transactions
    .filter((inc) => inc.type === "income")
    .reduce((sum, inc) => sum + inc.amount, 0);

  const totalExpense = transactions
    .filter((exp) => exp.type === "expense")
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((data) => {
      const date = new Date(data.date);
      const byMonth =
        monthFilter === "All" || date.getMonth() + 1 === Number(monthFilter);
      const byCategory =
        categoryFilter === "All" || data.category === categoryFilter;
      return byMonth && byCategory;
    });
  }, [transactions, monthFilter, categoryFilter]);

  const pieData = Object.entries(
    filteredTransactions.reduce((pieData, data) => {
      pieData[data.category] = (pieData[data.category] || 0) + data.amount;
      return pieData;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(0, i).toLocaleString("default", { month: "short" });
    const income = transactions
      .filter(
        (inc) =>
          inc.type.toLowerCase() === "income" &&
          new Date(inc.date).getMonth() === i)
      .reduce((sum, inc) => sum + inc.amount, 0);
    const expense = transactions
      .filter(
        (exp) =>
          exp.type.toLowerCase() === "expense" &&
          new Date(exp.date).getMonth() === i)
      .reduce((sum, exp) => sum + exp.amount, 0);
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
          className=" bg-neutral-500 border border-gray-700  px-4 py-2 rounded-lg">
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
          className="bg-neutral-500 border border-gray-700  px-4 py-2 rounded-lg">
          <option value="All">All Categories</option>
          {[...new Set(transactions.map((t) => t.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="bg-neutral-500 border border-gray-700 flex justify-center items-center px-10 rounded-lg">
          Total $ : {totalBalance}
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className=" p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Expense Breakdown by Category
          </h2>
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
        </div>
        <div className=" p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Monthly Income vs Expense
          </h2>
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
        </div>
      </div>
    </div>
  );
}
export default Reports;