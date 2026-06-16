import { create } from 'zustand';
import { SHAPE_OBJECT_T } from 'types';
import { coucheDeDonneesElementConfig_T } from 'types/AppT';

type SetStateAction<T> = T | ((prevState: T) => T);

interface DataLayerState {
    coucheDeDonneesSelectedListe: SHAPE_OBJECT_T[];
    setcoucheDeDonneesSelectedListe: (val: SetStateAction<SHAPE_OBJECT_T[]>) => void;

    coucheDeDonneesElementConfig: coucheDeDonneesElementConfig_T;
    setcoucheDeDonneesElementConfig: (val: SetStateAction<coucheDeDonneesElementConfig_T>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useDataLayerStore = create<DataLayerState>((set) => ({
    coucheDeDonneesSelectedListe: [],
    setcoucheDeDonneesSelectedListe: createSetter(set, 'coucheDeDonneesSelectedListe'),

    coucheDeDonneesElementConfig: {
        showShapefileName: true,
        showShapefilePopup: false
    },
    setcoucheDeDonneesElementConfig: createSetter(set, 'coucheDeDonneesElementConfig'),
}));
