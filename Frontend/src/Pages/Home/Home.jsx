import React from 'react'
import HomeMain from '../../Components/HomeMain/HomeMain'
import HomePageTwo from '../../Components/HomePageTwo/HomePageTwo'
import HomePageThree from '../../Components/HomePageThree/HomePageThree'
import HomePageFour from '../../Components/HomePageFour/HomePageFour'
import HomeWhyChoose from '../../Components/HomeWhyChoose/HomeWhyChoose'
import HomeVideo from '../../Components/HomeVideo/HomeVideo'
import HomeSaftey from '../../Components/HomeSaftey/HomeSaftey'
import HomeFaq from '../../Components/HomeFaq/HomeFaq'
import HomeWork from '../../Components/HomeWork/HomeWork'
import HomeTestimonial from '../../Components/HomeTestimonial/HomeTestimonial'
import HomeBlog from '../../Components/HomeBlog/HomeBlog'

const Home = () => {
  return (
    <div>
        <HomeMain/>
        <HomePageTwo/>
        <HomePageThree/>
        <HomePageFour/>
        <HomeWhyChoose/>
        <HomeVideo/>
        <HomeSaftey/>
        <HomeFaq/>
        <HomeWork/>
        <HomeTestimonial/>
        <HomeBlog/>
    </div>
  )
}

export default Home