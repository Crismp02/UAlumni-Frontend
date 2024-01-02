import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QuienSoy from "./QuienSoy";
import Carreras from "./Carreras";
import UAlumni from "./Ualumni";

function LandingPage() {
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
