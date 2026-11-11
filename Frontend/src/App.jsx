import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Team from './Pages/Team/Team'
import Contact from './Pages/Contact/Contact'
import News from './Pages/News/News'
import NewsDetails from './Pages/NewsDetails/NewsDetails'
import Projects from './Pages/Projects/Projects'
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'
import Services from './Pages/Services/Services'
import TeamDetails from './Pages/TeamDetails/TeamDetails'
import FloatingIcons from './Components/FloatingIcons/FloatingIcons'
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails'

function App() {
  return (
    <Router>
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/contact" element={<Contact/>} />


          <Route path="/services" element={<Services/>} />
          <Route path="/services-details" element={<ServiceDetails/>} />

          
          <Route path="/team-details" element={<TeamDetails/>} />


          <Route path="/news" element={<News/>} />
          <Route path="/news-details" element={<NewsDetails/>} />


          <Route path="/projects" element={<Projects/>} />
          <Route path="/project-details" element={<ProjectDetails/>} />
        </Routes>
      </main>

      <Footer />
      <FloatingIcons/>
    </Router>
  )
}

export default App