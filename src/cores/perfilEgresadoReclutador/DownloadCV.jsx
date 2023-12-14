import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { downloadPDF } from '../../services/profileEgresado/AlumniProfile.services'

function DownloadCV({email}) {
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleDownload = async () => {
      const blob = await downloadPDF(email);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
  return (
    <Button onClick={handleDownload} as="a" href={pdfUrl} download bg="#007935"
    color="white"
    padding="4"
    borderRadius="4"
    cursor="pointer"
    _hover={{ bg: "#005e28" }}>
      Descargar CV
    </Button>
  )
}

export default DownloadCV;