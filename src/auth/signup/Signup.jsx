import { useState } from "react";
import { Link, useNavigate } from "react-router";
import style from "../signup/Signup.module.css";
import { useSignupMutation } from "../../apis/applicationApi";

const SignUp =()=> {
    const [signup, {isLoading}] = useSignupMutation();
    const navigate = useNavigate();

    const [signupData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [signupError, setSignUpError] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSignUpData(prev => ({...prev,[name]: value}));

        if(signupError[name]){
            setSignUpError(prev =>  ({...prev,[name]:"" }))
        }
    };

    const validateForm = () =>{
        const error = {};

        if(!signupData.email.trim()){
            error.email = "Pls enter your email to continue";
        }
        if(!signupData.password.trim()){
            error.password = "Pls enter your password to continue";
        }
        if(!signupData.confirmPassword.trim()){
            error.confirmPassword = "Pls confirm your password";
        }

        return error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if(Object.keys(error).length > 0){
            setSignUpError(error);
            return;
        }

        try{
            const{confirmPassword, ...formData} = signupData;
            const result = await signup(signupData).unwrap();
            console.log(result);
            localStorage.setItem("email", formData.email)
            navigate("/dashboardpage");
        }catch (error) {
            setSignUpError({submit: error?.data?.message || "Sign Up fail"})
        }
    }




    return (
        <>
            <form className={style.formContainer} onSubmit={handleSubmit}>
                <h1>Sign Up</h1>

                {signupError.submit && (
                    <div className={style.errorMessage}>{signupError.submit}</div>
                )}

                <div className={style.labelInput}>
                     <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={signupData.email} name="email" className={style.input} type="email" placeholder="Enter your email"required/>
                        {signupError.email && (
                        <span className={style.error}>{signupError.email}</span>
                    )}
                </div>

                <div className={style.labelInput}>
                     <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={signupData.password} name="password" className={style.input} type="email" placeholder="Enter your password"required/>
                        {signupError.email && (
                        <span className={style.error}>{signupError.email}</span>
                    )}
                </div>

                <div className={style.labelInput}>
                     <label htmlFor="password">Confirm Password</label>
                        <input onChange={handleChange} value={signupData.confirmPassword} name="confirmPassword" className={style.input} type="email" placeholder="Confirm your password"required/>
                        {signupError.email && (
                        <span className={style.error}>{signupError.email}</span>
                    )}
                </div>

                <button type="submit" className={style.submitButton} disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>
                <p className={style.signupLink}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    )
}
export default SignUp