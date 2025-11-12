import React, { useContext, useState } from 'react';
import { Button } from "@/components/ui/button"
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import toast from 'react-hot-toast';

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useNavigate } from 'react-router';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"






const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [shadCategory, setCategory] = useState('');
  const [shadDate, setDate] = useState()
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleAddToTransaction = async (e) => {
    e.preventDefault()
    const form = e.target;
    const transactionType = form.transactionType.value;
    const category = shadCategory;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const date = shadDate;
    const email = form.email.value;
    const name = form.name.value;

    const newTransaction = {
      type: transactionType,
      category: category,
      amount: amount,
      description: description,
      date: format(date, "yyyy-MM-dd"),
      email: email,
      name: name
    }
    try {
      setLoading(true)
      await axios.post(`https://fine-ease-server.vercel.app/add-Transaction`, newTransaction);
      toast.success('Successfully Added A Transaction')
      navigate('/myTransaction')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error("Failed To Add Transaction")
    } finally {
      setLoading(false)
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
                  <Input
                    type="radio"
                    name="transactionType"
                    value="income"
                    checked={selectedType === "income"}
                    onChange={() => setSelectedType("income")}
                    className="w-5 h-5 text-green-500  focus:ring-green-500" />
                  <span className="text-green-400 font-medium">Income</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="transactionType"
                    value="expense"
                    checked={selectedType === "expense"}
                    onChange={() => setSelectedType("expense")}
                    className="w-5 h-5 text-red-500 focus:ring-red-500" />
                  <span className="text-red-400 font-medium">Expense</span>
                </label>
              </div>
            </fieldset>
            <div>
              <label className="block mb-2 text-sm font-medium ">
                Category
              </label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  {selectedType === "income" ? <SelectGroup>
                    <SelectLabel>Income</SelectLabel>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                  </SelectGroup> : <SelectGroup>
                    <SelectLabel>Expenses</SelectLabel>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium ">
                Amount
              </label>
              <Input
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
                required
                placeholder="e.g., Weekly groceries at store"
                className="w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              </textarea>
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium ">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!shadDate}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal">
                    <CalendarIcon />
                    {shadDate ? format(shadDate, "yyyy-MM-dd") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={shadDate} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="userName" className="block mb-2 text-sm font-medium">
                  User Name
                </label>
                <Input
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
                <Input
                  type="email"
                  id="userEmail"
                  name="email"
                  value={user.email}
                  readOnly
                  className="w-full p-3   rounded-md border border-gray-500 cursor-not-allowed" />
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full p-5 px-6 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              {
                loading ? <Spinner /> : "Add Transaction"
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;