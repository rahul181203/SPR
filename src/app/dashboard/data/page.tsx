"use client"
import DonutChart from "@/components/charts/donutchart";
import LineChart from "@/components/charts/linechart";
import PieChart from "@/components/charts/piechart";
import { Box, Heading, Text, Flex, Grid } from "@radix-ui/themes";

export default function Data() {
  return (
    <>
      <Flex align={'center'} justify={'between'}>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Total Sales</Text>
          <Heading>$32</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>New Customers</Text>
          <Heading>5</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Previous Day Sales</Text>
          <Heading>$32</Heading>
        </Box>
        <Box p={"4"} className="bg-slate-800 w-1/5 inline-block rounded-lg flex-col gap-2">
          <Text>Most Sold Item</Text>
          <Heading>asdfg</Heading>
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
      <Grid gap={'4'} align={'center'} justify={'between'} columns="repeat(3,25vw)" >
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
        <Box className="bg-slate-800 w-[25vw] p-5 rounded-lg">
          <DonutChart/>
        </Box>
      </Grid>
    </>
  );
}
