import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleSubmit = event => {
        
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success("Wow User added successfully!")
                event.target.reset();
            }
        })

    }

    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);        
    }

    return (
        <div>
            <h2>Please add user</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='Name' required/>
                <br />
                <input onBlur={handleInputBlur} type="text" name="address" placeholder='Address' required/>
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='Email' required/>
                <br />
                <button type="submit">Add User</button>
            </form> 
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddUser;