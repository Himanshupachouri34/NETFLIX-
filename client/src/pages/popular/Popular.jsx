import React, { useState } from 'react'
import "../Home/Home.scss"
import SwitchTabs from '../../components/switchTabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel/Carousel'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'



const Popular = () => {

const [endPoint , setEndPoint] = useState("movie")

const {data , loading} = useFetch(`/${endPoint}/popular`)

const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv")
}

    return (
        
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                < SwitchTabs
                data = {["Movies" , "TV shows"]}
                onTabChange = {onTabChange} />
            </ContentWrapper>
            <Carousel 
            data = {data?.results} 
            loading = {loading}
            endPoint = {endPoint} />
            
        </div>
        

    )
}

export default Popular