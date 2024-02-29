import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './trending/Trending'
import Popular from '../popular/Popular'
import TopRated from './topRated/TopRated'
import Header from '../../components/header/Header'

const Home = () => {


  return (


    <div className='homePage' >
      <Header/>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>

    
  )
}

export default Home