// "use client"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Box, Button, Flex, Heading, Table, TextField } from "@radix-ui/themes"
import Link from "next/link"
import { getAllProducts } from '../../../actions/products';
import SearchBar from '../../../components/searchbar';

interface ProductData{
    id: String
    name: String
    category: String
    total_units: String
    cost_price: String
    margin :String
    selling_price :String
    units_sold: String | null
}

export default async function Products({
    searchParams
}:{searchParams:{[key: string]:string | string[] | undefined }}){

    const search = typeof searchParams.q === 'string' ? searchParams.q : undefined

    const data = await getAllProducts(search!);
    return(
        <>
        <Flex justify={'between'} align={'center'}>
        <Heading size={'7'} className="mb-3">Products List</Heading>
        <Link href={'/dashboard/products/addproduct'}><Button>Add Product</Button></Link>
        </Flex>
            <SearchBar/>
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
                <Table.Body key={0}>
                    {
                        data.map((i,idx)=>{
                            return (
                            <>
                                <Table.Row key={idx+1}>
                                <Table.RowHeaderCell >{idx+1}</Table.RowHeaderCell>
                                <Table.Cell>{i.id}</Table.Cell>
                                <Table.Cell>{i.name}</Table.Cell>
                                <Table.Cell>{i.category}</Table.Cell>
                                <Table.Cell>{i.total_units}</Table.Cell>
                                <Table.Cell>{"$"+i.cost_price}</Table.Cell>
                                <Table.Cell>{"$"+i.margin}</Table.Cell>
                                <Table.Cell>{"$"+i.selling_price}</Table.Cell>
                                <Table.Cell>{i.units_sold && '0'}</Table.Cell>
                                </Table.Row>
                            </>
                        )
                        })
                    }
                </Table.Body>
            </Table.Root>
        </>
    )
}