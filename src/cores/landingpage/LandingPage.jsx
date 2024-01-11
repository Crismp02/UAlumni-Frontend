import { Box } from "@chakra-ui/react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QuienSoy from "./QuienSoy";
import Carreras from "./Carreras";
import UAlumni from "./Ualumni";

function LandingPage() {
  return (
    <Box minHeight="100vh">
      <NavBar />
      <UAlumni />
      <QuienSoy />
      <Carreras />
      <Footer />
    </Box>
  );
}
export default LandingPage;
