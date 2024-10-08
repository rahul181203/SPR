"use client";
import Loading from "@/app/loading";
import * as React from "react"
import { GoToCartButton } from "@/components/CartButton";
import { cartList } from "@/store";
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
import { useAtom } from "jotai";
import { Suspense } from "react";


export default function Cart() {
  const [list, setList] = useAtom(cartList);

  // const updateQuantity = (productId: number, newQuantity: number) => {
  //   setList((prevList) => {
  //     return {
  //       ...prevList,
  //       items: prevList.items.map((item) => {
  //         if (item.product_id === productId) {
  //           const updatedTotalAmount =
  //             (item.total_amount! / item.quantity!) * newQuantity;
  //           return {
  //             ...item,
  //             quantity: newQuantity,
  //             total_amount: updatedTotalAmount,
  //           };
  //         }
  //         return item;
  //       }),
  //       totalPrice: prevList.items.reduce(
  //         (total, item) =>
  //           total +
  //           (item.product_id === productId
  //             ? (item.total_amount! / item.quantity!) * newQuantity
  //             : item.total_amount!),
  //         0
  //       ),
  //     };
  //   });
  // };

  // const removeItem = (productId: number) => {
  //   setList((prevList) => ({
  //     ...prevList,
  //     items: prevList.items.filter((item) => item.product_id !== productId),
  //     totalPrice: prevList.items
  //       .filter((item) => item.product_id !== productId)
  //       .reduce((total, item) => total + item.total_amount!, 0),
  //   }));
  // };

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
            <Link href="/dashboard/checkout">
              <Button disabled={list.totalPrice < 1 ? true : false} variant="soft" type="button">
                Proceed To CheckOut
              </Button>
            </Link>
          </Flex>
        </Box>
      </footer>
    </>
  );
}
