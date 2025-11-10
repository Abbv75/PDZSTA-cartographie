import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Card, Stack, Typography } from '@mui/joy'
import { CardMedia } from '@mui/material'
import { IMAGE } from 'constant'

const Header = () => {
    return (
        <Card sx={{
            borderRadius: 0,
            p: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }} >
            <Stack direction={'row'} alignItems={'center'} width={350} gap={1} >
                <Avatar
                    children={(
                        <CardMedia
                            src={IMAGE.logo}
                            sx={{ width: '100%', height: '100%' }}
                            component={'img'}
                        />
                    )}
                    size='lg'
                />

                <Typography level='title-md' >
                    Programme pour le renforcement de la résilience des petits producteurs
                </Typography>
            </Stack>

            <Button
                children="Ruche"
                size='sm'
                color='success'
                endDecorator={<FontAwesomeIcon icon={faArrowRight} />}
                onClick={() => {
                    window.location.href = 'https://PSFE.fidaburkina.org/plan_localites.php'
                }}
            />

        </Card>
    )
}

export default Header