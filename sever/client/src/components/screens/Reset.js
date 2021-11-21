import React,{useState,useContext,} from 'react' 
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Reset= ()=>{
    const history=useHistory()
    const [email,setEmail]=useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email",classes:"#388e3c green darken-1"})
            return
        }
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
            }).then(res=>res.json())
            .then(data=>{
               if(data.error){
                M.toast({html: data.error, classes:"#388e3c green darken-1"})
               }
               else{
                   M.toast({html:data.message, classes:"#388e3c green darken-1"})
                   history.push('/signin')
               }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Memories</h2>
            <input 
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn waves-effect waves-light #b71c1c red darken-1"
            onClick={()=>PostData()}
            >
                Reset password
            </button>


        </div>
        </div>
    )
}

export default Reset