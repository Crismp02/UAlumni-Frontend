
import { Box, Button, Tooltip, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";

function FiltrosButtons({
  handleReset,
  handleSubmit,
  isDisabled,
  isHovering,
  setIsHovering,
  setIsFocused,
  onClose,
  setHasSearched,
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
                setHasSearched(true);
              }}
              isDisabled={isDisabled}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
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
              setHasSearched(true);
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

//Validación de las props:
FiltrosButtons.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isHovering: PropTypes.bool.isRequired,
  setIsHovering: PropTypes.func.isRequired,
  setIsFocused: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  setHasSearched: PropTypes.func.isRequired,
};
