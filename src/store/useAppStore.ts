import { create } from 'zustand';
import React from 'react';
import { COMMUNE_T, GET_ALL_FEUILLE, GET_ALL_REQUETE_CARTE_T, PROVINCE_T, RAPORT_CARTO_T, REGION_T, SHAPE_OBJECT_T, VILLAGE_T } from 'types';
import { FOND_DE_CARTE, ICON, COUCHE_DE_DONNEES_LISTE } from 'constant';
import { coucheDeDonneesElementConfig_T } from 'types/AppT';

type SetStateAction<T> = T | ((prevState: T) => T);

interface AppState {
    currentMapSelected: typeof FOND_DE_CARTE[0];
    setcurrentMapSelected: (val: SetStateAction<typeof FOND_DE_CARTE[0]>) => void;

    mapRef: React.RefObject<HTMLDivElement>;

    coucheDeDonneesSelectedListe: SHAPE_OBJECT_T[];
    setcoucheDeDonneesSelectedListe: (val: SetStateAction<SHAPE_OBJECT_T[]>) => void;

    zoomLevel: number;
    setzoomLevel: (val: SetStateAction<number>) => void;

    allRequeteCartoSelected: { icon?: any, data: GET_ALL_REQUETE_CARTE_T }[];
    setallRequeteCartoSelected: (val: SetStateAction<{ icon?: any, data: GET_ALL_REQUETE_CARTE_T }[]>) => void;

    ficheTitleSelected: string[];
    setficheTitleSelected: (val: SetStateAction<string[]>) => void;

    getAllFicheData: null | GET_ALL_FEUILLE;
    setgetAllFicheData: (val: SetStateAction<null | GET_ALL_FEUILLE>) => void;

    ficheDynamiquesData: { title: string, icon: any }[];
    setficheDynamiquesData: (val: SetStateAction<{ title: string, icon: any }[]>) => void;

    legendeSection: {
        coucheDeDonnee?: JSX.Element,
        ficheDeDonnee?: JSX.Element,
        ficheDynamique?: JSX.Element,
        rapportCarto?: JSX.Element
    };
    setlegendeSection: (val: SetStateAction<{
        coucheDeDonnee?: JSX.Element,
        ficheDeDonnee?: JSX.Element,
        ficheDynamique?: JSX.Element,
        rapportCarto?: JSX.Element
    }>) => void;

    localiteRegionsSelected: REGION_T[];
    setlocaliteRegionsSelected: (val: SetStateAction<REGION_T[]>) => void;

    localiteDepartementsSelected: PROVINCE_T[];
    setlocaliteDepartementsSelected: (val: SetStateAction<PROVINCE_T[]>) => void;

    localiteCommunesSelected: COMMUNE_T[];
    setlocaliteCommunesSelected: (val: SetStateAction<COMMUNE_T[]>) => void;

    localiteVillagesSelected: VILLAGE_T[];
    setlocaliteVillagesSelected: (val: SetStateAction<VILLAGE_T[]>) => void;

    addImageIsOpen: boolean;
    setaddImageIsOpen: (val: SetStateAction<boolean>) => void;

    loadIconList: () => Promise<void>;
    setloadIconList: (val: () => Promise<void>) => void;

    iconList: string[];
    seticonList: (val: SetStateAction<string[]>) => void;

    showFiligram: boolean;
    setshowFiligram: (val: SetStateAction<boolean>) => void;

    showShapeFileColorEditer: boolean;
    setshowShapeFileColorEditer: (val: SetStateAction<boolean>) => void;

    ShapeFileColorEditerSubmitFunction?: ((borderColor?: string, backgroundColor?: string, reset?: boolean) => any);
    setShapeFileColorEditerSubmitFunction: (val: SetStateAction<((borderColor?: string, backgroundColor?: string, reset?: boolean) => any) | undefined>) => void;

    ShapeFileColorEditerDefaultValues?: {
        borderColor?: string,
        backgroundColor?: string
    };
    setShapeFileColorEditerDefaultValues: (val: SetStateAction<{ borderColor?: string, backgroundColor?: string } | undefined>) => void;

    allRapportCartoSelected: { data: RAPORT_CARTO_T, color?: string }[];
    setallRapportCartoSelected: (val: SetStateAction<{ data: RAPORT_CARTO_T, color?: string }[]>) => void;

    coucheDeDonneesElementConfig: coucheDeDonneesElementConfig_T;
    setcoucheDeDonneesElementConfig: (val: SetStateAction<coucheDeDonneesElementConfig_T>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

const useZustandStore = create<AppState>((set) => ({
    currentMapSelected: FOND_DE_CARTE[0],
    setcurrentMapSelected: createSetter(set, 'currentMapSelected'),

    mapRef: React.createRef<HTMLDivElement>(),

    coucheDeDonneesSelectedListe: [],
    setcoucheDeDonneesSelectedListe: createSetter(set, 'coucheDeDonneesSelectedListe'),

    zoomLevel: 6,
    setzoomLevel: createSetter(set, 'zoomLevel'),

    allRequeteCartoSelected: [],
    setallRequeteCartoSelected: createSetter(set, 'allRequeteCartoSelected'),

    ficheTitleSelected: [],
    setficheTitleSelected: createSetter(set, 'ficheTitleSelected'),

    getAllFicheData: null,
    setgetAllFicheData: createSetter(set, 'getAllFicheData'),

    ficheDynamiquesData: [],
    setficheDynamiquesData: createSetter(set, 'ficheDynamiquesData'),

    legendeSection: {},
    setlegendeSection: createSetter(set, 'legendeSection'),

    localiteRegionsSelected: [],
    setlocaliteRegionsSelected: createSetter(set, 'localiteRegionsSelected'),

    localiteDepartementsSelected: [],
    setlocaliteDepartementsSelected: createSetter(set, 'localiteDepartementsSelected'),

    localiteCommunesSelected: [],
    setlocaliteCommunesSelected: createSetter(set, 'localiteCommunesSelected'),

    localiteVillagesSelected: [],
    setlocaliteVillagesSelected: createSetter(set, 'localiteVillagesSelected'),

    addImageIsOpen: false,
    setaddImageIsOpen: createSetter(set, 'addImageIsOpen'),

    loadIconList: async () => {},
    setloadIconList: (val) => set({ loadIconList: val }),

    iconList: Object.values(ICON) as string[],
    seticonList: createSetter(set, 'iconList'),

    showFiligram: false,
    setshowFiligram: createSetter(set, 'showFiligram'),

    showShapeFileColorEditer: false,
    setshowShapeFileColorEditer: createSetter(set, 'showShapeFileColorEditer'),

    ShapeFileColorEditerSubmitFunction: undefined,
    setShapeFileColorEditerSubmitFunction: createSetter(set, 'ShapeFileColorEditerSubmitFunction'),

    ShapeFileColorEditerDefaultValues: undefined,
    setShapeFileColorEditerDefaultValues: createSetter(set, 'ShapeFileColorEditerDefaultValues'),

    allRapportCartoSelected: [],
    setallRapportCartoSelected: createSetter(set, 'allRapportCartoSelected'),

    coucheDeDonneesElementConfig: {
        showShapefileName: true,
        showShapefilePopup: false
    },
    setcoucheDeDonneesElementConfig: createSetter(set, 'coucheDeDonneesElementConfig'),
}));

export const useAppStore = () => {
    const store = useZustandStore();
    return {
        ...store,
        localite: {
            region: store.localiteRegionsSelected,
            departement: store.localiteDepartementsSelected,
            commune: store.localiteCommunesSelected,
            village: store.localiteVillagesSelected
        }
    };
};

useAppStore.getState = useZustandStore.getState;
useAppStore.setState = useZustandStore.setState;
