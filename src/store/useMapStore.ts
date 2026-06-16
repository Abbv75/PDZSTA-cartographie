import { create } from 'zustand';
import React from 'react';
import { FOND_DE_CARTE } from 'constant';

type SetStateAction<T> = T | ((prevState: T) => T);

interface MapState {
    currentMapSelected: typeof FOND_DE_CARTE[0];
    setcurrentMapSelected: (val: SetStateAction<typeof FOND_DE_CARTE[0]>) => void;

    mapRef: React.RefObject<HTMLDivElement>;

    zoomLevel: number;
    setzoomLevel: (val: SetStateAction<number>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useMapStore = create<MapState>((set) => ({
    currentMapSelected: FOND_DE_CARTE[0],
    setcurrentMapSelected: createSetter(set, 'currentMapSelected'),

    mapRef: React.createRef<HTMLDivElement>(),

    zoomLevel: 6,
    setzoomLevel: createSetter(set, 'zoomLevel'),
}));
