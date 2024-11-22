"use client";
import Loading from "../loading";
import * as React from "react"
import { GoToCartButton } from "@/components/CartButton";
import { cartList, userID } from "@/store";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import Link from "next/link"
import { useAtom, useAtomValue } from "jotai";
import { Suspense } from "react";
import { useRouter } from 'next/navigation'

export default function Cart() {
  const [list, setList] = useAtom(cartList);
  const [loading,setLoading] = React.useState(false)
  const router = useRouter()
  const user = useAtomValue(userID)
  const [err,setError] = React.useState(false)
  

  const NextSection=async()=>{
    setLoading(true)
    await fetch("/api/cart",{method:"DELETE",body:JSON.stringify({"opid":user})})
    // for(var i=0;i<list.items.length;i++){
    //   await fetch("/api/cart",{
    //     method:"POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body:(list.items[i].product_id) ? JSON.stringify({"opid":user,"product_id":list.items[i].product_id,"quantity":list.items[i].quantity}):JSON.stringify({"opid":user,"service_id":list.items[i].service_id,"quantity":list.items[i].quantity})
    //   })
    // }
    await fetch("/api/cart",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({...{"opid":user},...list})
    }).then((val)=>val.json())
    .then((msg)=>{
      console.log(msg);
      if(msg.msg){
        setError(msg.msg.includes("Out of stock"));
        if(msg.msg.includes("Out of stock")){
          alert(msg.msg)
        }
      }
      if(msg.res){
        setList({items:[],totalPrice:0})
        router.push("/dashboard/checkout");
      }
      setLoading(false);
    })
  }

  if(loading){
    return(
      <>
        <Loading/>
      </>
    )
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    setList(prevList => {
      const updatedItems = prevList.items.map((item, idx) => {
        if (idx === index) {
          const pricePerUnit = item.total_amount! / item.quantity!; // Calculate price per unit
          const updatedTotalAmount = pricePerUnit * newQuantity; // Calculate new total amount
          return {
            ...item,
            quantity: newQuantity,
            total_amount: updatedTotalAmount
          };
        }
        return item; // Return other items unchanged
      });

      // Calculate new total price
      const newTotalPrice = updatedItems.reduce((total, item) => total + item.total_amount!, 0);

      return {
        ...prevList,
        items: updatedItems,
        totalPrice: newTotalPrice
      };
    });
  };

  const deleteItem = (index: number) => {
    setList(prevList => {
      const updatedItems = prevList.items.filter((_, idx) => idx !== index);
      const newTotalPrice = updatedItems.reduce((total, item) => total + item.total_amount!, 0);

      return {
        ...prevList,
        items: updatedItems,
        totalPrice: newTotalPrice
      };
    });
  };


  return (
    <>
      <Heading>Cart List</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Remove</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Suspense fallback={<Loading />}>
          <Table.Body key={0}>
            {list.items.map((item, idx) => {
              return (
                  <Table.Row key={idx + 1}>
                    <Table.RowHeaderCell>{idx + 1}</Table.RowHeaderCell>
                    <Table.Cell>
                      {item?.product_id != null
                        ? item?.product_id
                        : item?.service_id}
                    </Table.Cell>
                    <Table.Cell>{item?.name}</Table.Cell>
                    <Table.Cell>
                      {item?.product_id != null ? "Product" : "Service"}
                    </Table.Cell>
                    <Table.Cell>
                      {item?.product_id != null ? item.category : "-"}
                    </Table.Cell>
                    <Table.Cell>
                      ${item?.total_amount! / item?.quantity!}
                    </Table.Cell>
                    <Table.Cell>
                      <Flex gap={"3"}>
                        <button disabled={item?.quantity == 1}>
                          <MinusCircledIcon
                            opacity={item?.quantity == 1 ? 0.4 : 1}
                            onClick={() =>
                              updateQuantity(
                                idx,
                                item.quantity! - 1
                              )
                            }
                            height={"20"}
                            width={"20"}
                          />
                        </button>
                        {item?.quantity}
                        <button>
                          <PlusCircledIcon
                            onClick={() =>
                              updateQuantity(
                                idx,
                                item.quantity! + 1
                              )
                            }
                            height={"20"}
                            width={"20"}
                          />
                        </button>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>${item.total_amount!}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => deleteItem(idx)}
                        color="red"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
              );
            })}
          </Table.Body>
        </Suspense>
      </Table.Root>
      <footer id="footer" className="fixed bottom-0 right-0 m-4 z-10 w-[100%]">
        <Box className="fixed bottom-0 right-0 m-4">
          <Flex gap={"3"} justify={"center"} align={"center"}>
            <Text>${list.totalPrice}</Text>
              <Button onClick={()=>NextSection()} disabled={list.totalPrice < 1 ? true : false} variant="soft" type="button">
                Proceed To CheckOut
              </Button>
          </Flex>
        </Box>
      </footer>
    </>
  );
}
