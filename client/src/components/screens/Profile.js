import React,{useState,useContext,useEffect} from 'react'
import {UserContext} from '../../App'


const Profile = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const [mypics,setMyPics] = useState([])
    const [image,setImage] =useState("")

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMyPics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if (image) {
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","socially")
            data.append("cloud_name","dizvlttbm")
            fetch("https://api.cloudinary.com/v1_1/dizvlttbm/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json())
            .then(data=>{ 
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                })
                // window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[image])

    const updatePhoto =(file) =>{
        setImage(file)
    }



    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",borderRadius:"100px"}}
                    src={state?state.pic:"loading"}
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo}/>

                    )
                })
            }
            </div>
        </div>
    )
}

export default Profile