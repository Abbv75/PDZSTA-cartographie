import { create } from 'zustand';
import { COMMUNE_T, PROVINCE_T, REGION_T, VILLAGE_T } from 'types';

type SetStateAction<T> = T | ((prevState: T) => T);

interface LocaliteState {
    localiteRegionsSelected: REGION_T[];
    setlocaliteRegionsSelected: (val: SetStateAction<REGION_T[]>) => void;

    localiteDepartementsSelected: PROVINCE_T[];
    setlocaliteDepartementsSelected: (val: SetStateAction<PROVINCE_T[]>) => void;

    localiteCommunesSelected: COMMUNE_T[];
    setlocaliteCommunesSelected: (val: SetStateAction<COMMUNE_T[]>) => void;

    localiteVillagesSelected: VILLAGE_T[];
    setlocaliteVillagesSelected: (val: SetStateAction<VILLAGE_T[]>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

const useZustandLocaliteStore = create<LocaliteState>((set) => ({
    localiteRegionsSelected: [],
    setlocaliteRegionsSelected: createSetter(set, 'localiteRegionsSelected'),

    localiteDepartementsSelected: [],
    setlocaliteDepartementsSelected: createSetter(set, 'localiteDepartementsSelected'),

    localiteCommunesSelected: [],
    setlocaliteCommunesSelected: createSetter(set, 'localiteCommunesSelected'),

    localiteVillagesSelected: [],
    setlocaliteVillagesSelected: createSetter(set, 'localiteVillagesSelected'),
}));

export const useLocaliteStore = () => {
    const store = useZustandLocaliteStore();
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

useLocaliteStore.getState = useZustandLocaliteStore.getState;
useLocaliteStore.setState = useZustandLocaliteStore.setState;
