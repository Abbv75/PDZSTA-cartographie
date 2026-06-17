import { create } from 'zustand';
import { CARTO_MENU_EN_TETE_ZONE } from 'constant';

type SetStateAction<T> = T | ((prevState: T) => T);

interface MenuState {
    currentMenu: typeof CARTO_MENU_EN_TETE_ZONE[0];
    setcurrentMenu: (val: SetStateAction<typeof CARTO_MENU_EN_TETE_ZONE[0]>) => void;

    cartoMenuIsOpen: boolean;
    setcartoMenuIsOpen: (val: SetStateAction<boolean>) => void;
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useMenuStore = create<MenuState>((set) => ({
    currentMenu: CARTO_MENU_EN_TETE_ZONE[0],
    setcurrentMenu: createSetter(set, 'currentMenu'),

    cartoMenuIsOpen: false,
    setcartoMenuIsOpen: createSetter(set, 'cartoMenuIsOpen'),
}));
