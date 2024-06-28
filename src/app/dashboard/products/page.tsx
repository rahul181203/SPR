"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Heading, Table, TextField } from "@radix-ui/themes"

export default function Products(){
    return(
        <>
        <Heading size={'7'} className="mb-3">Products List</Heading>
            <TextField.Root placeholder="search by id" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Product Id</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Product Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Total Units</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Cost Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Margin</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Selling Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Units Sold</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </>
    )
}