import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/signup", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Sign Up Successfull.Redirecting...")
            console.log(res)
            navigate("/login")

        } catch (error) {
            console.log(error)
            alert("Error", error)

        }
    }
    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Sign Up Form</h2>
            <div className="form_div">
                <label htmlFor="name">Name:</label>
                <input name="name" type="text" placeholder="name" onChange={handleChange} /> <br />
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" placeholder="email" onChange={handleChange} /> <br />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" placeholder="password" onChange={handleChange} /><br />
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Signup
