"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Heading, Table, TextField } from "@radix-ui/themes"
import * as React from "react"

export default function Transactions(){
    return(
        <>
        <Heading size={'7'} className="mb-3">Transactions List</Heading>
            <TextField.Root placeholder="search by id" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Transaction Id</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Customer Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Order Id</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Mode of payment</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </>
    )
}