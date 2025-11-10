import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Stack, Typography } from '@mui/joy';
import { green } from '@mui/material/colors';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from 'providers';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';
import { LOADING_STATE_T } from 'types';
import { toast } from 'react-toastify';
import ImageEditor from './ImageEditor';

const CaptureZone = () => {
    const { mapRef, setshowFiligram } = useContext(AppContext);
    const [printLoadingState, setprintLoadingState] = useState(null as LOADING_STATE_T);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showEditor, setShowEditor] = useState(false);

    const handleExportMap = useCallback(async () => {
        if (!mapRef.current) return;

        const mapElement = mapRef.current;

        try {
            setshowFiligram && setshowFiligram(true);
            setprintLoadingState('En cours de chargement');

            const dataUrl = await domtoimage.toPng(mapElement, {
                quality: 100,
            });

            setCapturedImage(dataUrl as any);
            setShowEditor(true);

        } catch (error) {
            console.error('Erreur capture:', error);
            toast.error('Erreur lors de la capture de la carte');
        } finally {
            setprintLoadingState(null);
            setshowFiligram && setshowFiligram(false);
        }
    }, [mapRef, setshowFiligram]);

    const handleSaveEditedImage = (blob: any) => {
        saveAs(blob, 'map-edited.png');
        toast.success('Image éditée sauvegardée !');
        setShowEditor(false);
    };

    const handleCancelEdit = () => {
        setShowEditor(false);
    };

    return (
        <Stack
            bgcolor={'whitesmoke'}
            p={1}
            borderRadius={8}
            gap={1}
        >
            <Typography>
                Ceci procédera à une exportation de la carte présente
                dans l'interface ainsi que tous ses éléments affichés.
            </Typography>

            <Button
                onClick={handleExportMap}
                sx={{
                    bgcolor: green[700],
                    color: 'white',
                    ':hover': {
                        bgcolor: green[900],
                    },
                }}
                endDecorator={
                    <FontAwesomeIcon icon={faImage} />
                }
                loading={printLoadingState === 'En cours de chargement'}
            >
                Exporter la carte
            </Button>

            {showEditor && capturedImage && (
                <ImageEditor
                    imageSrc={capturedImage}
                    onSave={handleSaveEditedImage}
                    onCancel={handleCancelEdit}
                />
            )}
        </Stack>
    );
};

export default CaptureZone;