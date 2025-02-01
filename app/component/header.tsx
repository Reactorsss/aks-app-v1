import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Images } from "../ts/images";

export default function Header() {
    return(
        <Grid 
          container 
          direction='column' 
          justifyContent='center' 
          alignItems='center'
        >
            <Container sx={{ p: 0, mb: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ 
                        fontWeight: 800, 
                        color: '#10aee5', 
                        mt: 6, 
                        mb: 3, 
                        fontSize: {xs: '30px', sm: '40px'} 
                    }}
                    textAlign='center'
                    data-aos="zoom-in" 
                    data-aos-offset="100" 
                    data-aos-easing="ease-in-sine"
                >
                    MAKISANGGA SA ATING ADBOKASIYA
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ 
                        fontWeight: 300, 
                        color: '#595959', 
                        mb: 3, 
                        fontSize: {xs: '16px', sm: '20px'}, 
                        px: 1 
                    }}
                    textAlign='center'
                >
                    Ang iyong kontribusyon ay gagamitin para ipaglaban ang manggagawang impormal. Gamit ang iyong bank app i-scan lamang ang QR code para makapag-donate. Maraming Salamat po! 
                </Typography>
                <Box>
                    <Image 
                        src={Images.group4} 
                        alt='images' 
                        style={{ 
                        width: '100%', 
                        height: '100vh', 
                        objectFit: 'cover', 
                        objectPosition: 'center' 
                        }} 
                        priority 
                        sizes="80vw"
                    />
                </Box>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='space-between' 
                    alignItems='center' 
                    sx={{ px: 2 }} 
                    spacing={2}
                >
                    <Grid item md={6} lg={6}>
                        <Card 
                            sx={{ p: {xs: 1, sm: 2}, 
                                height: {md: '250px', lg: '250px'}, 
                                borderRadius: {xs: '25px', sm: '50px'}, 
                                border: '1px solid #ff4040', 
                                background: '#ffbfa1', 
                                mb: 1
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ 
                                        fontWeight: 800, 
                                        mb: 2.5, 
                                        fontSize: {xs: '15px', sm: '20px'} 
                                    }}
                                    textAlign='center'
                                >
                                    MAGING ALERTO SA MGA SCAMMER
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontWeight: 400, 
                                        fontSize: {xs: '12px', sm: '15px'} 
                                    }}
                                >
                                    Mag-ingat sa mga scammer o fake volunteers na nagpapakilala o direktang nag-memessage, nagso-solicit, o tumatawag na ginagamit ang pangalan ng Angkasangga Party-list o si Mister Angkas George Royeca. Ang Angkasangga Party-list ay hinding hindi direktang magcchat o tatawag para manghingi ng donasyon. 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Card 
                            sx={{ p: {xs: 1, sm: 2}, 
                            height: {md: '250px', lg: '250px'}, 
                            borderRadius: {xs: '25px', sm: '50px'}, 
                            border: '1px solid #10aee5', 
                            background: '#b3e8fa', 
                            mb: 1 
                        }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ 
                                        fontWeight: 800, 
                                        mb: 2.5, 
                                        fontSize: {xs: '15px', sm: '20px'} 
                                    }}
                                    textAlign='center'
                                >
                                    PROTEKTAHAN ANG SARILI
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontWeight: 400, 
                                        fontSize: {xs: '12px', sm: '15px'} 
                                    }}
                                >
                                    Kung nais mag-donate magtungo lamang sa Angkasangga Party-list , website o Angkasangga Facebook page para kumpirmahin ang tamang donation details.
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontWeight: 400, 
                                        fontSize: {xs: '12px', sm: '15px'} 
                                    }}
                                >
                                    Huwag magpadala ng pera sa mga HINDI kilalang indibidwal. Ang mga Angkasangga volunteers ay HINDI awtorisadong tumanggap ng donasyon.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}