"use client";
import Loading from "@/app/loading";
import { cartList } from "@/store";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { Suspense } from "react";

export default function Cart() {
  const [list, setList] = useAtom(cartList);

  const updateQuantity = (idx: number, newQuantity: number) => {
    setList((prevCart) =>
      prevCart.map((item, i) =>
        i == idx ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (idx: number) => {
    setList((prevCart) => prevCart.filter((_, i) => i != idx));
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
            {list.map((item, idx) => {
              return (
                <>
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
                    <Table.Cell>${item?.total_amount}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={"3"}>
                        <button disabled={item?.quantity == 1}>
                          <MinusCircledIcon
                            opacity={item?.quantity == 1 ? 0.4 : 1}
                            onClick={() =>
                              updateQuantity(idx, item?.quantity - 1)
                            }
                            height={"20"}
                            width={"20"}
                          />
                        </button>
                        {item?.quantity}
                        <button>
                          <PlusCircledIcon
                            onClick={() =>
                              updateQuantity(idx, item?.quantity + 1)
                            }
                            height={"20"}
                            width={"20"}
                          />
                        </button>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      ${item?.total_amount * item?.quantity}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => removeItem(idx)} color="red">
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}
          </Table.Body>
        </Suspense>
      </Table.Root>
    </>
  );
}
