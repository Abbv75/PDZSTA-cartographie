import { blue } from '@mui/material/colors';
import ShapeFileContainer from 'components/Cartographie/ShapeFileContainer';
import { REACT_APP_SHAPE_FILE_URL } from 'constant';
import { AppContext } from 'providers';
import { useContext } from 'react';

const ProvinceShapFiles = () => {
    const { localite, coucheDeDonneesElementConfig} = useContext(AppContext);

    return (
        <ShapeFileContainer
            coucheDeDonneesListe={localite.departement.map(value => ({
                filePath: `${REACT_APP_SHAPE_FILE_URL}/${value.code_departement}.zip`,
                opacity: 0.002,
                couleur_c: blue[700],
                name: value.nom_departement,
                textBgColor : blue[700]
            }))}
            showName={coucheDeDonneesElementConfig.showShapefileName}
            showPopUp={coucheDeDonneesElementConfig.showShapefilePopup}
            //@ts-ignore
            CoucheDonneeKeyToShow={'*'}
        />
    )
}

export default ProvinceShapFiles