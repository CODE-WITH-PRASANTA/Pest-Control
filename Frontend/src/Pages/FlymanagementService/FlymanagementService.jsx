import React from 'react'
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

import FlymanagementserviceMain from '../../Components/FlymanagementserviceMain/FlymanagementserviceMain'

const FlymanagementService = () => {
  return (
    <div>
        <Breadcrumb
        title="Fly Management"
        subtitle="Professional Fly Management Services to Control Fly Breeding and Ensure a Safe, Hygienic and Pest-Free Environment"
      />
        <FlymanagementserviceMain/>
    </div>
  )
}

export default FlymanagementService