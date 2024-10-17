"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as React from "react";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/checkOutComponent";
import { useAtom, useAtomValue } from "jotai";
import { cartList } from "@/store";
import {
  Box,
  RadioCards,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Table,
} from "@radix-ui/themes";
import { UserDTO } from "@/interfaces";
import { AvatarIcon } from "@radix-ui/react-icons";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export default function CheckOut() {
  const [radio, setRadio] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<UserDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedUser, setSelectedUser] = React.useState<UserDTO>();

  if(typeof window !== "undefined"){
    window.addEventListener("click",function(e){
      if(this.document.getElementById("searchbar")?.contains(e.target as Node)){
        setLoading(false)
      }else{
        setLoading(true)
      }
    })
  }
  

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      fetch(`/api/user?q=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const list = useAtomValue(cartList);
  const amount = list.totalPrice == 0 ? 1 : list.totalPrice;
  return (
    <>
      <Box mb={"4"} position={"relative"}>
        <TextField.Root
        id="searchbar"
          onClick={()=>setLoading(false)}
          placeholder="search user by mobile number or name ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box
          hidden={loading} 
          position={"absolute"}
          className="z-10 bg-white w-full text-black top-12"
        >
          {data.map((u, i) => {
            return (
                <Flex className="cursor-pointer" onClick={()=>{setLoading(true);setSelectedUser(u)}} key={i} p={"3"} m={'3'} align={"center"} gap={"3"}>
                  <AvatarIcon height={"20"} width={"20"} />
                  <Flex direction={"column"}>
                    <Text> {u.firstname} </Text>
                    <Text>{u.mobilenumber}</Text>
                  </Flex>
                </Flex>
            );
          })}
          <Flex className="cursor-pointer" p={"3"} m={'3'} align={"center"} gap={"3"}>
              <AvatarIcon height={"20"} width={"20"} />
                <Text>Add New User</Text>
          </Flex>
        </Box>
      </Box>
      <Box m={"3"}>
        <Heading mb={"2"}>User Details: </Heading>
        <Table.Root variant="surface">
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>First Name</Table.RowHeaderCell>
              <Table.Cell>{selectedUser?.firstname}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Last Name</Table.RowHeaderCell>
              <Table.Cell>{selectedUser?.lastname}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Email</Table.RowHeaderCell>
              <Table.Cell>{selectedUser?.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Phone Number</Table.RowHeaderCell>
              <Table.Cell>{selectedUser?.mobilenumber}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      <Box m={"3"}>
        <Heading mb={"2"}>Items List:</Heading>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Mac Book Pro</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>$1299.99</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      <Box maxWidth="600px">
        <RadioCards.Root columns={"1"}>
          <RadioCards.Item
            value="creditCard"
            onClick={(x) => {
              setRadio((x.target as HTMLInputElement).value);
            }}
          >
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
          <RadioCards.Item
            value="cash"
            onClick={(x) => {
              setRadio((x.target as HTMLInputElement).value);
            }}
          >
            <Flex direction="column" width="100%">
              <Text weight="bold">Cash</Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Box>
    </>
  );
}
