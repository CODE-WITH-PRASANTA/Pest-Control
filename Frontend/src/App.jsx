import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Loader from './Components/Loader/Loader'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Team from './Pages/Team/Team'
import Contact from './Pages/Contact/Contact'
import News from './Pages/News/News'
import NewsDetails from './Pages/NewsDetails/NewsDetails'
import Projects from './Pages/Projects/Projects'
import Gallery from './Pages/Gallery/Gallery'
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'
import Services from './Pages/Services/Services'
import TeamDetails from './Pages/TeamDetails/TeamDetails'
import FloatingIcons from './Components/FloatingIcons/FloatingIcons'
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails'
import TermAndCondition from './Pages/TermAndCondition/TermAndCondition'
import PrivicyandPolicy from './Pages/PrivicyandPolicy/PrivicyandPolicy'
import GeneralPestControl from './Pages/GeneralPestControl/GeneralPestControl'
import RodentmanagementService from './Pages/RodentmanagementService/RodentmanagementService'
import BedbugmanagementService from './Pages/BedbugmanagementService/BedbugmanagementService'
import MosquitomanagementService from './Pages/MosquitomanagementService/MosquitomanagementService'
import DisinfectionsanitizationmanagementService from './Pages/DisinfectionsanitizationmanagementService/DisinfectionsanitizationmanagementService'
import AntmanagementService from './Pages/AntmanagementService/AntmanagementService'
import TermitemanagementService from './Pages/TermitemanagementService/TermitemanagementService'
import TermiteControl from './Pages/TermiteControl/TermiteControl'
import SnakeControl from './Pages/SnakeControl/SnakeControl'
import WoodborermanagementService from './Pages/WoodborermanagementService/WoodborermanagementService'
import FlymanagementService from './Pages/FlymanagementService/FlymanagementService'
import BirdmanagementService from './Pages/BirdmanagementService/BirdmanagementService'
import LizardService from './Pages/LizardService/LizardService'
import FoggingService from './Pages/FoggingService/FoggingService'
import LarvicideTritment from './Pages/LarvicideTritment/LarvicideTritment'
import WeedControl from './Pages/WeedControl/WeedControl'
import CommodityPest from './Pages/CommodityPest/CommodityPest'
import SpiderService from './Pages/SpiderService/SpiderService'
import WaspManagementService from './Pages/WaspManagementService/WaspManagementService'
import CockroachService from './Pages/CockroachService/CockroachService'

// Automatically scrolls to top when navigating to a new route
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Use 'instant' if you want it to jump immediately without animation
    })
  }, [pathname])

  return null
}

function App() {
  // Loader shows once when the website opens (3 seconds), then closes smoothly
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader duration={3000} onFinish={() => setLoading(false)} />}

      <Router>
        <ScrollToTop />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services-details" element={<ServiceDetails />} />

            <Route path="/team-details" element={<TeamDetails />} />

            <Route path="/news" element={<News />} />
            <Route path="/blogs/:slug" element={<NewsDetails />} />
            <Route path="/news-details" element={<NewsDetails />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/project-details" element={<ProjectDetails />} />

            <Route path="/terms" element={<TermAndCondition />} />
            <Route path="/privacy" element={<PrivicyandPolicy />} />

            <Route path="/general-pest-control" element={<GeneralPestControl />} />
            <Route path="/cockroach-management-service" element={<CockroachService/>} />
            <Route path="/rodent-management-service" element={<RodentmanagementService />} />
            <Route path="/bedbug-management-service" element={<BedbugmanagementService />} />
            <Route path="/mosquito-management-service" element={<MosquitomanagementService />} />
            <Route
              path="/disinfection-sanitization-management-service"
              element={<DisinfectionsanitizationmanagementService />}
            />
            <Route path="/ant-management-service" element={<AntmanagementService />} />
            <Route path="/termite-post-construction" element={<TermitemanagementService />} />
            <Route path="/termite-control" element={<TermiteControl />} />
            <Route path="/snake-control" element={<SnakeControl />} />
            <Route path="/woodborer-management-service" element={<WoodborermanagementService />} />
            <Route path="/fly-management-service" element={<FlymanagementService />} />
            <Route path="/bird-management-service" element={<BirdmanagementService />} />

            <Route path="/lizard-management-service" element={<LizardService />} />
            <Route path="/fogging-service" element={<FoggingService />} />
            <Route path="/larvicide-treatment" element={<LarvicideTritment />} />
            <Route path="/weed-control" element={<WeedControl />} />
            <Route path="/commodity-pest-management-services" element={<CommodityPest />} />
            <Route path="/spider-management-service" element={<SpiderService />} />
            <Route path="/wasp-management-service" element={<WaspManagementService />} />
          </Routes>
        </main>

        <Footer />
        <FloatingIcons />
      </Router>
    </>
  )
}

export default App