import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, LinearProgress, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";

import { LOADING_STATE_T, LOCALITE_REGION_T, SHAPE_OBJECT_T } from "types";
import { useGetAllRegion } from "hooks/useApi";
import { useDataLayerStore } from 'store/useDataLayerStore';
import { useLegendStore } from 'store/useLegendStore';
import { useLocaliteStore } from 'store/useLocaliteStore';

const LocaliteCouche = () => {
    const { coucheDeDonneesSelectedListe } = useDataLayerStore();
    const { setlegendeSection } = useLegendStore();
    const { setlocaliteRegionsSelected, setlocaliteDepartementsSelected, setlocaliteCommunesSelected, setlocaliteVillagesSelected } = useLocaliteStore();

    const { data = [], isLoading } = useGetAllRegion();

    /** Toggle (activer/désactiver) une couche */
    const toogleElementInCoucheDonnesListe = (element: any, type: 'region' | 'departement' | 'commune' | 'village') => {
        switch (type) {
            case 'region':
                setlocaliteRegionsSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_region === element.code_region);
                    if (exists) {
                        return prev.filter((item: any) => item.code_region !== element.code_region);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'departement':
                setlocaliteDepartementsSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_departement === element.code_departement);
                    if (exists) {
                        return prev.filter((item: any) => item.code_departement !== element.code_departement);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'commune':
                setlocaliteCommunesSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_commune === element.code_commune);
                    if (exists) {
                        return prev.filter((item: any) => item.code_commune !== element.code_commune);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'village':
                setlocaliteVillagesSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_village === element.code_village);
                    if (exists) {
                        return prev.filter((item: any) => item.code_village !== element.code_village);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            default:
                break;
        }
    };


    if (isLoading) {
        return (
            <LinearProgress />
        )
    }

    return (
        <Stack gap={1} >
            {(data ? (data as LOCALITE_REGION_T[]) : []).map((region: any, index: number) => (
                <Accordion
                    key={index}
                    sx={{ fontSize: 12, borderRadius: 5, p: 1 }}
                    variant="soft"
                >
                    <AccordionSummary
                        children={
                            <Checkbox
                                label={region.nom_region.toLowerCase()}
                                onClick={() => toogleElementInCoucheDonnesListe(region, 'region')}
                            />
                        }
                    />

                    <AccordionDetails>
                        {region.departements.map((departement: any, index: number) => (
                            <Accordion
                                key={index}
                                sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                            >
                                <AccordionSummary
                                    children={
                                        <Checkbox
                                            label={departement.nom_departement.toLowerCase()}
                                            onClick={() => toogleElementInCoucheDonnesListe(departement, 'departement')}
                                        />
                                    }
                                />

                                <AccordionDetails >
                                    {departement.communes.map((commune: any, index: number) => (
                                        <Accordion
                                            key={index}
                                            sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                                        >
                                            <AccordionSummary
                                                children={
                                                    <Checkbox
                                                        label={commune.nom_commune.toLowerCase()}
                                                        onClick={() => toogleElementInCoucheDonnesListe(commune, 'commune')}
                                                    />
                                                }
                                            />

                                            <AccordionDetails >
                                                <Stack
                                                    key={index}
                                                    sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                                                    gap={1}
                                                >
                                                    {commune.villages.map((village: any, index: number) => (
                                                        <Checkbox
                                                            label={village.nom_village.toLowerCase()}
                                                            onClick={() => toogleElementInCoucheDonnesListe(village, 'village')}
                                                        />
                                                    ))}
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}

                                </AccordionDetails>

                            </Accordion>
                        ))}
                    </AccordionDetails>


                </Accordion>
            ))}

        </Stack>
    );
};

export default LocaliteCouche;
