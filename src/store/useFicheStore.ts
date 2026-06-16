import { create } from 'zustand';
import { GET_ALL_FEUILLE, GET_ALL_REQUETE_CARTE_T, RAPORT_CARTO_T } from 'types';

type SetStateAction<T> = T | ((prevState: T) => T);

interface FicheState {
    allRequeteCartoSelected: { icon?: any, data: GET_ALL_REQUETE_CARTE_T }[];
    setallRequeteCartoSelected: (val: SetStateAction<{ icon?: any, data: GET_ALL_REQUETE_CARTE_T }[]>) => void;

    ficheTitleSelected: string[];
    setficheTitleSelected: (val: SetStateAction<string[]>) => void;

    getAllFicheData: null | GET_ALL_FEUILLE;
    setgetAllFicheData: (val: SetStateAction<null | GET_ALL_FEUILLE>) => void;

    ficheDynamiquesData: { title: string, icon: any }[];
    setficheDynamiquesData: (val: SetStateAction<{ title: string, icon: any }[]>) => void;

    allRapportCartoSelected: { data: RAPORT_CARTO_T, color?: string }[];
    setallRapportCartoSelected: (val: SetStateAction<{ data: RAPORT_CARTO_T, color?: string }[]>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useFicheStore = create<FicheState>((set) => ({
    allRequeteCartoSelected: [],
    setallRequeteCartoSelected: createSetter(set, 'allRequeteCartoSelected'),

    ficheTitleSelected: [],
    setficheTitleSelected: createSetter(set, 'ficheTitleSelected'),

    getAllFicheData: null,
    setgetAllFicheData: createSetter(set, 'getAllFicheData'),

    ficheDynamiquesData: [],
    setficheDynamiquesData: createSetter(set, 'ficheDynamiquesData'),

    allRapportCartoSelected: [],
    setallRapportCartoSelected: createSetter(set, 'allRapportCartoSelected'),
}));
