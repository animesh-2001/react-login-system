import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import "../style.css";

const Login = () => {
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [staus,setstatus] = useState("");
    
    Axios.defaults.withCredentials = true;
    const sendRequ = () => {
        Axios.post("http://localhost:7000/api/login",{
            name:name,
            email:email,
            password:password
        }).then(response => {
            setstatus(response.data.result.name);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:7000/api/login").then(response => {
            console.log(response.data)
            if(response.data.logedIn){
          setstatus(response.data.user.name)
            }
        })
    },[])

    return(
        <>
            <div className="form">
                <input type="text" placeholder="enter your username" onChange={(e) => setname(e.target.value) } />
                <input type="email" placeholder="enter your email" onChange={(e) => setemail(e.target.value) }/>
                <input type="password" placeholder="enter your password" onChange={(e) => setpassword(e.target.value) }/>
                <button type="button" onClick={sendRequ}>
                    Log in
                </button>
                <h1>{staus}</h1>
            </div>
        </>
    );
}

export default Login;