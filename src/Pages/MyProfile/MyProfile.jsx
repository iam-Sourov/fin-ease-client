import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useNavigate } from "react-router";
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
import toast from "react-hot-toast";
import { auth } from "../../Firebase/firebase.config";

const MyProfile = () => {
  const { user, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (user) {
      setUserData(user)
    }
    else {
      navigate('/')
    }
  }, [user, navigate])


  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    console.log(name, email);
    updateUser({ displayName: name, photoURL: image, email: email })
      .then(() => {
        setUser({ ...auth.currentUser })
        toast.success("Profile Updated");
        navigate('/myProfile');
      }).catch((error) => {
        toast.error(error)
      })

  }

  return (
    <div className="flex flex-col items-center justify-center py-10 ">
      <div className=" p-8 border-2 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">{userData?.displayName}</h1>
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={userData?.photoURL || "https://i.postimg.cc/7h8Zq4Rk/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{user?.name}</h2>
        <p className="text-gray-400 mb-6">{user?.email}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Update Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <form onSubmit={handleUpdateProfile}>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={user?.displayName} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Image</Label>
                  <Input id="image" name="image" defaultValue={user?.photoURL} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={user?.email} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}
export default MyProfile;
