import { Divider, Stack, Typography } from "@mui/joy";
import { blue, green } from "@mui/material/colors";
import { ICON } from "constant";
import { getCustomeIcon } from "helper/getCustomeIcon";
import { getCustomeTextIcon } from "helper/getCustomeTextIcon";
import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";

import { useWorker } from "hooks/useWorker";
import ElementWorker from "../../workers/ElementContainerWorker?worker";
import { PopUpDataItem, ProcessedPoint, WorkerInputData } from "../../workers/ElementContainerWorker";

const ElementContainer = ({
    data,
    fieldKeyListe,
    show = true,
    nomListe,
    icon = ICON.location1,
    markerText
}: {
    data: { [key: string]: any, longitude?: number | string, latitude?: number | string }[],
    fieldKeyListe: { originaleName: string, renamed?: string }[] | '*',
    show: boolean,
    nomListe?: string,
    icon?: string,
    markerText?: {
        field: string,
        color?: string
    }
}) => {
    const [processedPoints, setProcessedPoints] = useState<ProcessedPoint[]>([]);
    const handleWorkerMessage = useCallback((newPointsChunk: ProcessedPoint[]) => {
        console.log('La liste des points recu par le worker:', newPointsChunk);
        setProcessedPoints(prevPoints => [...prevPoints, ...newPointsChunk]);
    }, []);

    const handleWorkerError = useCallback((error: ErrorEvent) => {
        console.error("Worker error:", error);
        toast.error("Erreur lors du traitement des données par le worker.");
    }, []);

    const { postMessage, terminate } = useWorker<WorkerInputData, ProcessedPoint[]>(
        ElementWorker,
        handleWorkerMessage,
        handleWorkerError
    );

    useEffect(() => {
        if (show) {
            setProcessedPoints([]);
            // toast.info(`Compilation des ${nomListe}`);
            postMessage({ data, fieldKeyListe });

            return () => {
                terminate();
            };
        } else {
            setProcessedPoints([]);
            terminate();
        }
    }, [data, show, icon, postMessage, terminate, fieldKeyListe, nomListe]);

    const renderPopupContent = useCallback((popUpData: PopUpDataItem[]) => (
        <Popup>
            <Stack
                gap={1}
                sx={{
                    "& *": {
                        height: "fit-content"
                    }
                }}
                width={300}
            >
                {popUpData.map((item, idx) => (
                    <Fragment key={idx}>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={3}
                        >
                            <Typography
                                maxWidth={"75%"}
                                textColor={blue[600]}
                                fontSize={11}
                                fontWeight={700}
                            >
                                {item.label}
                            </Typography>
                            <Typography
                                textAlign={"right"}
                                minWidth={"25%"}
                                fontSize={11}
                            >
                                {String(item.value ?? '')}
                            </Typography>
                        </Stack>
                        <Divider />
                    </Fragment>
                ))}
            </Stack>
        </Popup>
    ), []);


    useEffect(() => {
        console.log('====================================');
        console.log(processedPoints);
        console.log('====================================');
    }, [processedPoints])

    if (!show) {
        return <></>;
    }

    console.log('Rendering ElementContainer. Current processedPoints count:', processedPoints.length);


    return (
        <>
            {/* Afficher les marqueurs au fur et à mesure qu'ils sont traités */}
            {processedPoints.map((value, index) => (
                <Marker
                    position={value.coor as any}
                    key={index}
                    icon={
                        markerText
                            ? getCustomeTextIcon({
                                text: String(value.popUpData.find(item => item.label === markerText.field)?.value ?? ''),
                                bgcolor: markerText.color || green[600],
                                padding: '5px 10px'
                            })
                            : getCustomeIcon(icon || ICON.location1)
                    }
                >
                    {renderPopupContent(value.popUpData)}
                </Marker>
            ))}
        </>
    );
}

export default ElementContainer;