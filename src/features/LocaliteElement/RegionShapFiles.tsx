import { blue } from '@mui/material/colors';
import ShapeFileContainer from 'components/Cartographie/ShapeFileContainer';
import { REACT_APP_SHAPE_FILE_URL } from 'constant';

import { useLocaliteStore } from 'store/useLocaliteStore';
import { useDataLayerStore } from 'store/useDataLayerStore';

const RegionShapFiles = () => {
    const { localite } = useLocaliteStore();
    const { coucheDeDonneesElementConfig } = useDataLayerStore();

    return (
        <ShapeFileContainer
            coucheDeDonneesListe={localite.region.map(value => ({
                filePath: `${REACT_APP_SHAPE_FILE_URL}/${value.code_region}.zip`,
                opacity: 0.002,
                couleur_c: value.couleur ?? blue[700],
                name: value.nom_region,
                couleur: blue[700],
                textBgColor: blue[700],
                fontSize : 12
            }))}
            showName={coucheDeDonneesElementConfig.showShapefileName}
            showPopUp={coucheDeDonneesElementConfig.showShapefilePopup}
            //@ts-ignore
            CoucheDonneeKeyToShow={'*'}
        />
    )
}

export default RegionShapFiles