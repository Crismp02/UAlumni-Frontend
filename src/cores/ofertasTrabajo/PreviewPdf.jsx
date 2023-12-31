import React, { useEffect, useState } from "react";
import { previewPDF } from "../../services/profileEgresado/AlumniProfile.services";
import { Button } from "@chakra-ui/react";

export const PreviewPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handlePreviewClick = async (event) => {
    event.preventDefault();
    const blob = await previewPDF();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <>
      <Button
        backgroundColor="#37B4E3"
        color="white"
        _hover={{ bg: "#32A2CC" }}
        marginTop="20px"
        onClick={handlePreviewClick}
      >
        Vista previa del perfil
      </Button>
    </>
  );
};