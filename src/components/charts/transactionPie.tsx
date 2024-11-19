import Loading from '@/app/loading';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Transaction Category',
//       },
//     },
// };

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Transaction Category',
    },
  },
};

interface TransactionTypeAnalytics{
  _count: {
      id: number
  },
  transaction_type: string
}

export default function TransactionPie() {

  const [transactionData,settransactionData] = useState<TransactionTypeAnalytics[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
      fetch("/api/analytics",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },next:{revalidate:60}
      }).then((res)=>res.json())
      .then((d)=>{settransactionData(d.transactionAnalysis);setLoading(false)})
    },[])

  const labels = transactionData.map(item => item.transaction_type)
  const data = {
    labels,
    datasets: [
      {
        label: 'Units Sold By Category',
        data: transactionData.map(item=>item._count.id),
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
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

  return <Doughnut options={options} data={data} />;
}
