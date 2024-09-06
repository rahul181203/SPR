"use client"

import { Provider } from "jotai"
import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'

export default function Providers({children}:{children:React.ReactNode}){
    return (
        <>
            <Provider>
                <DevTools position="bottom-right" theme="dark"/>
                {children}
            </Provider>
        </>
    )
}