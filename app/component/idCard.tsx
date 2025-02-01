import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { Images } from "../ts/images";
import styles from '../page.module.css';
import { FaFacebook, FaInstagram, FaTiktok, FaViber, FaBasketball } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { useQRCode } from "next-qrcode";

interface IdCardProps {
    profile: any,
    name: string,
    IdNo2: any,
    gender: any,
    street: any,
    brgy: any,
    city: any,
    birthdate: any,
    session: any
}

export default function IdCard({ profile, name, IdNo2, gender, street, brgy, city, birthdate, session } : IdCardProps) {
    const { Canvas } = useQRCode();
    
    return(
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box>
                <Typography 
                    sx={{ my: 2, textTransform: 'uppercase', fontWeight: 600 }} 
                    textAlign='center'
                    className={styles.interFont}
                >
                    Front
                </Typography>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='center' 
                    alignItems='center'
                >
                    <Grid item>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                m: 1, 
                                py: 2, 
                                border: '1px solid #c9c9c9', 
                                width: '400px', 
                                height: '268.8px',
                            }}
                            className={styles.backgroundCard}
                        >
                            <Grid 
                                container 
                                direction='row' 
                                // justifyContent='center' 
                                alignItems='center'
                            >
                                <Grid item sm={6} justifyContent='center'>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                        {profile === 'null' || profile === '' ?
                                            gender === 'Male' ?
                                            // <Image 
                                            //     src={Images.male} 
                                            //     // src={Images.onexone} 
                                            //     alt="male"
                                            //     style={{ border: '1px solid #10aee5' }}
                                            //     width={96} 
                                            //     height={96}
                                            // /> 
                                            <img src={Images.male.src} alt="profile pic" style={{ border: '1px solid #10aee5' }} width={96} height={96} />
                                            : gender === 'Female' ?
                                            // <Image 
                                            //     // src={Images.onexone} 
                                            //     src={Images.female} 
                                            //     alt="female"  
                                            //     style={{ border: '1px solid #10aee5' }}
                                            //     width={96} 
                                            //     height={96} 
                                            // /> 
                                            <img src={Images.female.src} alt="profile pic" style={{ border: '1px solid #10aee5' }} width={96} height={96} />
                                            : 
                                            // <Image                                                                                                                                                                                                                                                                              
                                            // src={Images.onexone} 
                                            // alt="profile pic" 
                                            // style={{ border: '1px solid #10aee5' }}
                                            // width={96} 
                                            // height={96} 
                                            // /> 
                                            <img src={Images.onexone.src} alt="profile pic" style={{ border: '1px solid #10aee5' }} width={96} height={96} />
                                            :
                                            <Image 
                                                src={`data:image/jpeg;base64,${profile}`} 
                                                alt="profile" 
                                                style={{ border: '1px solid #10aee5' }}
                                                width={96} 
                                                height={96} 
                                            />
                                        }
                                    </Box>
                                    <Box sx={{ mt: 3 }}>
                                        <Box>
                                            <Typography 
                                                textAlign='center' 
                                                variant="body1" 
                                                sx={{ textDecoration: 'underline', fontSize: '14px' }}
                                                className={styles.interFont}
                                            >
                                                {name}
                                            </Typography>
                                            <Typography 
                                                textAlign='center' 
                                                variant="body2" 
                                                sx={{ textTransform: 'uppercase', fontSize: '12px' }}
                                                className={styles.interFont}
                                            >
                                                Name
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mt: 1 }}>
                                            <Typography 
                                                textAlign='center' 
                                                variant="body1"
                                            >
                                                _______________
                                            </Typography>
                                            <Typography 
                                                textAlign='center'
                                                sx={{ textTransform: 'uppercase', fontSize: '12px' }}
                                                className={styles.interFont}
                                            >
                                                Signature
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item sm={6}>
                                    <Grid container direction='column' alignContent='center' alignItems='center'>
                                        {/* <Image 
                                            src={Images.idLight} 
                                            alt="logo" 
                                            style={{ width: '75%', height: 'auto' }}
                                        /> */}
                                        <img src={Images.idLight.src} alt="logo" style={{ width: '90%', height: 'auto' }}/>
                                       <Box>
                                            <Typography 
                                                textAlign='center'
                                                sx={{ fontWeight: 800, fontSize: '16px', mt: 2 }}
                                                className={styles.interFont}
                                            >
                                                {IdNo2}
                                            </Typography>
                                       </Box>
                                    </Grid>
                                    {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image 
                                            src={Images.idLogo} 
                                            alt="logo" 
                                            style={{ width: '75%', height: 'auto' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography 
                                            textAlign='center'
                                            sx={{ fontWeight: 800, fontSize: '18px', mt: 2 }}
                                        >
                                            {IdNo2}
                                        </Typography>
                                    </Box> */}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography 
                    sx={{ my: 2, textTransform: 'uppercase', fontWeight: 600 }} 
                    textAlign='center'
                    className={styles.interFont}
                >
                    Back
                </Typography>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='center' 
                    alignItems='center'
                >
                    <Grid item>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                m: 1, 
                                py: 1.5, 
                                border: '1px solid #c9c9c9', 
                                width: '400px', 
                                height: '268.8px', 
                                background: '#ffffff',
                                zIndex: 99999
                            }}>
                            <Grid 
                                container 
                                direction='row' 
                                justifyContent='space-between' 
                                alignItems='center'
                            >
                                <Grid item sm={8} justifyContent='center'>
                                    <Box sx={{ mx: 2 }}>
                                        <Typography className={styles.interFont} textAlign='start' variant="body2" sx={{ mb: 1.5, fontWeight: 600, fontSize: '12px' }}>
                                            Street: <span style={{ fontWeight: 600 }}>{street}</span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mx: 2 }}>
                                        <Typography className={styles.interFont} textAlign='start' variant="body2" sx={{ mb: 1.5, fontWeight: 600, fontSize: '12px' }}>
                                            Barangay: <span style={{ fontWeight: 600 }}>{brgy?.split('&')[1]}</span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mx: 2 }}>
                                        <Typography className={styles.interFont} textAlign='start' variant="body2" sx={{ mb: 1.5, fontWeight: 600, fontSize: '12px' }}>
                                            City/Municipality: <span style={{ fontWeight: 600 }}>{city?.split('&')[1]}</span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mx: 2 }}>
                                        <Typography className={styles.interFont} textAlign='start' variant="body2" sx={{ mb: 1.5, fontWeight: 600, fontSize: '12px' }}>
                                            Birthdate: <span style={{ fontWeight: 600 }}>{birthdate}</span>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sm={4}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Canvas
                                            text={`${process.env.NEXT_PUBLIC_INT_URL_VERIF}/${session}`}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 2,
                                                scale: 5,
                                                width: 120,
                                                color: {
                                                    dark: '#000000',
                                                    light: '#ffffff',
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{ p: 1, background: '#8acaef', width: '100%', height: '135px', borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}>
                                <Grid 
                                    container 
                                    direction='row' 
                                    justifyContent='space-between' 
                                    alignItems='center'
                                    spacing={1}
                                >
                                    <Grid item sm={9} justifyContent='center' alignItems='center'>
                                        <Box sx={{ mx: 1, mb: 2 }}>
                                            <Typography className={styles.interFont} sx={{ fontWeight: 600, fontSize: '12px' }}>Para sa updates, sumali sa mga sumusunod!</Typography>
                                        </Box>
                                        <Grid container direction='row' justifyContent='center' alignItems='start' sx={{ mx: 1 }}>
                                            <Grid sm={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaFacebook />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.4 }}> ANGKASanggaTayoNa</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaTiktok />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.4 }}> angkasangga</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaViber />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.2 }}> bit.ly/AngkasanggaViber</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid sm={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaInstagram />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.2 }}> angkasangga_</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaBasketball />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.2 }}> angkasangga.ph</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <FaTelegram />
                                                    <Typography className={styles.interFont} sx={{ fontSize: '9px', fontWeight: 600, mb: 2, ml: 0.2 }}> bit.ly/AngkasanggaTelegram</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <Image src={Images.idDark} alt="logo" style={{ width: '100%', height: 'auto' }} /> */}
                                            <img src={Images.idDark.src} alt="logo" style={{ width: '100%', height: 'auto' }} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}