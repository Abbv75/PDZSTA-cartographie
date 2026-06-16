import { useMapEvents } from "react-leaflet"; // Importer useMapEvents
import { useContext } from "react"; // Importer useState
import { useAppStore } from "store/useAppStore";

const MapZoomHandler = () => {
    const { setzoomLevel } = useAppStore();

    useMapEvents({
        zoomend: (event) => {
            setzoomLevel && setzoomLevel(event.target.getZoom());
        },
        load: (event) => {
            setzoomLevel && setzoomLevel(event.target.getZoom());
        }
    });

    return null;
};

export default MapZoomHandler;