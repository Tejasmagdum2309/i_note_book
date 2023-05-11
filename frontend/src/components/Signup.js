import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch('http://localhost:5000/api/auth/createuser', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save auth token 
            localStorage.setItem('token', json.authtoken);
            //to redirect to home page
            navigate("/");
            props.showAlert("Account Created Successfully ", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"  required />

                </div>

                <div className="mb-3">
                    <label htmlFor="eamil" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />

                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confurm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
                </div>

                <button disabled={credentials.name.length < 5 || credentials.password.length < 5 || credentials.email.length < 5} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
