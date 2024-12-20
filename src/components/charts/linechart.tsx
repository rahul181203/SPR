import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import {faker} from "@faker-js/faker"
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Per Date Analysis',
      },
    },
  };
  

  interface transDTO{
    date:string,
    order:number,
    user:number
  }

  export default function LineChart() {

    const [trans,setTrans] = useState<transDTO[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics/orderbydate",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },next:{revalidate:60}
      }).then((res)=>res.json())
      .then((d)=>{setTrans(d);setLoading(false)})
    },[])
    

    const labels = trans.map(item => item.date)

    const data = {
      labels,
      datasets: [
        {
          label: 'Orders Count',
          data: trans.map(item => item.order),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'User Count',
          data: trans.map(item => item.user),
          borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };
    
    if(loading){
      return <>
        <Loading/>
      </>
    }
    return (
      <Line options={options} data={data} />
    );
  }
  