"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { Heading, Table, TextField } from "@radix-ui/themes"

export default function Customers(){
    return(
        <>
        <Heading size={'7'} className="mb-3">Customers List</Heading>
            <TextField.Root placeholder="search by id" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Mobile Number</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </>
    )
}