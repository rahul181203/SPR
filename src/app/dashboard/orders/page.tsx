
import { getOrders } from "@/actions/orders"
import SearchBar from "@/components/searchbar";
import { Table, Heading } from "@radix-ui/themes"

export default async function Orders(){
    const orders = await getOrders();
    return(
        <>
            <Heading size={'7'} className=" mb-3">Orders List</Heading>
            <SearchBar/>
            <Table.Root className=" overflow-x-scroll" >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.NO</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Customer Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Customer Mobile Num</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>no.of.units</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Referal</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Discount</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>tax</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Total Bill</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        orders.map((o,i)=>{
                            return <>
                                <Table.Row key={i} align={'center'} >
                                    <Table.RowHeaderCell>{i+1}</Table.RowHeaderCell>
                                    <Table.Cell justify={'center'}>{o.id}</Table.Cell>
                                    <Table.Cell justify={'center'}>{o.customer.firstname}</Table.Cell>
                                    <Table.Cell justify={'center'}>{o.customer.mobilenumber}</Table.Cell>
                                    <Table.Cell justify={'center'}>
                                    {
                                        o.items.map((item,idx)=>{
                                            return <>
                                            <Table.Row  key={idx}>
                                                <Table.Cell className="shadow-none">{item.product?.name || item.service?.name}</Table.Cell>
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
                                                <Table.Cell className="shadow-none">{item?.product?.category}</Table.Cell>
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
                                    <Table.Cell justify={'center'}></Table.Cell>
                                    <Table.Cell justify={'center'}></Table.Cell>
                                    <Table.Cell justify={'center'}>${o.tax}</Table.Cell>
                                    <Table.Cell justify={'center'}>${o.total_amount}</Table.Cell>
                                </Table.Row>
                            </>
                        })
                    }
                </Table.Body>
            </Table.Root>
        </>
    )
}