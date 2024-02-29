import { useEffect } from "react";
import {fetchDataFromApi} from "./axios/api"
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound"
import Details from "./pages/details/Details";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import SignUp from "./components/loginScreen/SignUp";
import Subscription from "./components/subscription/Subscription";
import { authentication } from "./firebase";
import { login, logout } from "./store/userSlice";
import ProfileScreen from "./components/loginScreen/Profile";
// import LoginScreen from "./components/loginScreen/LoginScreen";

function App() {
const dispatch = useDispatch()
const {url} = useSelector((state) => state.home)
const {user} = useSelector(state => state.user)

useEffect(() => {
  const unSubscribe = authentication.onAuthStateChanged(userAuth => {
    if (userAuth) {
      console.log(userAuth);
      dispatch(login({
        uid: userAuth.uid,
        email: userAuth.email
      }))

    }else{
      dispatch(logout())
    }
  })

  return unSubscribe
},[dispatch])



  useEffect(() => {
    fetchApi()
    genresCall()
  }, [])

  const fetchApi = () => {
    fetchDataFromApi("/configuration")
  .then((res) => {
    
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    }
    dispatch(getApiConfiguration(url))
    console.log(res);
  })
  }
  const genresCall = async() => {
    let promises = []
    let endPoints = ["tv" , "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })

    const data = await Promise.all(promises) 
    console.log(data); 

    data.map(({genres}) => {
      return genres.map((item) => {allGenres[item.id] = item})
    })
    
    dispatch(getGenres(allGenres))
  }
  return (
    <>
    <BrowserRouter>


    <Routes>
      {
        user? (<Route path="/" element= {<Home/>} />) : (
          <Route path="/" element= {<SignUp/>} />
        )
      }
     
      <Route path="/:mediaType/:id" element = {<Details/>} />
      <Route path="/explore/:mediaType" element= {<Explore/>} />
      <Route path="/search/:query" element = {<SearchResult/>} />
      <Route path="*" element= {<PageNotFound/>} />
      <Route path="/login" element= {<SignUp/>} />
      <Route path="/plans" element= {<Subscription/>} />
      <Route path="/profile" element= {<ProfileScreen/>} />
    </Routes>

    <Footer/>
    
      </BrowserRouter>
    </>
  )
}

export default App
