type loginTemplateOptions={
    ip:string,
    device:string,
    date:string,
}

export const LoginTemplate=(options:loginTemplateOptions)=>{
    return `
        <div>
            <center>
                <h1>Login Detected</h1>
                <h3>User Device: ${options.device}</h3>
                <h3>Device IP: ${options.ip}</h3>
                <h3>Login Date: ${options.date}</h3>
                <p>If you are not logged in please reset the password</p>
                <footer>
                <div style={display:"flex-row",justifyContent:"space-evenly",color:"grey"}>
                    <p>© inventory • Store Sales Analysis software • 2024</p>
                </div>
            </footer>
            </center>
        </div>
    `   
}