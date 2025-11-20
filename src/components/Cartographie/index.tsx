import { MapContainer } from "react-leaflet";
import { Stack } from "@mui/joy";
import { useContext } from "react";
import { AppContext } from "../../providers";
import CurrentVillageElement from "../../features/CurrentVillageElement";
import CurrentCommuneElement from "../../features/CurrentCommuneElement";
import CoucheDonneeElement from "../../features/CoucheDonneeElement";
import ShapeFileContainer from "./ShapeFileContainer";
import { SHAPE_OBJECT_T } from "types";
import { green } from "@mui/material/colors";
import CurrentProvinceElement from "features/CurrentProvinceElement";
import CurrentRegionElement from "features/CurrentRegionElement";
import { COLOR, COUCHE_DE_DONNEES_LISTE, LOCATION } from "constant";
import FicheDeDonneeElement from "features/FicheDeDonneeElement";
import FichesDynamiquesElement from "features/FichesDynamiquesElement";
import ConfigZone from "./ConfigZone";
import LocaliteElement from "features/LocaliteElement";
import Header from "../Header";
import RapportCartoElement from "features/RapportCartoElement";

const Cartographie = () => {
    const {
        mapRef,
        zoomLevel
    } = useContext(AppContext);

    return (
        <Stack
            height={'100%'}
            bgcolor={COLOR.white}
            borderRadius={10}
            direction={"row"}
        >
            <Stack
                width={"100%"}
                height={"100%"}
                ref={mapRef}
            >
                <MapContainer
                    center={LOCATION.bamako as any}
                    zoom={zoomLevel}
                    scrollWheelZoom={true}
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden"
                    }}
                >
                    <ConfigZone />

                    <CurrentVillageElement />

                    <CurrentCommuneElement />

                    <CurrentProvinceElement />

                    <CurrentRegionElement />

                    <CoucheDonneeElement />

                    <FicheDeDonneeElement />

                    <FichesDynamiquesElement />

                    <LocaliteElement />

                    <RapportCartoElement />

                    <ShapeFileContainer coucheDeDonneesListe={[{
                        filePath: COUCHE_DE_DONNEES_LISTE[6].filePath,
                        opacity: 0.08,
                        couleur_c: green[800],
                    } as SHAPE_OBJECT_T]} />

                </MapContainer>
            </Stack>
        </Stack>
    )
}

export default Cartographie;