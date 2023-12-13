import { Box, Button, Tooltip, useMediaQuery } from "@chakra-ui/react";
import ListarEgresados from "./ListarEgresados";

function FiltrosButtons({
  handleReset,
  handleSubmit,
  isDisabled,
  isHovering,
  setIsHovering,
  setIsFocused,
  onClose,
}) {
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  return (
    <Box
      display="flex"
      flexDirection={isLargerThan435 ? "row" : "column"}
      justifyContent="flex-end"
    >
      <Button
        onClick={handleReset}
        size={isLargerThan435 ? "md" : "sm"}
        marginBottom={isLargerThan435 ? "0px" : "10px"}
        variant="outline"
        marginRight={isLargerThan435 ? "10px" : "0px"}
        backgroundColor="white"
        borderWidth="2px"
        borderColor="#007935"
        color="#007935"
        as="b"
      >
        RESTAURAR FILTROS
      </Button>
      {isLargerThan435 ? (
        <>
          <Tooltip
            label="Para buscar, complete al menos un filtro"
            isOpen={isDisabled && isHovering}
          >
            <Button
              size={isLargerThan435 ? "md" : "sm"}
              onClick={() => {
                handleSubmit();
                onClose();
              }}
              isDisabled={isDisabled}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              d
              backgroundColor="#007935"
              color="white"
              as="b"
              _hover={{ bg: "#025024" }}
            >
              BUSCAR
            </Button>
          </Tooltip>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              handleSubmit();
              onClose();
            }}
            onBlur={() => setIsFocused(false)}
            isDisabled={isDisabled}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            mt={2}
            backgroundColor="#007935"
            color="white"
            as="b"
            _hover={{ bg: "#025024" }}
            fontSize="12px"
            size="sm"
          >
            BUSCAR
          </Button>
        </>
      )}
    </Box>
  );
}

export default FiltrosButtons;
