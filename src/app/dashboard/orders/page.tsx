
import { getOrders } from "@/actions/orders"
import SearchBar from "@/components/searchbar";
import { Table, Heading, Button } from "@radix-ui/themes"
import Link from "next/link";
import * as React from "react"

export default async function Orders(){
    const orders = await getOrders();
    return(
        <>
            <Heading size={'7'} className=" mb-3">Orders List</Heading>
            <SearchBar/>
            <Table.Root className=" overflow-x-scroll" >
                <Table.Header>
                    <Table.Row>
                        {/* <Table.ColumnHeaderCell justify={'center'} >S.NO</Table.ColumnHeaderCell> */}
                        <Table.ColumnHeaderCell justify={'center'} >Order ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Customer Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Customer Mobile Num</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Item Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Type</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >no.of.units</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Cost</Table.ColumnHeaderCell>
                        {/* <Table.ColumnHeader justify={'center'} Cell>Referal</Table.ColumnHeaderCell> */}
                        {/* <Table.ColumnHeader justify={'center'} Cell>Discount</Table.ColumnHeaderCell> */}
                        {/* <Table.ColumnHeader justify={'center'} Cell>tax</Table.ColumnHeaderCell> */}
                        <Table.ColumnHeaderCell justify={'center'} >Total Bill</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'} >Invoice</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        orders.map((o,i)=>{
                            return <>
                                <Table.Row key={i} align={'center'} >
                                    {/* <Table.RowHeaderCell>{i+1}</Table.RowHeaderCell> */}
                                    <Table.Cell justify={'center'}>{o.id}</Table.Cell>
                                    <Table.Cell justify={'center'}>{o.customer.firstname}</Table.Cell>
                                    <Table.Cell justify={'center'}>{o.customer.mobilenumber}</Table.Cell>
                                    <Table.Cell >
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row key={idx}>
                                                <Table.Cell className="shadow-none">{item.product?.name || item.service?.name}</Table.Cell>
                                            </Table.Row>
                                            </>
                                        })
                                    }
                                    </Table.Cell>
                                    <Table.Cell >
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row key={idx}>
                                                <Table.Cell className="shadow-none">{item?.product?.category}</Table.Cell>
                                            </Table.Row>
                                            </>
                                        })
                                    }
                                    </Table.Cell>
                                    <Table.Cell >
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row key={idx}>
                                                <Table.Cell className="shadow-none">{(item?.product === null)?"Service":"Product"}</Table.Cell>
                                            </Table.Row>
                                            </>
                                        })
                                    }
                                    </Table.Cell>
                                    <Table.Cell justify={'center'}>
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row key={idx}>
                                                <Table.Cell className="shadow-none">{item?.quantity}</Table.Cell>
                                            </Table.Row>
                                            </>
                                        })
                                    }
                                    </Table.Cell>
                                    <Table.Cell justify={'center'}>
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row key={idx}>
                                                <Table.Cell className="shadow-none">${item?.total_amount || item.service?.charge}</Table.Cell>
                                            </Table.Row>
                                            </>
                                        })
                                    }
                                    </Table.Cell >
                                    {/* <Table.Cell justify={'center'}></Table.Cell> */}
                                    {/* <Table.Cell justify={'center'}></Table.Cell> */}
                                    {/* <Table.Cell justify={'center'}>${o.tax}</Table.Cell> */}
                                    <Table.Cell justify={'center'}>${o.total_amount}</Table.Cell>
                                    <Table.Cell justify={'center'}>
                                        <Button className="my-3" color="green">
                                            <Link href={`/dashboard/invoice?id=${o.id}`}>Invoice</Link> 
                                        </Button>
                                    </Table.Cell>
                                    
                                </Table.Row>
                            </>
                        })
                    }
                </Table.Body>
            </Table.Root>
        </>
    )
}