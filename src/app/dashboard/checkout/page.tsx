"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as React from "react";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/checkOutComponent";
import { useAtom, useAtomValue } from "jotai";
import { cartList, userID } from "@/store";
import {
  Box,
  RadioCards,
  Flex,
  Text,
  TextField,
  Heading,
  Table,
  Button,
  TextArea,
} from "@radix-ui/themes";
import { CartDTO, UserDTO } from "@/interfaces";
import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Loading from "../loading";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export default function CheckOut() {
  const [radio, setRadio] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<UserDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedUser, setSelectedUser] = React.useState<UserDTO>();
  const [cartlist,setCartList] = React.useState<CartDTO>()
  const [cartLoader,setCartLoader] = React.useState<boolean>(true)
  const [amountPaid,setAmountPaid] = React.useState<number>(0)
  const router = useRouter()
  const [pageloader, setPageLoader] = React.useState(false);
  const user = useAtomValue(userID)

  const success=async()=>{
    setPageLoader(true)
    const userData = {"uid":selectedUser?.id,"opid":user,"transaction_type":"cash"}
    const newData = {
      ...cartlist,
      items: cartlist?.items.map(({ product,service, ...rest }) => rest)
    };
    await fetch("/api/order",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({...userData,...newData})
    }).then((res)=>res.json())
    .then(()=>{setPageLoader(false);router.push("/dashboard/payment-success")})
  }

  if(typeof window !== "undefined"){
    window.addEventListener("click",function(e){
      if(this.document.getElementById("searchbar")?.contains(e.target as Node)){
        setLoading(false)
      }else{
        setLoading(true)
      }
    })
  }

  React.useEffect(()=>{
      fetch(`/api/cart/${user}`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        }
      })
      .then((res)=>res.json())
      .then((d)=>{setCartList(d);setCartLoader(false)})
  },[user])

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

  if(cartLoader || pageloader){
    return (
      <>
        <Loading/>
      </>
    )
  }

  const amount = cartlist?.total_amount == undefined ? 1 : cartlist?.total_amount;
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
          <Link href={"/dashboard/checkout/adduser"}>
          <Flex className="cursor-pointer" p={"3"} m={'3'} align={"center"} gap={"3"}>
              <AvatarIcon height={"20"} width={"20"} />
                <Text>Add New User</Text>
          </Flex>
          </Link>
          
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
            {
              cartlist?.items.map((v,i)=>{
                return(
                  <Table.Row key={i}>
                    <Table.Cell>{(v.product?.name)?v.product.name:v.service?.name}</Table.Cell>
                    <Table.Cell>{v.quantity}</Table.Cell>
                    <Table.Cell>${v.total_amount}</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table.Root>
      </Box>

      <Heading m={'3'}>Payment Option: </Heading>

      <Box maxWidth="600px" m={'3'}>
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
                  <CheckoutPage amount={amount} user={selectedUser} />
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
        {
          (radio === "cash") && 
          <>
            <Flex direction={'column'} gap={'2'} m={'3'} align={'center'}>
            <Flex align={'center'} gap={'3'}>
              <Text>User Paid: </Text>
            <TextField.Root size={'3'} placeholder="0" type="number" value={amountPaid} onChange={(e)=>setAmountPaid(Number.parseInt(e.target.value))}>
              <TextField.Slot>
                $
              </TextField.Slot>
            </TextField.Root>
            </Flex>

            <Flex align={'center'} gap={'3'}>
              <Text>Total Amount: </Text>
              <TextField.Root size={'3'} placeholder="Amount Paid" value={amount} disabled>
              <TextField.Slot>
                $
              </TextField.Slot>
            </TextField.Root>
            </Flex>

            <Flex align={'center'} gap={'3'}>
              <Text>Change: </Text>
              <TextField.Root size={'3'} type="number" value={amountPaid-amount} disabled>
              <TextField.Slot>
                $
              </TextField.Slot>
            </TextField.Root>
            </Flex>

          </Flex>
            <Button onClick={success} className="my-3" color="green" disabled={(amountPaid-amount >= 0?false:true)}>
              Pay Cash
            </Button>
          </>
        }
      </Box>
    </>
  );
}
