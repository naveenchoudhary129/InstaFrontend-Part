import React , {useState , useEffect} from "react";
import PostTime from "./PostTime";
const Home = () => {

    const [data , setData] = useState([])
    const date = new Date()
    useEffect(() => {
        fetch('https://instaclonebackend-naveen.onrender.com/allpost' , {
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts)
            console.log(result);
        })
    } , [])


    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <h6>{item.location}</h6>
                            <div className="card-image">
                                <img className="homeimage" src={item.photo} />
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            <i className="material-icons" style={{marginLeft:"15px" , cursor: "pointer"}}>comment</i>
                            <i className="material-icons" style={{marginLeft:"15px" , cursor: "pointer"}}>share</i>
                            <span className="date">
                                { <PostTime date={ date } /> }
                            </span>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add a Comment" />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Home ;