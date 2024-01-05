import React, { useState } from "react";
import { previewPDF } from "../../services/profileEgresado/AlumniProfile.services";
import { Button } from "@chakra-ui/react";

export const PreviewPdf = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePreviewClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const blob = await previewPDF();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setIsLoading(false);
  };

  return (
    <>
      <Button
        backgroundColor="#37B4E3"
        color="white"
        _hover={{ bg: "#32A2CC" }}
        marginTop="20px"
        onClick={handlePreviewClick}
        isLoading={isLoading}
        loadingText="Generando vista previa..."
      >
        Vista previa del perfil
      </Button>
    </>
  );
};
