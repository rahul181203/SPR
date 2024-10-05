"use client"

import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import * as React from "react"
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/checkOutComponent";
import { useAtom, useAtomValue } from "jotai";
import { cartList } from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
export default function CheckOut(){
    const list = useAtomValue(cartList)
    const amount = list.totalPrice;
    return (
        <>
            <Elements
                stripe={stripePromise}
                options={
                    {
                        mode:"payment",
                        amount:convertToSubcurrency(amount),
                        currency:"inr",
                    }
                }
            >
                <CheckoutPage amount={amount}/>
            </Elements>
        </>
    )
}