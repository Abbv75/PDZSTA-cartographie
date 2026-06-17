import { Stack, Typography } from '@mui/joy';
import { memo, useContext } from 'react';

import { Sheet, Switch } from "@mui/joy";
import { useDataLayerStore } from 'store/useDataLayerStore';

export default memo(() => {
    const { coucheDeDonneesElementConfig, setcoucheDeDonneesElementConfig } = useDataLayerStore();

    return (
        <Stack
            bgcolor={'whitesmoke'}
            p={1}
            borderRadius={8}
            gap={1}
        >
            <Typography>
                Accedez à different niveau de configuration de la carte.
            </Typography>

            <Sheet
                variant="outlined"
                sx={{ p: 1, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography>Afficher les noms de couches</Typography>
                <Switch
                    checked={coucheDeDonneesElementConfig.showShapefileName}
                    onChange={() => setcoucheDeDonneesElementConfig((prev) => ({
                        ...prev,
                        showShapefileName: !prev.showShapefileName
                    }))}
                />
            </Sheet>

            <Sheet
                variant="outlined"
                sx={{ p: 1, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography>Afficher les informations des shapefiles</Typography>
                <Switch
                    checked={coucheDeDonneesElementConfig.showShapefilePopup}
                    onChange={() => setcoucheDeDonneesElementConfig((prev) => ({
                        ...prev,
                        showShapefilePopup: !prev.showShapefilePopup
                    }))}
                />
            </Sheet>

        </Stack>
    );
})