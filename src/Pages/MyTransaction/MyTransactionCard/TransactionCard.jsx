import React, { useContext, useEffect, useState } from 'react';
import { Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import axios from 'axios';
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
import { AuthContext } from '../../../Contexts/AuthContext';



const TransactionCard = () => {
  const { user, setLoading } = useContext(AuthContext);
  const email = user.email;
  const [transactions, setTransactions] = useState([]);

  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/my-transactions?email=${email}`);
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [email]);


  return (
    <div className="p-2">
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
                <th className="p-3 border-b whitespace-nowrap">Amount $</th>
                <th className="p-3 border-b whitespace-nowrap">Date</th>
                <th className="p-3 border-b text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions?.map((data) => (
                <tr
                  key={data._id}
                  className=" transition-colors duration-200 border-b"
                >
                  <td className="p-3 whitespace-nowrap">{data.type}</td>
                  <td className="p-3 whitespace-nowrap">{data.category}</td>
                  <td
                    className={`p-3 whitespace-nowrap font-medium ${data.type === "Expense" ? "text-red-600" : "text-green-600"
                      }`}
                  >
                    ${data.amount}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(data.date).toLocaleDateString()}
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
                                defaultValue={data.type}
                                placeholder="Income or Expense"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                name="description"
                                defaultValue={data.description}
                                placeholder="Transaction details"
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                name="category"
                                defaultValue={data.category}
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
                                defaultValue={data.amount}
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
                                defaultValue={data.date}
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
                            <span>{data.type || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Description:</span>
                            <span>{data.description || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Category:</span>
                            <span>{data.category || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Amount:</span>
                            <span>${data.amount || "0.00"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Date:</span>
                            <span>
                              {data.date ? new Date(data.date).toLocaleDateString() : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-3 mt-2">
                            <span className="font-semibold">Total in Category:</span>
                            <span className="font-bold text-blue-700">
                              ${data.totalCategoryAmount || "0.00"}
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