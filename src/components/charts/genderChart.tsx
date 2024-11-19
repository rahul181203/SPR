import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Loading from '@/app/loading';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gender based orders',
      },
    },
};



export default function GenderChart() {
    
    const [productsData,setProductsData] = useState({})
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
        fetch("/api/analytics/gender",{
          method:"GET",
          headers:{
            "content-type":"application/json"
          },next:{revalidate:60}
        }).then((res)=>res.json())
        .then((d)=>{setProductsData(d);setLoading(false)})
      },[])

      const numbers: number[] = Object.values(productsData);

    const data = {
        labels: ['Female', 'Male'],
        datasets: [
          {
            label: 'no.of orders',
            data: numbers,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
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
    

  return <Doughnut options={options} data={data} />;
}
