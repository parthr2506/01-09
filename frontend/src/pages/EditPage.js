import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({ title: "", body: "" })
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`/api/post/${id}`, {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                }
                );
                setForm({ title: response.data.title, body: response.data.body })

            } catch (error) {
                console.log("Error", error)
            }
        }
        fetchPost();
    }, [id]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                `/api/post/update/${id}`,
                form,
                {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                setMessage("Updates are successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error editing post:", error);
            setMessage("Error editing post. Please try again.");
        }
    };

    return (
        <div>
            <h2>Edit </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Edit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditPage
