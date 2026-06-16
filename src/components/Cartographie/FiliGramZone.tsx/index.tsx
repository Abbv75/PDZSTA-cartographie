import { CardMedia } from '@mui/material'
import { IMAGE } from 'constant'
import { useAppStore } from "store/useAppStore";
import React, { useContext } from 'react'

const FiliGramZone = () => {
    const { showFiligram } = useAppStore()

    if (!showFiligram) {
        return <React.Fragment />
    }

    return (
        <CardMedia
            component={'img'}
            src={IMAGE.logo}
            sx={{
                position: "fixed",
                bottom: 100,
                left: 0,
                height: 100,
                width: 100,
                zIndex: 400,
                bgcolor: "white",
                borderRadius: 100
            }}
        />
    )
}

export default FiliGramZone