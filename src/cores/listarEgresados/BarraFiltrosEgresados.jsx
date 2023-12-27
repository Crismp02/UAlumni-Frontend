import {Button, 
        Checkbox,
        Drawer,
        DrawerOverlay,
        DrawerContent,
        DrawerHeader,
        IconButton ,  
        } from "@chakra-ui/react";
import {CloseIcon  } from "@chakra-ui/icons";
import FiltrarNombre from "./Filtros/FiltrarNombre";
import FiltrarSkills from "./Filtros/FiltrarSkills/FiltrarSkills";
import FiltrarPositions from "./Filtros/FiltrarPositions";
import FiltrarCarreras from "./Filtros/FiltrarCarreras/FiltrarCarreras";
import FiltrosButtons from "./FiltrosButtons";

function BarraFiltrosEgresados() {
    
    {
        /*Const del Drawer*/
      }
      const { isOpen, onOpen, onClose } = useDisclosure();
      const placement = "left";
           
        {
          /*Busqueda por nombre*/
        }
    return(
        <Button
        backgroundColor="#37B4E3"
        _hover={{ bg: "#247390" }}
        onClick={onOpen}
        style={{
          borderRadius: "30px",
          marginLeft: "10px",
          width: "40px",
          height: "40px",
        }}
        marginBottom="5px"
      >
        <HamburgerIcon color="white" />
      </Button>
    )}
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent paddingLeft="5px" paddingRight="5px">
        <DrawerHeader borderBottomWidth="1px">
          Filtros
          <IconButton icon={<CloseIcon />} onClick={onClose} float="right" />
        </DrawerHeader>

        <DrawerBody>
          {/*Busqueda por nombre*/}
          <FiltrarNombre
            valueName={valueName}
            handleChangeName={handleChangeName}
          />
          {/*Busqueda por habilidad*/}
          <FiltrarSkills
            list={list}
            categoria={categoria}
            setCategoria={setCategoria}
            setCategorias={setCategorias}
            habilidad={habilidad}
            habilidades={habilidades}
            setHabilidades={setHabilidades}
            handleAddCategoria={handleAddCategoria}
            handleHabilidadChange={handleHabilidadChange}
            handleRemoveHabilidad={handleRemoveHabilidad}
            categorias={categorias}
          />

          {/*Busqueda por posiciones de interes*/}
          <FiltrarPositions
            valuePos={valuePos}
            handleChangePos={handleChangePos}
            handleAddPos={handleAddPos}
            listPos={listPos}
            handleRemovePos={handleRemovePos}
          />

          {/*Busqueda por carreras:*/}
          <FiltrarCarreras
            labels={carreras}
            selectedCarrera={selectedCarrera}
            selectedTags={selectedTags}
            handleClick={handleClick}
          />

          {/*Filtros exactos:*/}
          {/* <Checkbox
            marginBottom="10px"
            marginTop="10px"
            isChecked={exactMatch}
            as="b"
            onChange={handleCheckboxChange}
          >
            Filtrar por coincidencia exacta
          </Checkbox> */}
          {/*Botones de búsqueda y reset*/}
          <FiltrosButtons
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            isDisabled={isDisabled}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
            onClose={onClose}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    )
}

export default BarraFiltrosEgresados;