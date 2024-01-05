import React, { useState, useEffect } from "react";
import { Text, Box, Button } from "@chakra-ui/react";
import NavBarEgresados from "../../components/NavBarEgresados";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CompanyCard from "./CompanyCard";
import InfoOfferCard from "./InfoOfferCard";
import InfoPuestoCard from "./InfoPuestoCard";
import { getJobOffer } from "../../services/job-offers/Job-offers.services";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons'

function OfertaTrabajo() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [dataJobOffer, setDataJobOffer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          const result = await getJobOffer(id);
          setDataJobOffer(result);
          setIsLoading(false);
        }
    
        fetchData();
      }, []);

    return (
        <>
      <Box
       style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
      }}
      >
        <Box flex="1">
        <NavBarEgresados />
        {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <Text
            fontSize={["lg", "lg", "xl", "4xl"]}
            color="black"
            textAlign="center"
            as="b"
            paddingTop={["2px", "2px", "2px", "10px"]}
            marginTop="10px"
            marginBottom="10px"
            style={{
              textDecoration: "underline",
              textDecorationColor: "green",
              display: "flex",
              justifyContent: "center",
            }}
          >
            OFERTA DE TRABAJO
          </Text>
          <Button onClick={() => navigate(-1)} width="80px"><ArrowBackIcon/> <Text fontSize="11px">Volver</Text> </Button>
          <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
              width={{ base: "100%", md: "33.3%" }}
              height="100%"
              marginRight={{ base: "0", md: "20px" }}
              marginBottom="20px"
              marginLeft={{ base: "0", md: "20px" }}
              position="relative"
            >
                <CompanyCard cardData={dataJobOffer && dataJobOffer.data}/>
                <InfoOfferCard cardData={dataJobOffer && dataJobOffer.data}/>
            </Box>
            <Box
              width={{ base: "100%", md: "66.6%" }}
              marginBottom="20px"
              position="relative"
              marginRight={{ base: "0", md: "20px" }}
            >
                <InfoPuestoCard cardData={dataJobOffer && dataJobOffer.data}/>
            </Box>
            </Box>
        </>
     )}
     </Box>
     <Footer />
      </Box>
      </>
    );
  }
  
  export default OfertaTrabajo;
  