"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Heading, Table, TextField } from "@radix-ui/themes"

export default function Referals(){
    return(
        <>
        <Heading size={'7'} className="mb-3">Referals List</Heading>
            <TextField.Root placeholder="search by id" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Referal Id</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Referal Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>discount</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </>
    )
}