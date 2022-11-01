import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = (user) => {
        const permission = window.confirm(`Are you sure? you delete ${user.name}`);
        // console.log(permission);
        if(permission){
            // console.log('delete button clicked', user._id);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
            .then( res => res.json())
            .then( data => {
                console.log(data)
                if(data.deletedCount === 1){
                    toast.success('Item deleted successfully!', {
                        position: 'top-center'
                    })
                    const remainingUser = displayUsers.filter(usr => usr._id !== user._id)
                    setDisplayUsers(remainingUser);
                }
            } )
        }
    }

    return (
        <div>
            <h2>Home :{displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name} {user.email}

                        <Link to={`/users/${user._id}`}>
                            <button>Update</button>
                        </Link>

                        <button onClick={() => handleDelete(user)}>x</button>
                    </p>)
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Home;