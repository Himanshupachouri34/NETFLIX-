import React from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './profile.scss'
import { authentication } from '../../firebase';

function ProfileScreen() {
const {user} = useSelector(state => state.user)
const navigate = useNavigate()
console.log(user);

const handleClick = () => {
  authentication.signOut()
  navigate('/')
}


  return (
    <div className='profileScreen'>
      
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
         
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
          
          <div className="profileScreen_details">
            <h2> {user?.email} </h2>
        
          <div className="profileScreen_plans">
            <h3>Hey Come Back Soon..</h3>          

            <button
            onClick={handleClick} 
            className='profileScreen_signOut'>
              Sign Out
            </button>
          </div>
          
          </div>
       
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen