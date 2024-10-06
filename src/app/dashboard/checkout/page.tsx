"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as React from "react";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/checkOutComponent";
import { useAtom, useAtomValue } from "jotai";
import { cartList } from "@/store";
import { Box, RadioCards, Flex, Text } from "@radix-ui/themes";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export default function CheckOut() {
  const [radio, setRadio] = React.useState("");

  const list = useAtomValue(cartList);
  const amount = list.totalPrice == 0 ? 1 : list.totalPrice;
  return (
    <>
      <Box maxWidth="600px">
        <RadioCards.Root
          columns={"1"}
        >
          <RadioCards.Item value="creditCard" onClick={(x) => {
            setRadio((x.target as HTMLInputElement).value)
        }}>
            <Flex direction="column" width="100%">
              <Text weight="bold">Credit Card</Text>
            </Flex>
          </RadioCards.Item>
          {radio === "creditCard" && (
            <>
              <Box my={"3"}>
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "inr",
                  }}
                >
                  <CheckoutPage amount={amount} />
                </Elements>
              </Box>
            </>
          )}
          <RadioCards.Item value="cash" onClick={(x) => {
            setRadio((x.target as HTMLInputElement).value)
        }}>
            <Flex direction="column" width="100%">
              <Text weight="bold">Cash</Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Box>
    </>
  );
}
