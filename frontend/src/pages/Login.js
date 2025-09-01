import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true })
        }
    }, [navigate])
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // if (res.status === 200) {
            //     if (res.data.token) {
            //         localStorage.setItem("token", res.data.token)
            //         alert("Login In Successfull.Redirecting...")
            //     }
            //     navigate("/dashboard", { replace: true })
            // }
            localStorage.setItem("token", res.data.token)
            alert("Login In Successfull.Redirecting...")
            console.log(res)
            navigate("/dashboard")

        } catch (error) {
            console.log(error)
            alert("Error", error)

        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login Form</h2>
            <label htmlFor="email">Email:</label>
            <input name="email" type="email" placeholder="email" onChange={handleChange} /> <br />
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" placeholder="password" onChange={handleChange} /><br />
            <button type="submit">Submit</button>
        </form >
    )
}

export default Login
