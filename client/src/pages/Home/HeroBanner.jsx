import React, { useEffect, useState } from 'react'
import "./HeroBanner.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../components/lazyLoadImage/Img'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {
  const navigate = useNavigate()
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const {url} = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }


  return (
    <div className='heroBanner'>

      <div className="backdrop_image">
        <Img src={background} />
      </div>

    <div className="opacityLayer">

    </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className='title'>Welcome</span>
          <span className='subTitle'> So grab your popcorn, settle into your favorite spot. </span>

          <div className="searchInput">
            <input
              type="text"
              placeholder='Search For a movie or tv show...'
              value={query}
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
            onClick={() =>  navigate(`/search/${query}`)}
            >Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner