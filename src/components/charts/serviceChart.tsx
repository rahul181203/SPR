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
        text: 'Services',
      },
    },
};

interface productsCount{
  name:string,
  sum:number
}

export default function ServiceChart() {

  const [productsData,setProductsData] = useState<productsCount[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics/services",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },next:{revalidate:60}
      }).then((res)=>res.json())
      .then((d)=>{setProductsData(d);setLoading(false)})
    },[])

  const labels = productsData.map(item => item.name)
  const data = {
    labels,
    datasets: [
      {
        label: 'Services Used',
        data: productsData.map(item=>item.sum),
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
