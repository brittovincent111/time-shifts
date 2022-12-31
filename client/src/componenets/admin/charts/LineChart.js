import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as chartJS} from 'chart.js/auto'

function LineChart({chartData}) {
  return (
    <div>
    <Bar data={chartData}/>
     </div>
  )
}

export default LineChart