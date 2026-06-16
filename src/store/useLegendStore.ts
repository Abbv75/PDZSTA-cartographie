import { create } from 'zustand';

type SetStateAction<T> = T | ((prevState: T) => T);

interface LegendState {
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
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useLegendStore = create<LegendState>((set) => ({
    legendeSection: {},
    setlegendeSection: createSetter(set, 'legendeSection'),
}));
