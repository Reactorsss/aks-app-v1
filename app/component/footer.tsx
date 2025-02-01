'use client';

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Images } from "../ts/images";

export default function Footer() {
    return(
        <Box id="contact" sx={{ width: '100%', minHeight: '100vh', background: '#10aee5', pt: 3, px: 3 }}>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Grid 
                item xs={12} sm={6} md={5} lg={5} 
                data-aos='fade-right' 
                data-aos-offset="300" 
                data-aos-easing="ease-in-sine">
                    <Grid 
                        container 
                        direction='row' 
                        justifyContent='center' 
                        alignItems='center' 
                        sx={{ display: {xs: 'none', sm: 'none', md: 'flex' } }}
                    >
                        <Box sx={{ position: 'absolute', top: '24.8%', left: '65%', zIndex: 1 }}>
                            <Button onClick={() => window.open('https://www.facebook.com/ANGKASanggaTayoNa', '_blank')}></Button>
                        </Box>
                        <Box sx={{ position: 'absolute', top: '40%', left: '65%', zIndex: 1 }}>
                            <Button onClick={() => window.open('https://www.instagram.com/angkasangga', '_blank')}></Button>
                        </Box>
                        <Box sx={{ position: 'absolute', top: '55%', left: '65%', zIndex: 1 }}>
                            <Button onClick={() => window.open('https://invite.viber.com/?g2=AQBgbyyheD5APFNphixf%2BNRcnqF0oUoC0xJJ3Eaipj0ZS2KWkDHWZN%2BJvBzzH9il&fbclid=IwY2xjawFrIppleHRuA2FlbQIxMAABHaP40tu5JDUuaEBZSk3ZwPUm5U0fVGPTFGe6dl94q4mNp1sk6QFtj2MsCw_aem_lnW7ItosYQ9-bq0GEpcazA&lang=en', '_blank')}></Button>
                        </Box>
                        <Box sx={{ position: 'absolute', top: '71%', left: '65%', zIndex: 1 }}>
                            <Button onClick={() => window.open('https://t.me/angkasangga', '_blank')}></Button>
                        </Box>
                        <Grid 
                            xs={12} sm={8} md={12} lg={12} 
                            item 
                            sx={{ m: {xs: 3, sm: 3, md: 3, lg: 3} }}
                        >
                            <Image 
                                src={Images.rider} 
                                alt='logo' 
                                style={{ width: '100%', height: 'auto', position: 'relative' }} 
                                priority 
                                sizes="80vw"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    xs={12} sm={12} md={7} lg={7} 
                    data-aos='fade-left' 
                    data-aos-offset="300" 
                    data-aos-easing="ease-in-sine"
                >
                    <Card 
                        sx={{ 
                            m: { lg: 8, md: 2, sm: 6, xs: 0}, 
                            p: { xs: 1.5 }, 
                            borderRadius: '20px' 
                        }}
                    >
                        <CardContent>
                            <Typography 
                                variant="h2"
                                sx={{ 
                                    fontSize: {xs: '20px', sm: '30px', md: '50px'},
                                    fontWeight: 900, 
                                    color: '#10aee5', 
                                    lineHeight: '1em', 
                                    letterSpacing: '-0.0139em', 
                                    textTransform: {xs: 'uppercase', sm: 'uppercase', md: 'none'} 
                                }}
                                textAlign='center'
                            >
                                Makisangga sa
                            </Typography>
                            <Typography 
                                variant="h2"
                                sx={{ 
                                    fontSize: {xs: '20px', sm: '30px', md: '50px'}, 
                                    fontWeight: 900, 
                                    color: '#10aee5', 
                                    lineHeight: '1em', 
                                    letterSpacing: '-0.0139em', 
                                    textTransform: {xs: 'uppercase', sm: 'uppercase', md: 'none'} 
                                }}
                                textAlign='center'
                            >
                                ating adbokasiya
                            </Typography>
                            <Grid container direction={{ xs: 'column', sm: 'row' }} justifyContent='center' alignItems='center' spacing={1} sx={{ mt: 1 }}>
                                <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                    <Button 
                                        variant="contained"
                                        sx={{ fontSize: '18px', textTransform: 'uppercase', background: '#ffc841', color:'#000', fontWeight: 600, py: {xs: 1.5, md: 2}, mb: { xs: 1, sm: 1, md: 2} }}
                                        size="large"
                                        fullWidth
                                        onClick={() => window.open('/#donate', '_self')}
                                    >
                                        Donate
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ width: '100%' }}>
                                    <Button 
                                        variant="contained"
                                        sx={{ fontSize: '18px', textTransform: 'uppercase', background: '#10aee5', fontWeight: 600, py: {xs: 1.5, md: 2}, mb: { xs: 1, sm: 1, md: 2} }}
                                        size="large"
                                        fullWidth
                                        onClick={() => window.open('/magregister', '_self')}
                                    >
                                        Be a member
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: 3, mb: 7 }}>
                        <Typography 
                            variant="h3"
                            sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' }, fontWeight: 800, color: '#fff', lineHeight: '1em', letterSpacing: '-0.0139em', mb: 1 }}
                            textAlign='center'
                        >
                            Ikaw ba&apos;y may katanungan?
                        </Typography>
                        <Typography 
                            variant="h5"
                            sx={{ fontSize: { xs: '10px', sm: '20px' }, fontWeight: 400, color: '#fff', lineHeight: '1em', letterSpacing: '-0.0139em' }}
                            textAlign='center'
                        >
                            Mag-email lamang sa <span>volunteer@angkasangga.ph</span>
                        </Typography>
                    </Box>
                </Grid>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='center' 
                    alignItems='center' 
                    sx={{ display: {xs: 'flex', sm: 'flex', md: 'none'} }} 
                    data-aos='fade-right' 
                    data-aos-offset="300" 
                    data-aos-easing="ease-in-sine"
                >
                    <Box sx={{ position: 'absolute', top: '20%', left: '60%', zIndex: 1 }}>
                        <Button onClick={() => window.open('https://www.facebook.com/ANGKASanggaTayoNa', '_blank')}></Button>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '35%', left: '60%', zIndex: 1 }}>
                        <Button onClick={() => window.open('https://www.instagram.com/angkasangga', '_blank')}></Button>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '53%', left: '60%', zIndex: 1 }}>
                        <Button onClick={() => window.open('https://invite.viber.com/?g2=AQBgbyyheD5APFNphixf%2BNRcnqF0oUoC0xJJ3Eaipj0ZS2KWkDHWZN%2BJvBzzH9il&fbclid=IwY2xjawFrIppleHRuA2FlbQIxMAABHaP40tu5JDUuaEBZSk3ZwPUm5U0fVGPTFGe6dl94q4mNp1sk6QFtj2MsCw_aem_lnW7ItosYQ9-bq0GEpcazA&lang=en', '_blank')}></Button>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '69%', left: '60%', zIndex: 1 }}>
                        <Button onClick={() => window.open('https://t.me/angkasangga', '_blank')}></Button>
                    </Box>
                    <Grid 
                        xs={12} sm={8} md={6} lg={12} 
                        item 
                        sx={{ m: {xs: 0, sm: 3, md: 3, lg: 3} }}
                    >
                        <Image 
                            src={Images.rider} 
                            alt='logo' 
                            style={{ width: '100%', height: 'auto' }} 
                            priority 
                            sizes="80vw"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid 
                container 
                direction='row' 
                justifyContent='space-between' 
                alignItems='center'
            >
                <Grid 
                    item 
                    xs={4} sm={5} md={5} lg={5.5}
                >
                    <Typography 
                        variant="h6"
                        sx={{ 
                            fontSize: {xs: '10px', sm: '14px', md: '16px', lg: '20px'}, 
                            fontWeight: 700, 
                            color: '#fff', 
                            lineHeight: '1.2em', 
                            letterSpacing: '-0.0139em', 
                            textAlign: {xs: 'end'} 
                        }}
                    >
                        Maraming Salamat Angkasangga
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2} lg={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image 
                            src={Images.footer} 
                            // src={Images.newlogo2} 
                            alt='logo' 
                            style={{ width: '100px', height: '100px' }} 
                            priority 
                            sizes="80vw"
                        />
                    </Box>
                </Grid>
                <Grid item xs={4} sm={5} md={5} lg={5.5}>
                    <Typography 
                        variant="h6"
                        sx={{ 
                            fontSize: {xs: '10px', sm: '14px', md: '16px', lg: '20px'}, 
                            fontWeight: 700, 
                            color: '#ffffff', 
                            lineHeight: '1.2em', 
                            letterSpacing: '-0.0139em', 
                            textAlign: {xs: 'start'} 
                        }}
                        textAlign='start'
                    >
                        Para sa Manggagawang Impormal
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}