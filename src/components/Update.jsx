import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const previousUser = useLoaderData();
    const [user, setUser] = useState(previousUser);
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.preventDefault();

        fetch(`http://localhost:5000/users/${previousUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                // toast.success('User updated successfully')
                alert('Updated')
                navigate('/')
            }
            console.log(data);
        })

    }

    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);        
    }
    return (
        <div>
            <h2>Please Update: {previousUser.name}</h2>
            <form onSubmit={handleUpdate}>
                <input onChange={handleInputChange} type="text" name='name' defaultValue={previousUser.name} placeholder='Name' required/>
                <br />
                <input onChange={handleInputChange} type="text" name="address" defaultValue={previousUser.address} placeholder='Address' required/>
                <br />
                <input onChange={handleInputChange} type="email" name="email" defaultValue={previousUser.email} id="" placeholder='Email' required/>
                <br />
                <button type="submit">Update</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Update;