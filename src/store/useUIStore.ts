import { create } from 'zustand';
import { ICON } from 'constant';

type SetStateAction<T> = T | ((prevState: T) => T);

interface UIState {
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
}

const createSetter = <T,>(set: any, key: string) => (val: SetStateAction<T>) => {
    set((state: any) => ({
        [key]: typeof val === 'function' ? (val as Function)(state[key]) : val
    }));
};

export const useUIStore = create<UIState>((set) => ({
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
}));
