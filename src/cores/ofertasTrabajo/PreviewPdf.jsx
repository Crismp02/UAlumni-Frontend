import React, { useState } from "react";
import { previewPDF } from "../../services/profileEgresado/AlumniProfile.services";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const PreviewPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePreviewClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
    const blob = await previewPDF();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    }catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al mostrar la vista previa del PDF",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
