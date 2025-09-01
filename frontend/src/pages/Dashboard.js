import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const fetchPosts = () => {
        axios.get("/api/post/get")
            .then(res => setPosts(res.data))
            .catch(error => console.log(error))
    }
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Are you sure to delete")) {
            try {
                await axios.delete(`/api/post/delete/${id}`, {
                    headers: { Authorization: `BEARER:${token}` },
                    withCredentials: true
                })

                fetchPosts();
            } catch (error) {
                console.log("Error while Deleting", error)
            }

        }
    }

    // const handleLogOut = () => {
    //     axios.delete("/api/logout")
    // }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return
        }
        axios.get("/api/profile", { headers: { Authorization: `BEARER ${token}` } })
            .then(res => setUser(res.data.user))
            .catch(error => console.log(error))
        axios.get("/api/post/get")
            .then(res => setPosts(res.data))
            .catch(error => console.log("Error Fetching the Posts", error))

    }, [navigate])
    return (
        <div>
            <h2>Home Page</h2>
            {/* <button onClick={() => handleLogOut}>Logout</button> */}
            {user ? <p className="para">Welcome {user.name}</p> : <p>Please Log In First</p>}

            <div>
                <h3>All Posts</h3>
                <Link to="/create-post">
                    <button>Create Post</button>
                </Link>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post">
                            <h5>Title:{post.title}</h5>
                            <p>Content:{post.body}</p>

                            <button onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>

                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>

                    ))
                ) :
                    <p>No posts found</p>
                }
            </div>
        </div>
    )
}

export default Dashboard
