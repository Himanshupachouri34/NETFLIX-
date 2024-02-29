import React from 'react'
import Plans from '../planScreen/Plans'
import "./style.scss"

const Subscription = () => {
  return (
    <div className='main'>
        <Plans name = {"Basic"} features={["HD Quality","Not 4K Quality", "1 Screen"]} amt={"149 "} />
        <Plans name = {"Standard"} features={["HD Quality","4K Quality", "2 Screen" ]} amt={"199 "}/>
        <Plans name = {"Premium"}features={["HD Quality","4K Quality", "3 Screen" ]} amt={"499 "}/>
        <Plans name = {"Family "}features={["HD Quality","4K Quality", "5 Screen"]}  amt={"999 "} />
    </div>
  )
}

export default Subscription