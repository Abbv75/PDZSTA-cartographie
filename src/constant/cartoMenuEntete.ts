import { faFileAlt, faGears, faMapLocationDot, faPieChart } from "@fortawesome/free-solid-svg-icons";
import { blue, green, orange, red } from "@mui/material/colors";

export const CARTO_MENU_EN_TETE_ZONE = [
    {
        nom: 'Couches de données',
        icon: faMapLocationDot,
        color: red,
    },
    {
        nom: `Fiches de données`,
        icon: faGears,
        color: green,
    },
    {
        nom: 'Fiches dynamiques',
        icon: faFileAlt,
        color: orange,
    },
    {
        nom: 'Rapport cartographique',
        icon: faPieChart,
        color: blue,
    },
];