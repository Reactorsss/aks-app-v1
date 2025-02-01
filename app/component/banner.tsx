import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from "next/image";
import styles from '../page.module.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Images } from "../ts/images";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

export default function Banner() {
    const router = useRouter();
    const arrBanners = [
        { banner: Images.banner1, alt: 'banner1' },
        { banner: Images.banner2, alt: 'banner2' },
        { banner: Images.banner3, alt: 'banner3' },
        { banner: Images.banner4, alt: 'banner4' },
        { banner: Images.banner5, alt: 'banner5' },
        { banner: Images.banner6, alt: 'banner6' },
        { banner: Images.banner7, alt: 'banner7' },
        { banner: Images.banner8, alt: 'banner8' },
        { banner: Images.banner9, alt: 'banner9' },
        { banner: Images.banner10, alt: 'banner10' },
        { banner: Images.banner11, alt: 'banner11' },
        { banner: Images.banner12, alt: 'banner12' },
        { banner: Images.banner14, alt: 'banner14' },
        { banner: Images.banner15, alt: 'banner15' },
        { banner: Images.banner16, alt: 'banner16' },
        { banner: Images.banner17, alt: 'banner17' },
    ]

    const arrText = [
        { tex: 'Angkas na sa' },
        { tex: 'magandang' },
        { tex: 'bukas!' }
    ]

    const arrSocial = [
        { image: Images.fb, alt: 'Facebook', link: 'https://www.facebook.com/ANGKASanggaTayoNa' },
        { image: Images.insta, alt: 'Instagram', link: 'https://www.instagram.com/angkasangga' },
        { image: Images.viber, alt: 'Viber', link: 'https://invite.viber.com/?g2=AQBgbyyheD5APFNphixf%2BNRcnqF0oUoC0xJJ3Eaipj0ZS2KWkDHWZN%2BJvBzzH9il&fbclid=IwY2xjawFrIppleHRuA2FlbQIxMAABHaP40tu5JDUuaEBZSk3ZwPUm5U0fVGPTFGe6dl94q4mNp1sk6QFtj2MsCw_aem_lnW7ItosYQ9-bq0GEpcazA&lang=en' },
        { image: Images.tele, alt: 'Telegram', link: 'https://t.me/angkasangga' },
    ]
    return(
        <Box className={styles.videoContainer}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: false,
                }}
                navigation={false}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {arrBanners.map((banner, index) => {
                    return(
                        <SwiperSlide key={index}>
                            <Image 
                                alt={banner.alt} 
                                src={banner.banner} 
                                priority sizes="80vw" 
                                style={{ 
                                    width: '100%', 
                                    minHeight: '100%', 
                                    objectFit: 'cover', 
                                    objectPosition: 'center', 
                                    position: 'absolute'}}
                                />
                            <Grid 
                                container 
                                direction='row' 
                                justifyContent='center' 
                                sx={{ 
                                    position: 'absolute', 
                                    width: '100%', 
                                    height: '100%', 
                                    objectfit: 'cover'
                                }}
                            >
                                <Grid xs={12} sm={12} md={6} lg={6} sx={{ zIndex: 1 }}>
                                    <Container sx={{ p: { xs: 2, sm: 4, md: 10, lg: 14 } }}>
                                        {arrText.map((text, index) => {
                                            return(
                                                <Typography 
                                                    variant="h2" 
                                                    sx={{ 
                                                        fontWeight: '900', 
                                                        color: '#ffffff', 
                                                        textTransform: 'uppercase', 
                                                        textAlign: { xs: 'center', sm: 'center', md: 'start' }, 
                                                        fontSize: {xs: '30px', sm: '50px', md: '70px'}, 
                                                        lineHeight: 0.9 
                                                    }}
                                                    key={index}
                                                    data-aos="zoom-in" 
                                                    data-aos-offset="100" 
                                                    data-aos-easing="ease-in-sine"
                                                >
                                                    {text.tex}
                                                </Typography>
                                            )
                                        })}
                                        <Grid 
                                            container 
                                            direction={{ xs: 'column', sm: 'row' }} 
                                            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }} 
                                            alignItems='center' 
                                            sx={{ my: 3 }}
                                        >
                                            <Button 
                                                variant="contained"
                                                sx={{ 
                                                    textTransform: 'uppercase', 
                                                    mb: 1, 
                                                    mr: {xs: 0, sm: 2}, 
                                                    background: '#ffc841', 
                                                    color:'#000', 
                                                    fontWeight: 600, 
                                                    px: 8, 
                                                    py: 2, 
                                                    width: { xs: '238px' } 
                                                }}
                                                size="large"
                                                onClick={() => router.push('/#donate')}
                                                data-aos="zoom-in" 
                                                data-aos-offset="100" 
                                                data-aos-easing="ease-in-sine"
                                            >
                                                Donate
                                            </Button>
                                            <Button 
                                                variant="contained"
                                                sx={{ 
                                                    textTransform: 'uppercase', 
                                                    background: '#10aee5', 
                                                    fontWeight: 600, 
                                                    px: 8, 
                                                    py: 2 
                                                }}
                                                size="large"
                                                onClick={() => router.push('/magregister')}
                                                data-aos="zoom-in" 
                                                data-aos-offset="100" 
                                                data-aos-easing="ease-in-sine"
                                            >
                                                Be a member
                                            </Button>
                                        </Grid>
                                        <Grid 
                                            container 
                                            direction='row' 
                                            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }} 
                                            alignItems='center'
                                        >
                                            {arrSocial.map((data, index) => {
                                                return(
                                                    <Image 
                                                        key={index}
                                                        src={data.image} alt={data.alt}
                                                        style={{ 
                                                            width: '49px', 
                                                            height: '49px', 
                                                            marginRight: '1.5rem', 
                                                            cursor: 'pointer' 
                                                        }} 
                                                        priority sizes="80vw"
                                                        onClick={() => window.open(data.link, '_blank')}
                                                        data-aos="zoom-in-up" 
                                                        data-aos-offset="100" 
                                                        data-aos-easing="ease-in-sine"
                                                    />
                                                )
                                            })}
                                        </Grid>
                                    </Container>
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} sx={{ mt: {lg: 10, md: 15} }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center'
                                    }}>
                                        <Image 
                                            src={Images.eyy} 
                                            alt='eyy' 
                                            style={{ width: '80%', height: 'auto', zIndex: 1 }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box className={styles.overlay}></Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}