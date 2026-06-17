import { CardMedia } from '@mui/material'
import { IMAGE } from 'constant'

import React, { useContext } from 'react'
import { useUIStore } from 'store/useUIStore'

const FiliGramZone = () => {
    const { showFiligram } = useUIStore()

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