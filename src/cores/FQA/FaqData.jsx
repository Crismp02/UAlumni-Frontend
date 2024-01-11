import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function FaqData() {
  return (
    <Accordion allowToggle>
      {/*Pregunta 1: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿De qué sede de la UCAB son los egresados que se muestran en la plataforma?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
            Los egresados encontrados en la plataforma son de la UCAB extensión Guayana.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 2: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Qué información puedo encontrar en los perfiles de los egresados?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
Datos personales: nombre, apellido, carrera y dirección.
Industrias de interés, posiciones de interés, portafolios, idiomas y su nivel de conocimiento, habilidades blandas, experiencia laboral, estudios realizados, habilidades técnicas y certificados de cursos del CIAP.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 3: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Puedo descargar los CV de los egresados?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
          Sí, puede descargar los CV de los egresados. Para hacerlo, haga clic en el botón "Descargar CV" que se encuentra en el perfil del egresado.
          </AccordionPanel>
        </AccordionItem>
      </div>

      {/*Pregunta 4: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Cómo puedo filtrar los resultados de búsqueda?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
          Puede filtrar los resultados de búsqueda de acuerdo a los siguientes criterios:
Nombre, habilidades técnicas, posiciones de interés, industrias de interés y carreras.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 5: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Cómo puedo obtener la información de contacto de los egresados?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
            Puede obetener la información de contacto descargando el CV de su perfil.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 6: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Hay algún costo asociado al uso de la plataforma?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
          No, el uso de la plataforma es gratuito.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 7: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Cuál es la política de privacidad de la plataforma?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
          La política de privacidad de la plataforma se encuentra disponible en la plataforma, en la sección de términos y condiciones, ubicada al final de la página.
          </AccordionPanel>
        </AccordionItem>
      </div>
      {/*Pregunta 8: */}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton backgroundColor="white">
              <Box as="b" flex="1" textAlign="left">
              ¿Cómo puedo obtener ayuda si tengo algún problema con la plataforma?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} backgroundColor="white">
          Puede obtener ayuda si tiene algún problema con la plataforma contactando al equipo de soporte. Para hacerlo, puede enviar un correo electrónico a ualumni.ucab@gmail.com
          </AccordionPanel>
        </AccordionItem>
      </div>
    </Accordion>
  );
}

export default FaqData;
