import Loading from '@/app/loading';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Units Sold By Category',
      },
    },
};

interface productsCount{
  _sum: {
      units_sold: number,
      total_units: number
  },
  _count: {
      id: number
  },
  category: string
}

export default function PieChart() {

  const [productsData,setProductsData] = useState<productsCount[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
      }).then((res)=>res.json())
      .then((d)=>{setProductsData(d.productsCount);setLoading(false)})
    },[])

  const labels = productsData.map(item => item.category)
  const data = {
    labels,
    datasets: [
      {
        label: 'Units Sold By Category',
        data: productsData.map(item=>item._sum.units_sold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  if(loading){
    return <>
      <Loading/>
    </>
  }
  return <Pie options={options} data={data} />;
}
