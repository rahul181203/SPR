"use client"

import { cartList } from "@/store"
import { Box, Button, Flex, Text } from "@radix-ui/themes"
import { useAtom } from "jotai"
import Link from "next/link"

export const GoToCartButton=()=>{
    const [cart,setCart] = useAtom(cartList)
    return(
        <>
            <Box className="fixed bottom-0 right-0 m-4">
                <Flex gap={'3'} justify={'center'} align={'center'}>
                    <Text>${cart.totalPrice}</Text>
                    <Link href="/dashboard/cart"><Button variant="soft" type="button">Verify Order</Button></Link>
                </Flex>
            </Box>
        </>
    )
}