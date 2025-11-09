import React, { useContext } from "react";
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import FormInput from "../../Components/FormInput";

const Register = () => {
    const { signUp, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signUp(email, password)
            .then((res) => {
                setUser(res.user);
                navigate("/");
            })
            .catch((err) => alert(err.message));
    };
    return (
        <div className="flex items-center justify-center min-h-screen  transition-colors duration-300 p-4">
            <div className="card bg-base-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <FormInput label="Name" name="name" type="text" placeholder="Name" />
                    <FormInput label="Email" name="email" type="text" placeholder="Email" />
                    <FormInput label="PhotouRL" name="photoUrl" type="text" placeholder="photourL" />
                    <FormInput label="Password" name="password" type="password" placeholder="••••••••" />
                    <Button className="btn btn-primary w-full">Register</Button>
                    <Button
                        // onClick={handleGoogleLogin}
                        className="btn btn-ghost w-full mt-4"
                    ><svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Sign Up with Google
                    </Button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Already Signed Up?{" "}
                    <Link className="text-primary" to="/login">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
