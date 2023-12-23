
import {Text} from "@chakra-ui/react";

export default function TituloListarEgresados() {
  return (
    <div>
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
            ENCUENTRA A TU EGRESADO
      </Text>
    </div>
  )
}
