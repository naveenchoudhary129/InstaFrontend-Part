import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom" ;
import M from "materialize-css" ;
const Signup = () => {
    const navigate = useNavigate();
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const PostData = () => { 
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
           
        fetch("https://instaclonebackend-naveen.onrender.com/signup" , {
            method:"post",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name:name,  
                email:email,
                password: password
            })
        }).then(res =>res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error , classes:"#c62828 red darken-3"});
            }
            else{
                M.toast({html: data.message , classes:"#43a047 green darken-1"})
                navigate("/signin");
            }
        }).catch(err => {
            console.log(err);
        })
        return (true)
        }
        else{
            M.toast({html: "Invalid Email" , classes:"#c62828 red darken-3"});
            return (false)
        }
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>InstaClone</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() =>PostData()}>SignUp</button>
                <h5>
                <Link to="/SignIn" >Already have an account</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;