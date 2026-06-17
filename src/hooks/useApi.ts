import { useQuery } from '@tanstack/react-query';
import getAllFeuille from 'functions/API/feuille/getAllFeuille';
import { getAllRegion } from 'functions/API/region/getAll';
import getAllRequeteCarte from 'functions/API/requeteCartographique/getAllRequeteCarte';
import { getCoucheDonnee } from 'functions/API/coucheDonnee/get';
import getAllRapportCarto from 'functions/API/rapportCarto/getAllRapport';
import getAllIcon from 'functions/API/icon/getAllIcon';

export const useGetAllFeuille = () => {
    return useQuery({
        queryKey: ['feuilles'],
        queryFn: getAllFeuille,
    });
};

export const useGetAllRegion = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: getAllRegion,
    });
};

export const useGetAllRequeteCarte = () => {
    return useQuery({
        queryKey: ['requetesCarte'],
        queryFn: getAllRequeteCarte,
    });
};

export const useGetCoucheDonnee = () => {
    return useQuery({
        queryKey: ['couchesDonnee'],
        queryFn: getCoucheDonnee,
    });
};

export const useGetAllRapportCarto = () => {
    return useQuery({
        queryKey: ['rapportsCarto'],
        queryFn: getAllRapportCarto,
    });
};

export const useGetAllIcon = () => {
    return useQuery({
        queryKey: ['icons'],
        queryFn: getAllIcon,
    });
};
