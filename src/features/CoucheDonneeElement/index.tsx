import ShapeFileContainer from 'components/Cartographie/ShapeFileContainer';

import { useContext } from 'react';
import { useDataLayerStore } from 'store/useDataLayerStore';

const CoucheDonneeElement = () => {
    const { coucheDeDonneesSelectedListe, coucheDeDonneesElementConfig } = useDataLayerStore();

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