import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'

 function FaqData() {

  return (
    
    <div>

<Accordion allowToggle>

{/*Pregunta 1: */}
<div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
  <AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left' >
        ¿Cómo puedo crear un currículum?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para crear un currículum, debes iniciar sesión en la plataforma y hacer clic en el botón Crear currículum. Se te pedirá que proporciones información sobre tu experiencia laboral, educación y habilidades. También puedes agregar certificaciones y áreas de interés.
    </AccordionPanel>
  </AccordionItem>
  </div>
{/*Pregunta 2: */}
<div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
  <AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left' >
        ¿Cómo puedo editar un currículum existente?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para editar un currículum existente, debes iniciar sesión en la plataforma y hacer clic en el botón Mis currículums. Luego, haz clic en el currículum que deseas editar. Se te darán opciones para editar la información de tu currículum.
    </AccordionPanel>
  </AccordionItem>
</div>
  {/*Pregunta 3: */}
  <div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
  <AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left' >
        ¿Cómo puedo ocultar o hacer visible mi perfil?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para ocultar o hacer visible tu perfil, inicia sesión en la plataforma y 
    haz clic en el botón Mi perfil. Luego, haz clic en el botón Ocultar perfil 
     Mostrar perfil.
    </AccordionPanel>
  </AccordionItem>
  </div>

  {/*Pregunta 4: */}
  <div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
  <AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left'>
        ¿Cómo puedo agregar habilidades a mi perfil?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para agregar habilidades a tu perfil, inicia sesión en la plataforma 
    y haz clic en el botón Mi perfil. Luego, haz clic en la pestaña Habilidades 
    y escribe las habilidades que deseas agregar.
    </AccordionPanel>
  </AccordionItem>
  </div>
{/*Pregunta 5: */}
  <div
          style={{
            paddingTop:"10px",
            paddingBottom:"10px",
          }}
        >
<AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left'>
        ¿Cómo puedo agregar certificaciones a mi perfil?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para agregar certificaciones a tu perfil, inicia sesión en la plataforma 
    y haz clic en el botón Mi perfil. Luego, haz clic en la pestaña Certificaciones
     y proporciona la información de tus certificaciones.
    </AccordionPanel>
  </AccordionItem>
  </div>
{/*Pregunta 6: */}
<div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
<AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left' >
        ¿Cómo puedo ver las descargas de mi currículum?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para ver las descargas de tu currículum, inicia sesión en la 
    plataforma y haz clic en el botón Mi perfil. Luego, haz clic 
    en la pestaña Descargas.
    </AccordionPanel>
  </AccordionItem>
</div>
{/*Pregunta 7: */}
<div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
<AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left'>
        ¿Cómo puedo aplicar a una oferta de trabajo?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Para aplicar a una oferta de trabajo, inicia sesión en 
    la plataforma y haz clic en el botón Ofertas de trabajo. 
    Luego, haz clic en la oferta de trabajo a la que deseas 
    aplicar. Se te pedirá que cargues tu currículum y una carta 
    de presentación.
    </AccordionPanel>
  </AccordionItem>
</div>
{/*Pregunta 8: */}
<div
        style={{
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
<AccordionItem>
    <h2>
      <AccordionButton backgroundColor='white'>
        <Box as="b" flex='1' textAlign='left'>
        ¿Cómo puedo cancelar el envío de mi solicitud de empleo?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} backgroundColor='white'>
    Si deseas cancelar el envío de tu solicitud de empleo, inicia sesión 
    en la plataforma y haz clic en el botón Ofertas de trabajo. Luego, haz 
    clic en la oferta de trabajo a la que solicitaste empleo. Se te pedirá 
    que confirmes que deseas cancelar la solicitud.
    </AccordionPanel>
  </AccordionItem>
  </div>
</Accordion>
    </div>
  )
}

export default FaqData;