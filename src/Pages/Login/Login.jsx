import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router";
import FormInput from "../../Components/FormInput";
import toast from "react-hot-toast";

const Login = () => {
    const { GoogleLogin, LogIn, setUser, setLoading } = useContext(AuthContext);


    const navigate = useNavigate()
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const regEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!regEx.test(password)) {
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.')
            setLoading(false);
            return;
        }
        LogIn(email, password)
            .then((res) => {
                setUser(res.user);
                toast.success("logged in")
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(err => {
                console.log(err);
                toast.error('Failed To Login', err);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const handleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                setUser(res.user);
                toast.success("done")
                navigate(location.state || "/");
            })
            .catch((error) => toast.error(error));
    };

    return (
        <div className="flex items-center  justify-center min-h-screen bg-base-100 text-base-content transition-colors duration-300 p-4">
            <div className="card border bg-base-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <FormInput label="Email" name="email" type="email" placeholder="you@example.com" />
                    <FormInput label="Password" name="password" type="password" placeholder="••••••••" />
                    <button className="btn btn-primary w-full">Login</button>
                </form>
                <Button
                    onClick={handleGoogleLogin}
                    className="btn btn-ghost w-full mt-4"
                ><svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </Button>

                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link className="text-primary" to="/signup">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
