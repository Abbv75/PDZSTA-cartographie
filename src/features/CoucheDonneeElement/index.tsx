import ShapeFileContainer from 'components/Cartographie/ShapeFileContainer';
import { useAppStore } from "store/useAppStore";
import { useContext } from 'react';

const CoucheDonneeElement = () => {
    const { coucheDeDonneesSelectedListe, coucheDeDonneesElementConfig } = useAppStore();

    return (
        <ShapeFileContainer
            coucheDeDonneesListe={coucheDeDonneesSelectedListe}
            CoucheDonneeKeyToShow={[
                {
                    oldName: 'superficie',
                    newName: 'superficie'
                }
            ]}
            showName={coucheDeDonneesElementConfig.showShapefileName}
            showPopUp={coucheDeDonneesElementConfig.showShapefilePopup}
        />
    )
}

export default CoucheDonneeElement