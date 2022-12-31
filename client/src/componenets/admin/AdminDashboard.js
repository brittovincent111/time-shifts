import React, { useEffect, useState } from 'react'
import { completedWorksGraph, graphPost, userDetails } from '../API/adminApi'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'

function AdminDashboard() {

  const [datas, setDatas] = useState([])
  const [dataas ,setDataas] = useState([])
  const [dashboard, setDashboard] = useState({
    completedCount: "",
    userCount: "",
    totalCount: ""

  })

  /* -------------------------- TASK STATISTICS GRAPH ------------------------- */

  useEffect(() => {

    const graph = async () => {
      try {
        const { data } = await graphPost()
        console.log(data);
        setDatas({
          labels: data.map((obj) => obj._id.status),
          datasets: [{
            label: "counts",
            data: data.map((obj) => obj.count),
            backgroundColor: ["#2a71d0", "#f3ba2f", "#ed3450"],
            borderColor: "black",
            borderWidth: 2,
          }]
        })
       
      } catch (error) {
        console.log(error.message);
      }
    }
    graph()


  }, [])

/* -------------------------- TASK COMPLETED GRAPH -------------------------- */
  useEffect(() => {

  
    const graph = async () => {
      try {
        const { data } = await completedWorksGraph()
        setDataas({
          labels: data.map((obj) => obj._id.date),
          datasets: [{
            label: "counts",
            data: data.map((obj) => obj.count),
            backgroundColor: ["#2a71d0", "#f3ba2f", "#ed3450"],
            borderColor: "black",
            borderWidth: 2,
          }]
        })
     
      } catch (error) {
        console.log(error.message);
      }
    }
    graph()


  }, [])

  /* ---------------------------- DASHBOARD DETAILS --------------------------- */

  useEffect(() => {


    const call = async () => {
      try {

        console.log("called")
        const { data } = await userDetails()

        console.log(data, "hiii")
        setDashboard({ completedCount: data.completedCount,
           userCount: data.userCount,
            totalCount: data.totalCount })

      } catch (error) {
        console.log("error")

      }


    }
    call()

  }, [])



  return (

    <>
      <div className='w-full flex justify-around pt-14'>
        <div className='w-52 h-32 shadow-md rounded-xl flex flex-col justify-center items-center gap-3'>
          <h3 className='text-center text-xl font-semibold '>Total Users</h3>
          <h6 className='text-center  text-xl font-semibold '>{dashboard.userCount}</h6>

        </div>
        <div className='w-52 h-32 shadow-md rounded-xl flex flex-col justify-center items-center gap-3'>
          <h3 className='text-center text-xl font-semibold '>Total Tasks</h3>
          <h6 className='text-center  text-xl font-semibold '>{dashboard.totalCount}</h6>

        </div>
        <div className='w-52 h-32 shadow-md rounded-xl flex flex-col justify-center items-center gap-3'>
          <h3 className='text-center text-xl font-semibold '>Completed Tasks</h3>
          <h6 className='text-center  text-xl font-semibold '>{dashboard.completedCount}</h6>

        </div>

      </div>
      <div className='flex justify-around'>
      <div className='w-1/5  m-16 flex flex-col justify-center shadow-lg'>
        <div className='text-center m-10 text-2xl font-semibold '>Task Statistics</div>
        {
          Object.keys(datas).length != 0 ?
            <PieChart chartData={datas}  /> : null
        }

      </div>
      <div className='w-2/5 h-96 m-16 flex flex-col justify-center shadow-lg'>
        <div className='text-center m-10 text-2xl font-semibold '>Daily Task Completed</div>
        {
          Object.keys(dataas).length != 0 ?
            <LineChart chartData={dataas} /> : null
        }

      </div>
      </div>

    </>
  )
}

export default AdminDashboard