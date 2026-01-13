import style from "../login/Login.module.css"
import { useState } from "react"
import {Link, useNavigate} from "react-router"
import {useLoginMutation} from "../../apis/applicationApi"

const Login = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const [loginData, setLogindata] = useState({
        email: "",
        password: ""
    })

    const [loginError, setLoginError] = useState({ text: "", type: "" });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogindata((prev) => ({...prev, [name]: value}));
    }

    const submitHandle = async (e) => {
        e.preventDefault();

        try{
            const response = await login(loginData).unwrap();
            console.log('Login API Response:', response);
            const token = response.data.token;

            if (token) localStorage.setItem('token', token);
            setLoginError({text: "Login successful!", type: "success"});
            navigate("/dashboardpage")
        }catch (error){
            const errorMessage = error?.data?.loginError || error?.loginError || "Login failed. Please try again.";
            setLoginError({text: errorMessage, type: "error"});
        }
    }

   

    return (
        <>
            <div className={style.loginContainer}>

                <form onSubmit={submitHandle} className={style.loginForm}>
                    <h1>Login</h1>
                    {loginError.text && <p className={style.errorMessage}>{loginError}</p>}


                    <div className={style.loginInput}>
                        <label htmlFor="email">Email</label>
                            <input onChange={handleChange} name="email" className={style.input} type="email" placeholder="Enter your email"required/>
                    </div>


                    <div className={style.loginInput}>
                        <label htmlFor="password">Password</label>
                            <input onChange={handleChange} name="password" className={style.input} type="password" placeholder="Enter your password"required/>
                    </div>


                    <button type="submit" className={style.loginButton}>Login</button>
                </form>
                
                <p className={style.signupLink}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        
        </>
    )
}
export default Login