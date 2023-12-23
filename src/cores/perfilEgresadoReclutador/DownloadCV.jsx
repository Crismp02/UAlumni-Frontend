import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { downloadPDF } from '../../services/profileEgresado/AlumniProfile.services';
import { Stack, Text } from "@chakra-ui/react";

function DownloadCV({email}) {
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleDownload = async () => {
      const blob = await downloadPDF(email);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
  return (
    <Button 
    onClick={handleDownload} 
    as="a" 
    href={pdfUrl} 
    download 
    bg="#007935"
    color="white"
    padding={["3", "4", "5"]}
    borderRadius={["4", "6", "8"]}
    cursor="pointer"
    boxShadow="2px 2px 2px rgba(0, 0, 0, 0.15)"
    _hover={{ bg: "#005e28" }}
    fontSize={["10px", "sm", "md"]}
  >
    <Stack direction={["column", "row"]} spacing={1} alignItems="center" justifyContent="center">
      <Text>Descargar</Text>
      <Text>CV</Text>
    </Stack>
  </Button>
  )
}

export default DownloadCV;