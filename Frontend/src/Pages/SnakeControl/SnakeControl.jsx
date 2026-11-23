import React from 'react'
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import SnakeControlMain from '../../Components/SnakeControlMain/SnakeControlMain';


const SnakeControl = () => {
  return (
    <div>
        <Breadcrumb
                title="Snake Control"
                subtitle="Safe and Professional Snake Control Services to Locate, Remove, and Prevent Snakes Around Your Property"
                />
                <SnakeControlMain/>
    </div>
  )
}

export default SnakeControl