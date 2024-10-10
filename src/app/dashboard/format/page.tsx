
import * as React from "react"

export default function Home(){
    return(
        <>
            <div>
                <center>
                    <h1>Login Detected</h1>
                    <h3>User Device: IOS</h3>
                    <h3>Login Date: IOS</h3>
                    <h3>Login Time: IOS</h3>
                    <p>If you are not logged in please reset the password</p>
                </center>
                <footer>
                    <div style={{display:"flex",justifyContent:"space-evenly",color:"grey"}}>
                        <p>© inventory</p>
                        <p>Store Sales Analysis software</p>
                        <p>2024</p>
                    </div>
                </footer>
            </div>
        </>
    )
}