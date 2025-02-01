import { 
    Box, 
    Button, 
    Container, 
    Grid, 
    Typography 
} from "@mui/material";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

interface ContentProps {
    bool: boolean
}

export default function Content({ bool } : ContentProps) {
    const router = useRouter();
    return(
        <Box 
            sx={{ 
                width: '100%', 
                minHeight: '100vh'
            }} 
            className={styles.bg2}
        >
            <Container 
            maxWidth='xl' 
            sx={{ 
                px: {xs: 0, lg: 6}, 
                mt: 1 
            }}
            >
                <Grid 
                    container 
                    justifyContent='space-between' 
                    alignItems='center' 
                    spacing={2}
                >
                    <Grid 
                        item 
                        xs={12} 
                        sx={{ 
                            display: {xs: 'block', sm: 'block', md: 'none'}, 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}
                    >
                        {bool ?
                        <>
                            <Box>
                                <iframe
                                    src="https://drive.google.com/file/d/1yWFi0N2q63B9DZJbZujVEUVyG3G9Lhqu/preview"
                                    frameBorder="0"
                                    title="Loading"
                                    style={{ width: "100%",  height: "280px" }}
                                />
                            </Box>
                        </> : 
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography 
                                    variant="h2"
                                    sx={{ 
                                        fontSize: {xs: '30px', sm: '30px', md: '30px'},
                                        fontWeight: 900, 
                                        color: '#10aee5', 
                                        lineHeight: '1em', 
                                        letterSpacing: '-0.0139em', 
                                        textTransform: {xs: 'uppercase', sm: 'uppercase', md: 'none'} 
                                    }}
                                    textAlign='center'
                                    className={styles.inter}
                                    data-aos="zoom-in" 
                                    data-aos-offset="100" 
                                    data-aos-easing="ease-in-sine"
                                >
                                    MAKISANGGA SA ATING ADBOKASIYA!
                                </Typography>
                            </Box>
                            <Grid 
                                container 
                                direction={{ xs: 'column', sm: 'row' }} 
                                justifyContent='center' 
                                alignItems='center' 
                                spacing={1} 
                                sx={{ mt: 1, px: 10 }}
                            >
                                <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                    <Button 
                                        variant="contained"
                                        sx={{ 
                                            fontSize: '18px', 
                                            textTransform: 'uppercase', 
                                            background: '#ffc841', 
                                            color:'#000', 
                                            fontWeight: 600, 
                                            py: {xs: 1.5, md: 2} 
                                        }}
                                        size="large"
                                        fullWidth
                                        onClick={() => {router.push('/#donate')}}
                                        data-aos="zoom-in" 
                                        data-aos-offset="100" 
                                        data-aos-easing="ease-in-sine"
                                    >
                                        Donate
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                    <Button 
                                        variant="contained"
                                        sx={{ 
                                            fontSize: '18px', 
                                            textTransform: 'uppercase', 
                                            background: '#10aee5', 
                                            fontWeight: 600, 
                                            py: {xs: 1.5, md: 2} 
                                        }}
                                        size="large"
                                        fullWidth
                                        onClick={() => {router.push('/magregister')}}
                                        data-aos="zoom-in" 
                                        data-aos-offset="100" 
                                        data-aos-easing="ease-in-sine"
                                    >
                                        Be a member
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box 
                                sx={{ mt: 3, px: {lg: 10} }} 
                                data-aos="zoom-in" 
                                data-aos-offset="100" 
                                data-aos-easing="ease-in-sine"
                            >
                                <iframe
                                    src="https://drive.google.com/file/d/1yWFi0N2q63B9DZJbZujVEUVyG3G9Lhqu/preview"
                                    frameBorder="0"
                                    title="Loading"
                                    style={{ width: "100%",  height: "350px" }}
                                />
                            </Box>
                        </>
                        }
                    </Grid>
                    <Grid md={5} lg={5}>
                        <Box sx={{ my: 5 }} data-aos="fade-up" data-aos-easing="ease-in-sine">
                            <Typography 
                                variant="h2" 
                                sx={{ 
                                    pl: { xs: 0, sm: 0, md: 4, lg: 2 }, 
                                    fontSize: {xs: '2rem', lg: '3.8rem'}, 
                                    textAlign: {xs: 'center', sm: 'center', md: 'start', lg: 'start'}, 
                                    fontWeight: 900, 
                                    color: '#10aee5', 
                                    lineHeight: '0.9em', 
                                    letterSpacing: '-0.0139em' 
                                }}
                            >
                                DIGNIDAD.
                            </Typography>
                            <Typography 
                                variant="h2" 
                                sx={{ pl: { xs: 0, sm: 0, md: 4, lg: 2 }, 
                                    fontSize: {xs: '2rem', lg: '3.8rem'}, 
                                    textAlign: {xs: 'center', sm: 'center', md: 'start', lg: 'start'}, 
                                    fontWeight: 900, 
                                    color: '#10aee5', 
                                    lineHeight: '0.9em', 
                                    letterSpacing: '-0.0139em' 
                                }}
                            >
                                KARAPATAN.
                            </Typography>
                            <Typography 
                                variant="h2" 
                                sx={{ 
                                    pl: { xs: 0, sm: 0, md: 4, lg: 2 }, 
                                    fontSize: {xs: '2rem', lg: '3.8rem'}, 
                                    textAlign: {xs: 'center', sm: 'center', md: 'start', lg: 'start'}, 
                                    fontWeight: 900, 
                                    color: '#10aee5', 
                                    lineHeight: '0.9em', 
                                    letterSpacing: '-0.0139em' 
                                }}
                            >
                                KINABUKASAN.
                            </Typography>
                        </Box>
                        <Box sx={{ px: 2 }}>
                            <Typography 
                                sx={{ 
                                    px: { xs: 2, sm: 2, md: 2, lg: 2 }, 
                                    my: 3, 
                                    fontWeight: 400, 
                                    color: '#324158', 
                                    fontSize: {xs: '16px', lg: '20px'} 
                                }} 
                                variant="h6"
                            >
                                Ang misyon ng Angkasangga ay ipaglaban ang mga karapatan, pagkilala, at bigyang-lakas ang impormal na sektor—isang sektor na matagal nang hindi nabibigyan ng sapat na pansin at pagkilala.
                            </Typography>
                            <Typography 
                                sx={{ 
                                    px: { xs: 2, sm: 2, md: 2, lg: 2 }, 
                                    my: 3, fontWeight: 400, 
                                    color: '#324158', 
                                    fontSize: {xs: '16px', lg: '20px'} 
                                }} 
                                variant="h6"
                            >
                                Ang layuning gawing negosyante o &quot;nanopreneurs&quot; ang mga impormal na manggagawa at  lumikha ng sistema kung saan kinikilala at sinusuportahan ng gobyerno at batas ang mga indibidwal.
                            </Typography>
                            <Typography 
                                sx={{ 
                                    px: { xs: 2, sm: 2, md: 2, lg: 2 }, 
                                    my: 3, fontWeight: 400, 
                                    color: '#324158', 
                                    fontSize: {xs: '16px', lg: '20px'} 
                                }} 
                                variant="h6"
                            >
                                Sa pamamagitan ng strategic legislation, hangad naming makalikha ng mga likas-kayang kabuhayan para sa mga ordinaryong Pilipino, na magbibigay-daan upang sila&apos;y makaahon sa hirap ng ekonomiya patungo sa pormal na sektor.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid 
                        item 
                        md={6.5} 
                        lg={6.5} 
                        sx={{ 
                            display: {xs: 'none', sm: 'none', md: 'block'}, 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            {bool ?
                            <>
                                <iframe
                                    src="https://drive.google.com/file/d/1yWFi0N2q63B9DZJbZujVEUVyG3G9Lhqu/preview"
                                    frameBorder="0"
                                    title="Loading"
                                    style={{ width: "100%",  height: "400px" }}
                                />
                            </> :
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography 
                                        variant="h2"
                                        sx={{ 
                                            fontSize: {xs: '20px', sm: '30px', md: '30px'},
                                            fontWeight: 900, 
                                            color: '#10aee5', 
                                            lineHeight: '1em', 
                                            letterSpacing: '-0.0139em', 
                                            textTransform: {xs: 'uppercase', sm: 'uppercase', md: 'none'} 
                                        }}
                                        textAlign='center'
                                        data-aos="zoom-in" 
                                        data-aos-offset="100" 
                                        data-aos-easing="ease-in-sine"
                                    >
                                        MAKISANGGA SA ATING ADBOKASIYA!
                                    </Typography>
                                </Box>
                                <Grid 
                                    container 
                                    direction={{ xs: 'column', sm: 'row' }} 
                                    justifyContent='center' 
                                    alignItems='center' 
                                    spacing={1} 
                                    sx={{ mt: 1, px: {lg: 10} }}
                                >
                                    <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                        <Button 
                                            variant="contained"
                                            sx={{ 
                                                fontSize: '18px', 
                                                textTransform: 'uppercase', 
                                                background: '#ffc841', 
                                                color:'#000', 
                                                fontWeight: 600, 
                                                py: {xs: 1.5, md: 2} 
                                            }}
                                            size="large"
                                            fullWidth
                                            onClick={() => {router.push('/#donate')}}
                                            data-aos="zoom-in" 
                                            data-aos-offset="100" 
                                            data-aos-easing="ease-in-sine"
                                        >
                                            Donate
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                        <Button 
                                            variant="contained"
                                            sx={{ 
                                                fontSize: '18px', 
                                                textTransform: 'uppercase', 
                                                background: '#10aee5', 
                                                fontWeight: 600, 
                                                py: {xs: 1.5, md: 2} 
                                            }}
                                            size="large"
                                            fullWidth
                                            onClick={() => {router.push('/magregister')}}
                                            data-aos="zoom-in" 
                                            data-aos-offset="100" 
                                            data-aos-easing="ease-in-sine"
                                        >
                                            Be a member
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box 
                                    sx={{ mt: 3, px: {lg: 10} }} 
                                    data-aos="zoom-in" 
                                    data-aos-offset="100" 
                                    data-aos-easing="ease-in-sine"
                                >
                                    
                                    <iframe
                                        src="https://drive.google.com/file/d/1yWFi0N2q63B9DZJbZujVEUVyG3G9Lhqu/preview"
                                        frameBorder="0"
                                        title="Loading"
                                        style={{ width: "100%",  height: "330px" }}
                                    />
                                </Box>
                            </>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}