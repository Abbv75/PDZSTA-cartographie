import { Stack } from "@mui/joy"
import Cartographie from "./components/Cartographie"
//@ts-ignore
import "./assets/css/leaflet.css"
import { useEffect } from "react"
import { ICON } from "./constant"
import SideBar from "./components/SideBar"
import { ToastContainer } from "react-toastify"
import CartoMenu from "./components/CartoMenu"

import AddIconForm from "features/AddIconForm"
import { useGetAllIcon } from "hooks/useApi"
import ShapeFileColorEditer from "components/ShapeFileColorEditer"
import { useUIStore } from "store/useUIStore"

export const urlparams = new URLSearchParams(window.location.search);

const App = () => {
  const addImageIsOpen = useUIStore(s => s.addImageIsOpen);
  const setaddImageIsOpen = useUIStore(s => s.setaddImageIsOpen);
  
  const { data: res, refetch } = useGetAllIcon();

  useEffect(() => {
    useUIStore.setState({
      iconList: [
        ...Object.values(ICON),
        ...(res?.map(({ file }: any) => `https://PDZSTA.fidaburkina.org/icon_carto/${file}`) ?? [])
      ]
    });
  }, [res]);

  useEffect(() => {
    useUIStore.setState({
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