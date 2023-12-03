import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QuienSoy from "./QuienSoy";
import Carreras from "./Carreras";
import UAlumni from "./Ualumni";
import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/soft-skills?page=1&per-page=1")
        const response = await data.json()
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  
    fetchData()
  }, []) 
  return (
    <div>
      <NavBar/>
      <UAlumni/>
      <QuienSoy/>
      <Carreras/>
      <Footer/>
    </div>
  );
}
export default LandingPage;
