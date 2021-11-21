import React,{useState,useContext,} from 'react' 
import { Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'

const SignIn= ()=>{
    const history=useHistory()
    const [password,setPassword]=useState("")
    const {token} = useParams()
    console.log(token)
    const PostData=()=>{
        fetch("new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
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
            type="password"
            placeholder="enter new password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #b71c1c red darken-1"
            onClick={()=>PostData()}
            >
                Update Password 
            </button>


        </div>
        </div>
    )
}

export default SignIn