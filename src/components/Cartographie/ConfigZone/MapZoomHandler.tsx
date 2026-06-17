import { useMapEvents } from "react-leaflet"; // Importer useMapEvents
import { useContext } from "react"; // Importer useState
import { useMapStore } from 'store/useMapStore';


const MapZoomHandler = () => {
    const { setzoomLevel } = useMapStore();

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