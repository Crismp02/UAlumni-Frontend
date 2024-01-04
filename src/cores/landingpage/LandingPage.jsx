import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QuienSoy from "./QuienSoy";
import Carreras from "./Carreras";
import UAlumni from "./Ualumni";
import LoadingSpinner from "../../components/LoadingSpinner";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
      setIsLoading(false);
    }, []);

  return (
    <div>
      <NavBar/>
      {isLoading ? <LoadingSpinner /> : (
        <>
          <UAlumni/>
          <QuienSoy/>
          <Carreras/>
        </>
      )}
      <Footer/>
    </div>
  );
}
export default LandingPage;
