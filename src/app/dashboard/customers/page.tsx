"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Heading, Table, TextField } from "@radix-ui/themes";
import { UserDTO } from "../../../interfaces/index";
import Loading from "../loading";



export default function Customers() {
  const [search, setText] = React.useState("");
  const [data, setData] = React.useState<UserDTO[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        });
    }, 500);
    return ()=>{clearTimeout(timeout)}
  }, [search]);

  return (
    <>
      <Heading size={"7"} className="mb-3">
        Customers List
      </Heading>
      <TextField.Root
        onChange={(d) => setText(d.target.value)}
        placeholder="search by name"
        className="m-4 p-2"
      >
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
        
        <Table.Body>
          {(!loading) && data.map((i, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{i.firstname}</Table.Cell>
                <Table.Cell>{i.lastname}</Table.Cell>
                <Table.Cell>{i.email}</Table.Cell>
                <Table.Cell>{i.mobilenumber}</Table.Cell>
                <Table.Cell>{idx}</Table.Cell>
                <Table.Cell>{i.gender}</Table.Cell>
                <Table.Cell>{i.address}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {loading && <Loading />}
    </>
  );
}
