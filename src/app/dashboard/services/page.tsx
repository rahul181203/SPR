import { deleteService, getAllServices } from "@/actions/service";
import AddCart from "@/components/AddCart";
import { GoToCartButton } from "@/components/CartButton";
import DeleteButton from "@/components/DeleteButton";
import SearchBar from "@/components/searchbar";
import { Button, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import * as React from "react"

export default async function Services({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.q === "string" ? searchParams.q : undefined;

  const data = await getAllServices(search!);

  return (
    <>
      <Flex justify={"between"}>
        <Heading size={"7"} className="mb-3">
          Services List
        </Heading>
        <Link href={"/dashboard/services/addservices"}>
          <Button>Add Service</Button>
        </Link>
      </Flex>
      <SearchBar />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Service Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Service Name</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell>Service Charge</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell>Add to List</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((i, idx) => {
            return (
              <>
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>{idx + 1}</Table.RowHeaderCell>
                  <Table.Cell>{i.id}</Table.Cell>
                  <Table.Cell>{i.name}</Table.Cell>
                  {/* <Table.Cell>{i.name}</Table.Cell> */}
                  <Table.Cell>{"$" + i.charge}</Table.Cell>
                  {/* <Table.Cell>
                    <DeleteButton id={i.id} method={deleteService} />
                  </Table.Cell> */}
                  <Table.Cell>
                    <AddCart id={i.id} type="service" />
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table.Root>
      <footer id="footer" className="fixed bottom-0 right-0 m-4 z-10 w-[100%]">
        <GoToCartButton />
      </footer>
    </>
  );
}
