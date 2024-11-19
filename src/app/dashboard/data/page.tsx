"use client"
// import { GoToCartButton } from "@/components/CartButton";
import DonutChart from "@/components/charts/donutchart";
import LineChart from "@/components/charts/linechart";
import PieChart from "@/components/charts/piechart";
import { ChatOption } from "@/components/chatOption";
// import { ReaderIcon } from "@radix-ui/react-icons";
import { Box, Heading, Text, Flex, Grid } from "@radix-ui/themes";
import * as React from "react"
import Loading from "../loading";
import TransactionPie from "@/components/charts/transactionPie";
import CategoryTransaction from "@/components/charts/categoryTrasactionChart";
import GenderChart from "@/components/charts/genderChart";
import ServiceChart from "@/components/charts/serviceChart";
import LineChartPS from "@/components/charts/linechartPS";
import PerDaySales from "@/components/charts/priceperday";



export default function Data() {
  const [data,setData] = React.useState<any>()
  const [loading,setLoading] = React.useState<boolean>(true)

  React.useEffect(()=>{
    fetch("/api/analytics/top4",{
      method:"GET",
      headers:{
        "content-type":"application/json"
      },next:{revalidate:60}
    }).then((res)=>res.json())
    .then((d)=>{setData(d);setLoading(false)})

  },[])

  if(loading){
    return <Loading/>
  }

  return (
    <>
      <Flex align={'center'} justify={'between'}>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Total Sales</Text>
          <Heading>${data.totalAmount!}</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>New Customers</Text>
          <Heading>{data.newCustomers!}</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Previous Day Sales</Text>
          <Heading>$32</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Most Sold Item</Text>
          <Heading>{data.topSelling!}</Heading>
        </Box>
      </Flex>
      <Box mt={'4'} ></Box>
      <Flex justify={'center'} gap={'4'}>
        <Box className="bg-slate-800 w-[45vw] p-5 rounded-lg">
          <LineChart/>
        </Box>
        <Box className="bg-slate-800 w-[30vw] p-5 rounded-lg" >
          <PieChart/>
        </Box>
      </Flex>
      <Box mt={'4'} ></Box>

      
      <Flex justify={'center'} gap={'4'} my={'3'}>
        <Box className="bg-slate-800 p-5 w-[40vw] rounded-lg" >
          <CategoryTransaction/>
        </Box>
        <Box className="bg-slate-800 p-5 w-[40vw] rounded-lg">
          <PerDaySales/>
        </Box>
      </Flex>


      <Grid gap={'4'} align={'center'} justify={'between'} columns="repeat(3,25vw)" >
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <TransactionPie/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <GenderChart/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
      </Grid>

      <Flex justify={'center'} gap={'4'} my={'3'}>
        <Box className="bg-slate-800 w-[30vw] p-5 rounded-lg" >
          <ServiceChart/>
        </Box>
        <Box className="bg-slate-800 w-[45vw] p-5 rounded-lg">
          <LineChartPS/>
        </Box>
      </Flex>

      

      <footer className="fixed bottom-0 right-0 m-4 z-10 w-[100%]">
        <ChatOption/>
      </footer>
    </>
  );
}
