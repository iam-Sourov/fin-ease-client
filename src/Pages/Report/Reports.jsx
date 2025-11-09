import React, { useState, useMemo } from "react";
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

const Reports = () => {

  const transactions = [
    { id: 1, type: "Income", category: "Freelancing", amount: 1200, date: "2025-01-15" },
    { id: 2, type: "Expense", category: "Groceries", amount: 300, date: "2025-01-20" },
    { id: 3, type: "Expense", category: "Transport", amount: 120, date: "2025-02-03" },
    { id: 4, type: "Income", category: "Salary", amount: 2000, date: "2025-02-10" },
    { id: 5, type: "Expense", category: "Entertainment", amount: 200, date: "2025-02-18" },
    { id: 6, type: "Income", category: "Investments", amount: 800, date: "2025-03-05" },
  ];

  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;


  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesMonth =
        monthFilter === "All" ||
        new Date(t.date).getMonth() + 1 === parseInt(monthFilter);
      const matchesCategory =
        categoryFilter === "All" || t.category === categoryFilter;
      return matchesMonth && matchesCategory;
    });
  }, [transactions, monthFilter, categoryFilter]);

  const categoryTotals = filteredTransactions.reduce((acc, t) => {
    const key = t.category;
    acc[key] = (acc[key] || 0) + t.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    income: transactions
      .filter((t) => t.type === "Income" && new Date(t.date).getMonth() === i)
      .reduce((sum, t) => sum + t.amount, 0),
    expense: transactions
      .filter((t) => t.type === "Expense" && new Date(t.date).getMonth() === i)
      .reduce((sum, t) => sum + t.amount, 0),
  }));

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
          className=" border border-gray-700  px-4 py-2 rounded-lg">
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
          className=" border border-gray-700  px-4 py-2 rounded-lg">
          <option value="All">All Categories</option>
          {[...new Set(transactions.map((t) => t.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pie Chart */}
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