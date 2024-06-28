"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Table, TextField, Heading } from "@radix-ui/themes"

export default function Orders(){
    return(
        <>
            <Heading size={'7'} className=" mb-3">Orders List</Heading>
            <TextField.Root placeholder="search by id" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Customer Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Product Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>no of units</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Product Cost</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Service Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Service Cost</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Referal</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Discount</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>tax</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Total Bill</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </>
    )
}