import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import {faker} from "@faker-js/faker"
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';


ChartJS.register(BarElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Amount sold Per Day',
      },
    },
};

interface productsCount{
  date: string,
  amount:number,
}

export default function PerDaySales() {

  const [productsData,setProductsData] = useState<productsCount[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics/perdaysales",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },next:{revalidate:60}
      }).then((res)=>res.json())
      .then((d)=>{setProductsData(d);setLoading(false)})
    },[])

  const labels = productsData.map(item => item.date)
  const data = {
    labels,
    datasets: [
      {
        label: 'amount',
        data: productsData.map(item=>item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
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
  return <Bar options={options} data={data} />;
}
