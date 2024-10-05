import { Flex, Heading, Spinner } from "@radix-ui/themes";
import * as React from "react"

export default function Loading(){
    return (
        <>
            <Flex m={'auto'} direction={'column'} gap={'4'} justify={'center'} align={'center'}>
                <Spinner size={'3'}/>
                <Heading size={'3'}>Loading Data please wait...</Heading>
            </Flex>
        </>
    )
}