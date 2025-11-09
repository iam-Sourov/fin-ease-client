import React, { useState } from 'react';
import { Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

const TransactionCard = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Income",
      category: "Freelancing",
      amount: 250,
      date: "2025-11-09",
    },
    {
      id: 2,
      type: "Expense",
      category: "Groceries",
      amount: 80,
      date: "2025-11-08",
    },
  ]);
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 -mt-16">
          {/* Total Balance */}
          <div className="w-80 h-48 p-6 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
            <div className="flex justify-between items-start">
              <div className="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                <div className="w-9 h-6 m-1.5rounded-sm"></div>
              </div>
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
            <div className="text-2xl font-mono tracking-wide">$ 1,234.56</div>
            <div>
              <div className="text-xs uppercase font-light tracking-wider">
                Card Holder
              </div>
              <div className="text-lg font-medium">Total Balance</div>
            </div>
          </div>

          <div className="w-80 h-48 p-6 bg-linear-to-br from-green-500 to-green-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
            <div className="flex justify-between items-start">
              <div className="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                <div className="w-9 h-6 m-1.5 bg-gray-600 rounded-sm"></div>
              </div>
              <svg
                className="w-10 h-10 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                ></path>
              </svg>
            </div>
            <div className="text-2xl font-mono tracking-wide">$ 5,678.90</div>
            <div>
              <div className="text-xs uppercase font-light tracking-wider">
                Card Holder
              </div>
              <div className="text-lg font-medium">Total Income</div>
            </div>
          </div>


          <div className="w-80 h-48 p-6 bg-linear-to-br from-red-500 to-red-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
            <div className="flex justify-between items-start">
              <div className="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                <div className="w-9 h-6 m-1.5  rounded-sm"></div>
              </div>
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                ></path>
              </svg>
            </div>
            <div className="text-2xl font-mono tracking-wide">$ 2,468.13</div>
            <div>
              <div className="text-xs uppercase font-light tracking-wider">
                Card Holder
              </div>
              <div className="text-lg font-medium">Total Expenses</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          My Transactions
        </h1>

        <div className="w-full overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full text-sm border-collapse">
            <thead className="">
              <tr className="text-left ">
                <th className="p-3 border-b whitespace-nowrap">Type</th>
                <th className="p-3 border-b whitespace-nowrap">Category</th>
                <th className="p-3 border-b whitespace-nowrap">Amount ($)</th>
                <th className="p-3 border-b whitespace-nowrap">Date</th>
                <th className="p-3 border-b text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions?.map((t) => (
                <tr
                  key={t.id}
                  className=" transition-colors duration-200 border-b"
                >
                  <td className="p-3 whitespace-nowrap">{t.type}</td>
                  <td className="p-3 whitespace-nowrap">{t.category}</td>
                  <td
                    className={`p-3 whitespace-nowrap font-medium ${t.type === "Expense" ? "text-red-600" : "text-green-600"
                      }`}
                  >
                    ${t.amount}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  <td className="p-3 whitespace-nowrap text-center flex flex-wrap justify-center gap-2">
                    {/* --- Update Dialog --- */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          <Pencil size={16} className="mr-1" /> Update
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[450px]">
                        <form>
                          <DialogHeader>
                            <DialogTitle>Update Transaction</DialogTitle>
                            <DialogDescription>
                              Edit the transaction details below. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-2">
                            <div className="grid gap-2">
                              <Label htmlFor="type">Type</Label>
                              <Input
                                id="type"
                                name="type"
                                defaultValue={t.type}
                                placeholder="Income or Expense"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                name="description"
                                defaultValue={t.description}
                                placeholder="Transaction details"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                name="category"
                                defaultValue={t.category}
                                placeholder="e.g., Food, Rent, Salary"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                id="amount"
                                name="amount"
                                type="number"
                                defaultValue={t.amount}
                                placeholder="Enter amount"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                name="date"
                                type="date"
                                defaultValue={t.date}
                                required
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" type="button">
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="submit"
                                className="bg-blue-600 text-white hover:bg-blue-700"
                              >
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* --- Delete Dialog --- */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="inline-flex items-center px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[400px] text-center">
                        <DialogHeader>
                          <DialogTitle>Delete Transaction</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this transaction? This
                            action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex justify-center gap-2 mt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="bg-red-600 text-white hover:bg-red-700">
                              Confirm Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* --- View Details Dialog --- */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="inline-flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                          <Eye size={16} className="mr-1" /> View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold">
                            Transaction Details
                          </DialogTitle>
                          <DialogDescription>
                            Full information about this transaction.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 grid gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">Type:</span>
                            <span>{t.type || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Description:</span>
                            <span>{t.description || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Category:</span>
                            <span>{t.category || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Amount:</span>
                            <span>${t.amount || "0.00"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Date:</span>
                            <span>
                              {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-3 mt-2">
                            <span className="font-semibold">Total in Category:</span>
                            <span className="font-bold text-blue-700">
                              ${t.totalCategoryAmount || "0.00"}
                            </span>
                          </div>
                        </div>

                        <DialogFooter className="mt-6">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TransactionCard;