import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();
        let sesData = sessionStorage.getItem("user")
        let userId = JSON.parse(sesData)

        const response = await fetch('http://localhost:4000/updateUser', {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, description, username, password,id: userId?.id  }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            alert('Update successful');
        } else {
            alert('Update failed');
        }
    }


    useEffect(()=> {
        let sesData = sessionStorage.getItem("user")
        let userId = JSON.parse(sesData)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/getUser/${userId?.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Res **************", response.data);
               setName(response?.data?.name)
               setEmail(response?.data?.email)
               setPhone(response?.data?.phone)
               setDescription(response?.data?.description)
               setUsername(response?.data?.username)
            })
            .catch((error) => {
                console.log("Error ************", error);
            });

    }, [])
    return (
        <>
            <form className="register" style={{ marginTop: '200px', marginBottom: '400px' }} onSubmit={register}>
                <h1>Update Profile</h1>
                <input type="text"
                    placeholder="name"
                    value={name}
                    onChange={ev => setName(ev.target.value)} />
                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={ev => setPhone(ev.target.value)} />
                <input type="text"
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} />
                <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                {/* <input type="password"
               placeholder="password"
               value={password}
               onChange={ev => setPassword(ev.target.value)}/> */}
                <button>Update</button>
            </form>
        </>
    )
}

export default Profile