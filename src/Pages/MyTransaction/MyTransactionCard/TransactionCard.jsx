import React, { useContext, useEffect, useState } from 'react';
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import sim from '../../../assets/sim.svg'
import { AuthContext } from '../../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ButtonGroup,

} from "@/components/ui/button-group"
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
  const { user, setLoading } = useContext(AuthContext);
  const [shadDate, setDate] = useState()
  const [transactions, setTransactions] = useState([]);


  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://fine-ease-server.vercel.app/transaction/delete/${id}`);
      const filteredData = transactions.filter(data => data._id !== id);
      setTransactions(filteredData);
      toast.success('Successfully Deleted')
    } catch (err) {
      console.log(err);
      toast.error('Unable To Delete')
    }
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`https://fine-ease-server.vercel.app/my-transactions?email=${user.email}`);
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Error Fetching Transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user.email, setTransactions, setLoading]);

  const totalBalanceByCategory = (category) => {
    return transactions
      .filter((cat) => cat.category === category)
      .reduce((sum, cat) => sum + cat.amount, 0);
  }
  return (
    <div className="p-2">
      <div className=" mx-auto">
        {/* <div className="w-full overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full text-sm border-collapse">
            <thead className="">
              <tr className="text-center ">
                <th className="p-3 border-b whitespace-nowrap">Type</th>
                <th className="p-3 border-b whitespace-nowrap">Category</th>
                <th className="p-3 border-b whitespace-nowrap">Amount ($)</th>
                <th className="p-3 border-b whitespace-nowrap">Date</th>
                <th className="p-3 border-b text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((data) => (
                <tr
                  key={data._id}
                  className=" transition-colors text-center duration-200 border-b">
                  <td className="p-3 whitespace-nowrap">{data.type}</td>
                  <td className="p-3 whitespace-nowrap">{data.category}</td>
                  <td
                    className={`p-3 whitespace-nowrap font-medium ${data.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                    ${data.amount}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(data.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 whitespace-nowrap text-center flex flex-wrap justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          <Pencil size={16} className="mr-1" /> Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px]">
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const type = form.type.value;
                            const description = form.description.value;
                            const category = form.category.value;
                            const amount = parseFloat(form.amount.value);
                            const date = form.date.value;
                            const updatedTransaction = {
                              type: type,
                              description: description,
                              category: category,
                              amount: amount,
                              date: date
                            };
                            try {
                              const res = await axios.put(
                                `${API_URL}/transactions/update/${data._id}`, updatedTransaction);
                              if (res.data.modifiedCount > 0) {
                                toast.success("Transaction updated successfully!");
                                const updatedList = transactions.map(item =>
                                  item._id === data._id ? { ...item, ...updatedTransaction } : item);
                                setTransactions(updatedList);
                              } else {
                                toast("No changes made.");
                              }
                            } catch (err) {
                              console.error(err);
                              toast.error("Error updating transaction.");
                            }
                          }}>
                          <DialogHeader>
                            <DialogTitle>Update Transaction</DialogTitle>
                            <DialogDescription>
                              Edit the transaction details below. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-2">
                            <div className="grid gap-2">
                              <Label htmlFor="type">Type</Label>
                              <Input id="type" name="type" defaultValue={data.type} required />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                name="description"
                                defaultValue={data.description}
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                name="category"
                                defaultValue={data.category}
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
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                name="date"
                                type="date"
                                defaultValue={data.date?.split("T")[0]}
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
                              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

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
                            <Button onClick={() => handleRemove(data._id)} className="bg-red-600 text-white hover:bg-red-700">
                              Confirm Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="inline-flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                          <Eye size={16} className="mr-1" /> Details
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
                            <span>{data.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Description:</span>
                            <span>{data.description}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Category:</span>
                            <span>{data.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Amount:</span>
                            <span>${data.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Date:</span>
                            <span>
                              {new Date(data.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-t ">
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
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {
            transactions.map(data => <div
              key={data._id}
              className={`w-full p-6 ${data.type === 'income'
                ? "bg-linear-to-br from-green-500/20 to-green-800/20"
                : "bg-linear-to-br from-red-500/20 to-red-800/20"
                } rounded-2xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]`}>
              <div className="flex justify-between items-start mb-4" >
                <div className="w-12 h-9  shadow-inner flex items-center justify-center">
                  <img src={sim} alt="" />
                </div>
                {data.type === 'income' ? <svg className="w-10 h-10 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg> : <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>}
              </div>
              <div className="text-3xl tracking-wide mb-3">
                ${data.amount}
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-semibold">Category:</span> {data.category}
                </div>
                <div className='flex justify-start gap-2 items-center'>
                  <span className="font-semibold">Type:</span>{" "}
                  <span
                    className={`${data.type === "income" ? "text-green-600 font-semibold bg-white border-2 border-dotted border-green-600 px-2 py-1 rounded-md" : "text-red-600 font-semibold bg-white border-2 border-dotted border-red-600 px-2 py-1 rounded-md"
                      } font-semibold `}>
                    {data.type}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Date:</span> {data.date}
                </div>
                <div>
                  <span className="font-semibold">Name:</span> {data.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {data.email}
                </div>
                <div>
                  <span className="font-semibold">Description:</span> {data.description}
                </div>
              </div>
              <div className='grid place-content-center mt-4'>
                <ButtonGroup>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        <Pencil size={16} className="mr-1" /> Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const form = e.target;
                          const type = form.transactionType.value;
                          const category = form.category.value;
                          const amount = parseFloat(form.amount.value);
                          const description = form.description.value;

                          const dateValue = shadDate
                            ? format(shadDate, "yyyy-MM-dd")
                            : data.date?.split("T")[0];
                          const updatedTransaction = {
                            type,
                            category,
                            amount,
                            description,
                            date: dateValue,
                          };
                          try {
                            const res = await axios.put(
                              `https://fine-ease-server.vercel.app/transactions/update/${data._id}`,
                              updatedTransaction
                            );
                            if (res.data.modifiedCount > 0) {
                              toast.success("Transaction updated successfully!");
                              const updatedList = transactions.map((item) =>
                                item._id === data._id ? { ...item, ...updatedTransaction } : item
                              );
                              setTransactions(updatedList);
                            } else {
                              toast("No changes made.");
                            }
                          } catch (err) {
                            console.error(err);
                            toast.error("Error updating transaction.");
                          }
                        }}
                        className="space-y-6">
                        <DialogHeader>
                          <DialogTitle>Update Transaction</DialogTitle>
                          <DialogDescription>
                            Modify your transaction details below.
                          </DialogDescription>
                        </DialogHeader>
                        <fieldset>
                          <legend className="block mb-2 text-sm font-medium">
                            Transaction Type
                          </legend>
                          <div className="flex items-center gap-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <Input
                                type="radio"
                                name="transactionType"
                                value="income"
                                defaultChecked={data.type === "income"}
                                className="w-5 h-5 text-green-500 focus:ring-green-500" />
                              <span className="text-green-500 font-medium">Income</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <Input
                                type="radio"
                                name="transactionType"
                                value="expense"
                                defaultChecked={data.type === "expense"}
                                className="w-5 h-5 text-red-500 focus:ring-red-500" />
                              <span className="text-red-500 font-medium">Expense</span>
                            </label>
                          </div>
                        </fieldset>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Category</label>
                          <Select defaultValue={data.category} name="category">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="groceries">Groceries</SelectItem>
                                <SelectItem value="utilities">Utilities</SelectItem>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
                            Amount
                          </label>
                          <Input
                            type="number"
                            id="amount"
                            name="amount"
                            defaultValue={data.amount}
                            step="0.01"
                            required
                            className="w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label htmlFor="description" className="block mb-2 text-sm font-medium">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            defaultValue={data.description}
                            placeholder="e.g., Grocery shopping"
                            className="w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label htmlFor="date" className="block mb-2 text-sm font-medium">
                            Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!shadDate}
                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {shadDate ? (
                                  format(shadDate, "yyyy-MM-dd")
                                ) : (
                                  <span>{data.date ? data.date.split("T")[0] : "Pick a date"}</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={shadDate}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Input type="hidden" name="date" value={shadDate ? format(shadDate, "yyyy-MM-dd") : data.date?.split("T")[0]} />
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
                              className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto">
                              Save Changes
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                          <Button onClick={() => handleRemove(data._id)} className="bg-red-600 text-white hover:bg-red-700">
                            Confirm Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="inline-flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                        <Eye size={16} className="mr-1" /> Details
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
                          <span>{data.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Description:</span>
                          <span>{data.description}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Category:</span>
                          <span>{data.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Amount:</span>
                          <span>${data.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>
                            {new Date(data.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-t ">
                          <span className='font-medium'>Total:</span>
                          <span>{totalBalanceByCategory(data.category)}</span>
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
                </ButtonGroup>
              </div>
            </div>)
          }
        </div>
      </div >
    </div >
  );
};

export default TransactionCard;


