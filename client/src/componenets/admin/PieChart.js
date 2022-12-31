import React from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as chartJS} from 'chart.js/auto'

function PieChart({chartData}) {
  return (
    <div className=''>
    <Pie data={chartData}/>
     </div>
  )
}

export default PieChart