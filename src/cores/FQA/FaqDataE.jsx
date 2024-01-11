import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from "@chakra-ui/react";
  
  function FaqDataE() {
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
                  ¿Cómo puedo crear un CV?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para crear un CV, debes registrarte, y luego iniciar sesión en la plataforma.
              Al hacer esto te llevará a la pantalla de perfil, donde podrás completar las secciones que se encuentran disponibles. Debes marcar las casillas de los datos que quieres que se muesntren en tu CV, y después darle click a Descargar CV para generarlo.
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
                  ¿Cómo puedo editar un currículum existente?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para editar un currículum existente, debes dirigirte a la sección de perfil y editar los campos de las secciones que necesites. Marca los datos que quieras que aparezcan en tu CV. 
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
                  ¿Cómo puedo ocultar o hacer visible mi perfil?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para ocultar o hacer visible tu perfil, dirígete a la sección "Perfil", luego marca el switch ubicado en la parte superior derecha para que el estado del perfil sea público.
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
                  ¿Cómo puedo agregar habilidades a mi perfil?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para agregar habilidades a tu perfil, dirígete a la pantalla de "Perfil", luego ubica la sección del tipo de habilidad que deseas añadir (blanda o técnica) y presiona el botón de "+". Ingresa los datos solicitados y presiona "Guardar".
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
                  ¿Cómo puedo ver la cantidad de descargas de mi currículum?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para ver la cantidad de descargas de tu CV, dirígete a la pantalla de "Perfil". Debajo del botón de "Descargar CV" se muestra cuántas veces tu CV ha sido descargado por reclutadores.
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
                ¿Cómo puedo filtrar los resultados de búsqueda de ofertas de trabajo?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
            Puedes filtrar los resultados de búsqueda de acuerdo a los siguientes criterios:
Nombre de la empresa, habilidades técnicas, posiciones de interés, y tipos de contratos.
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
                  ¿Cómo puedo aplicar a una oferta de trabajo?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Para aplicar a una oferta de trabajo, dirígete a la sección de "Ofertas", donde podrás ver todas las que se encuentran disponibles para tu carrera. Presiona "Ver información" para ver más detalles de la oferta. Para aplicar, haz click en "Enviar CV", verifica que tu CV tiene los datos que quieres y presiona el botón de "Aplicar".
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
                  ¿Cómo puedo cancelar el envío de mi aplicación a una oferta de trabajo?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} backgroundColor="white">
              Si, al aplicar a una oferta de trabajo se mostrará una cuenta regresiva de 10 segundos en los que podrás cancelar tu aplicación.
            </AccordionPanel>
          </AccordionItem>
        </div>
      </Accordion>
    );
  }
  
  export default FaqDataE;
  