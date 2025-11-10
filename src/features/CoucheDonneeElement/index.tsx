import ShapeFileContainer from 'components/Cartographie/ShapeFileContainer';
import { AppContext } from 'providers';
import { useContext } from 'react';

const CoucheDonneeElement = () => {
    const { coucheDeDonneesSelectedListe, coucheDeDonneesElementConfig } = useContext(AppContext);

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