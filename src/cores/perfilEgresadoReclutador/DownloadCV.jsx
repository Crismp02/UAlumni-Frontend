import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { downloadPDF } from '../../services/profileEgresado/AlumniProfile.services';
import { Stack, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function DownloadCV({id}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    const blob = await downloadPDF(id);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV.pdf';
    link.click();
    setIsLoading(false);
  };

  return (
    <Button 
      onClick={handleDownload} 
      bg="#007935"
      color="white"
      padding={["3", "4", "5"]}
      borderRadius={["4", "6", "8"]}
      cursor="pointer"
      boxShadow="2px 2px 2px rgba(0, 0, 0, 0.15)"
      _hover={{ bg: "#005e28" }}
      fontSize={["10px", "sm", "md"]}
      isLoading={isLoading} 
      loadingText="Descargando..."
    >
      <Stack direction={["column", "row"]} spacing={1} alignItems="center" justifyContent="center">
        <Text>Descargar</Text>
        <Text>CV</Text>
      </Stack>
    </Button>
  )
}

export default DownloadCV;