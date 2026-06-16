import { Stack } from "@mui/joy"
import Cartographie from "./components/Cartographie"
//@ts-ignore
import "./assets/css/leaflet.css"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { COUCHE_DE_DONNEES_LISTE, FOND_DE_CARTE, ICON } from "./constant"
import SideBar from "./components/SideBar"
import { ToastContainer } from "react-toastify"
import CartoMenu from "./components/CartoMenu"
import { COMMUNE_T, GET_ALL_FEUILLE, GET_ALL_REQUETE_CARTE_T, PROVINCE_T, RAPORT_CARTO_T, REGION_T, VILLAGE_T } from "types"
import { useAppStore } from "store/useAppStore";
import AddIconForm from "features/AddIconForm"
import { useGetAllIcon } from "hooks/useApi"
import Header from "components/Header"
import ShapeFileColorEditer from "components/ShapeFileColorEditer"
import { coucheDeDonneesElementConfig_T } from "types/AppT"


export const urlparams = new URLSearchParams(window.location.search);

const App = () => {
  const addImageIsOpen = useAppStore().addImageIsOpen;
  const setaddImageIsOpen = useAppStore().setaddImageIsOpen;
  
  const { data: res, refetch } = useGetAllIcon();

  useEffect(() => {
    useAppStore.setState({
      iconList: [
        ...Object.values(ICON),
        ...(res?.map(({ file }: any) => `https://PDZSTA.fidaburkina.org/icon_carto/${file}`) ?? [])
      ]
    });
  }, [res]);

  useEffect(() => {
    useAppStore.setState({
      loadIconList: async () => {
        await refetch();
      }
    });
  }, [refetch]);

  return (
      <Stack
        height={"100vh"}
      >
        <ToastContainer position="top-center" />

        {/* <Header /> */}

        <SideBar />

        <ShapeFileColorEditer />

        <CartoMenu />

        <Cartographie />

        <AddIconForm isOpen={addImageIsOpen} setIsOpen={setaddImageIsOpen} />

      </Stack>
  )
}

export default App