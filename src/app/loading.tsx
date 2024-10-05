import { Spinner } from "@radix-ui/themes";
import * as React from "react"

export default function Loading(){
    return (
        <>
            <center>
                <Spinner size={'3'}/>
            </center>
        </>
    )
}