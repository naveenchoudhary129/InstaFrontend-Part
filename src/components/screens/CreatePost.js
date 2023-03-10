import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css" ;
const CreatePost = ()=>{
    const navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [body , setBody] = useState("");
    const [location , setLocation] = useState("");
    const [image , setImage] = useState("");
    const [url , setUrl] = useState("");

    useEffect(() => {
        if(url){
        fetch("https://instaclonebackend-naveen.onrender.com/createpost" , {
            method:"post",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({   
                title:title,
                body:body,
                location:location, 
                pic:url 
            })
        }).then(res =>res.json())
        .then(data => {
            
            if(data.error){
                M.toast({html: data.error , classes:"#c62828 red darken-3"});
            }
            else{
                M.toast({html: "Created Post Successfully" , classes:"#43a047 green darken-1"})
                navigate("/");
            }
        }).catch(err => {
            console.log(err);
        })
        }
    } , [url])
    const postDetails = () => {
        const data = new FormData()
        data.append("file" , image)
        data.append("upload_preset" , "insta-clone")
        data.append("cloud_name","naveenchoudhary")
        fetch("https://api.cloudinary.com/v1_1/naveenchoudhary/image/upload" , {
            method:"post",
            body:data
        }).then(res => res.json())
        .then((data) => {
            setUrl(data.url)
        }).catch(err => {
            console.log(err);
        })

        
    } 
    return(
        <div className="card input-filed" style={{
            margin:"50px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() =>postDetails()} >Submit Post</button>
            </div>
    )
}

export default CreatePost ;