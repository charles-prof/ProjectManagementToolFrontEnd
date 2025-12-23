import { useState } from "react"
import { Button } from "@/components/ui/button"
import Signup from "./Signup"
import Login from "./Login"
import './Auth.css'

function Auth () {
    const [active,setActive] = useState(true)
    return (
        <div className="loginContainer">
           <div className="box h-[30rem] w-[25rem]">
              <div className="minContainer login">
                    <div className="loginBox w-full px-10 space-y-5">
                        {active ? <Signup toggle={()=>setActive(!active)}/>:<Login/>}
                        <div>
                             <span> already have account ?</span>
                             <Button className="footer-btn" variant="ghost" onClick={() => setActive(!active)}>{active?"signin":"signup"}</Button>
                        </div>
                    </div>
              </div>

           </div>
        </div>
    )
}

export default Auth