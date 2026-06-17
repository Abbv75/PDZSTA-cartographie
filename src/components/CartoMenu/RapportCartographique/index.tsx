import { Box, Button, ButtonGroup, Checkbox, LinearProgress, Sheet, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { useGetAllRapportCarto } from "hooks/useApi";
import { RAPORT_CARTO_T } from "types";

import { green } from "@mui/material/colors";
import ItemBtn from "./ItemBtn";
import { useFicheStore } from 'store/useFicheStore';
import { useLegendStore } from 'store/useLegendStore';

export default () => {
    const { allRapportCartoSelected, setallRapportCartoSelected } = useFicheStore();
    const { setlegendeSection } = useLegendStore();

    const [isAllCocher, setisAllCocher] = useState(false);
    const { data: res, isLoading } = useGetAllRapportCarto();
    const rapports = (res || []) as RAPORT_CARTO_T[];

    const toutCocherHandle = () => {
        setallRapportCartoSelected(isAllCocher ? [] : rapports.map((item: any) => ({ data: item, color: green[400] })));
        setisAllCocher(!isAllCocher);
    }

    useEffect(
        () => {
            if (rapports.length === 0) return;
            let filtered = rapports.filter((element: any) => allRapportCartoSelected.find(({ data }) => data.code === element.code));
            setallRapportCartoSelected(filtered.map((item: any) => ({ data: item, color: green[400] })));
        },
        [res]
    )

    useEffect(() => {
        if (allRapportCartoSelected.length > 0) {
            const legendContent = (
                <Stack gap={0.5}>
                    {/* <Typography level="h3" >Les rapports cartographiques sélectionnés:</Typography> */}
                    {allRapportCartoSelected.map((item, idx) => (
                        <Stack key={idx} direction="row" alignItems="center" gap={0.5}>
                            {item.color && <Stack width={20} height={20} borderRadius={50} bgcolor={item.color} />}
                            <span style={{ fontSize: 12 }}>{item.data.title}</span>
                        </Stack>
                    ))}
                </Stack>
            );

            setlegendeSection((prev: any) => ({
                ...prev,
                rapportCarto: legendContent
            }));
        } else {
            setlegendeSection((prev: any) => ({
                ...prev,
                rapportCarto: undefined
            }));
        }
    }, [allRapportCartoSelected, setlegendeSection]);

    return (
        <Stack>
            <Sheet
                variant="outlined"
                sx={{
                    p: 1, borderRadius: 10, display: 'flex'
                }}
            >
                <Checkbox
                    checked={isAllCocher}
                    onChange={() => toutCocherHandle()}
                    label={"Tout cocher"}
                    overlay
                />
            </Sheet>

            <ButtonGroup
                orientation="vertical"
                sx={{
                    maxHeight: 200,
                    overflowY: "scroll",
                    pr: 0.5,
                    mt: 1,
                    "& > *": {
                        textOverflow: "ellipsis",
                        borderColor: "white",
                    }
                }}
                variant="soft"
            >
                {isLoading && (<LinearProgress color="success" />)}

                {rapports.map((value: any, index: number) => (
                    <ItemBtn value={value} key={index} />
                ))}

            </ButtonGroup>
        </Stack>
    )
}