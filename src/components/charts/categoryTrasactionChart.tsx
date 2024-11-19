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
        text: 'Category and Transaction Types',
      },
    },
};

interface productsCount{
  card_count: number,
  cash_count: number,
  category: string
}

export default function CategoryTransaction() {

  const [productsData,setProductsData] = useState<productsCount[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics/trasactionCategory",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },next:{revalidate:60}
      }).then((res)=>res.json())
      .then((d)=>{setProductsData(d);setLoading(false)})
    },[])

  const labels = productsData.map(item => item.category)
  const data = {
    labels,
    datasets: [
      {
        label: 'Card',
        data: productsData.map(item=>item.card_count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Cash',
        data: productsData.map(item=>item.cash_count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
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
