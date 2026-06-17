import { ScaleControl, TileLayer } from "react-leaflet";
import { useContext } from "react";
import { MiniMapControle } from "./MiniMapControle";

import MapZoomHandler from "./MapZoomHandler";
import LegendeZone from "../LegendeZone";
import CompassControl from "./CompassControl";
import EchelleControle from "./EchelleControle";
import FiliGramZone from "../FiliGramZone.tsx";
import { useMapStore } from 'store/useMapStore';

const ConfigZone = () => {
    const { currentMapSelected } = useMapStore();

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={currentMapSelected.url}
            />

            <MiniMapControle />
            <MapZoomHandler />
            <CompassControl />
            <EchelleControle />

            <LegendeZone />

            <FiliGramZone />
        </>
    )
}

export default ConfigZone