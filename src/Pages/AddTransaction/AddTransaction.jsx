import React, { useContext } from 'react';
import { Button } from "@/components/ui/button"
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';



const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleAddToTransaction = async (e) => {
    e.preventDefault()
    const form = e.target;
    console.log(form);
    const transactionType = form.transactionType.value;
    const category = form.category.value;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const date = form.date.value;
    const email = form.email.value;
    const name = form.name.value;
    const newTransaction = {
      type: transactionType,
      category: category,
      amount: amount,
      description: description,
      date: date,
      email: email,
      name: name
    }
    try {
      await axios.post("http://localhost:3000/add-Transaction", newTransaction);
      toast.success('Successfully Added A Transaction')
      navigate('/myTransaction')
    } catch (err) {
      console.log(err)
      toast.error("Failed To Add Transaction")
    }
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-2xl p-4 md:p-8">
        <div className=" p-8 rounded-xl shadow-2xl">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-8">
            Add a New Transaction
          </h2>
          <form onSubmit={handleAddToTransaction} className="space-y-6">
            <fieldset>
              <legend className="block mb-2 text-sm font-medium ">
                Transaction Type
              </legend>
              <div className="flex items-center gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="transactionType"
                    value="income"
                    className="w-5 h-5 text-green-500  focus:ring-green-500" />
                  <span className="text-green-400 font-medium">Income</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="transactionType"
                    value="expense"
                    className="w-5 h-5 text-red-500 focus:ring-red-500" />
                  <span className="text-red-400 font-medium">Expense</span>
                </label>
              </div>
            </fieldset>
            <div>
              <label className="block mb-2 text-sm font-medium ">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full bg-neutral-700 p-3 rounded-md border  ">
                <option value="" disabled>Select a category</option>
                <option value="salary">Salary</option>
                <option value="groceries">Groceries</option>
                <option value="utilities">Utilities</option>
                <option value="rent">Rent</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium ">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="0.00"
                step="0.01"
                required
                className="w-full p-3  rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="e.g., Weekly groceries at store"
                className="w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              </textarea>
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium ">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="w-full p-3   rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="userName" className="block mb-2 text-sm font-medium">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="name"
                  value={user.displayName}
                  readOnly
                  className="w-full p-3   rounded-md border border-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label htmlFor="userEmail" className="block mb-2 text-sm font-medium ">
                  User Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  value={user.email}
                  readOnly
                  className="w-full p-3   rounded-md border border-gray-500 cursor-not-allowed" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full p-5 px-6 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              Add Transaction
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;