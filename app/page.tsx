'use client';

import { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  Dialog, 
  DialogContent, 
  Grid, 
  Typography 
} from "@mui/material";
import Topbar from "./component/topbar";
import AOS from 'aos';
import Banner from "./component/banner";
import Image from "next/image";
import { Images } from "./ts/images";
import Content from "./component/content";
import styles from './page.module.css';
import Footer from "./component/footer";
import Header from "./component/header";
import { MdOutlineClose } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  const arrBanners = [
    {image: Images.popup1, alt: 'popup1'},
    {image: Images.popup2, alt: 'popup2'},
    {image: Images.popup3, alt: 'popup3'},
    {image: Images.popup4, alt: 'popup4'}
  ]

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    // Scroll to the target section when the page loads
    const sectionId = window.location.hash; // e.g., '#section2'
    if (sectionId) {
      const section = document.querySelector(sectionId);
      if (section) {
        window.open(`/${sectionId}`, '_self')
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Topbar topbool={true} />
      <Banner />
      <Box 
        id="donate" 
        sx={{ 
          width: '100%', 
          minHeight: '100vh', 
          background: '#ecf3fa',
          pb: 5
        }}
      >
        <Header />
      </Box>
      <Content bool={true} />
      <Box id="merch" sx={{ width: '100%', minHeight: '100vh' }} className={styles.bg2}>
        <Container>
          <Typography
            sx={{ fontSize: {xs: '30px', sm: '30px', md: '50px'}, fontWeight: 900, color: '#10aee5', pt: {xs: 3, sm: 5}, mb: 3, lineHeight: '1em', letterSpacing: '-0.0139em' }}
            textAlign='center'
            data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine"
          >
            ANGKASANGGA MERCHANDISE
          </Typography>
          <Typography textAlign='center' sx={{ fontSize: {xs: '14px', sm: '14px', md: '20px'}, my: 3, fontWeight: 400, color: '#595959', lineHeight: '1.3em', letterSpacing: '-0.0139em' }} variant="h6" data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine">
            Maaaring kumontak sa aming ANGKASANGGA Facebook page para makakuha ng ANGKASANGGA merch items! 
          </Typography>
          <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
            <Grid item xs={6} lg={6} data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: {xs: 0, sm: 2, md: 12, lg: 10} }}>
                <Image src={Images.ecomm} alt='Tshirt' style={{ width: '100%', height: 'auto' }} priority sizes="100vw"/>
              </Box>
              <Typography variant="h6" textAlign='center' sx={{ color: '#324158', my: 2, lineHeight: '1em', letterSpacing: '-0.0139em',fontSize: {xs: '12px', sm: '14px', md: '18px'} }}>
                Angkasangga Volunteer Shirts
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{ textTransform: 'none', background: '#10aee5', fontWeight: 600, px: { xs: 2, sm: 8 }, py: 1.5, mb: 3 }}
                  size="large"
                  className={styles.buttonContact}
                  onClick={() => window.open('https://www.facebook.com/ANGKASanggaTayoNa/', '_blank')}
                >
                  Contact Us
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} lg={6} data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: {xs: 0, sm: 2, md: 12, lg: 10} }}>
                <Image src={Images.sleeve} alt='Long Sleeve' style={{ width: '100%', height: 'auto' }} priority sizes="100vw"/>
              </Box>
              <Typography variant="h6" textAlign='center' sx={{ color: '#324158', my: 2, lineHeight: '1em', letterSpacing: '-0.0139em',fontSize: {xs: '12px', sm: '14px', md: '18px'} }}>
                Angkasangga Rider Arm Sleeve
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{  textTransform: 'none', background: '#10aee5', fontWeight: 600, px: { xs: 2, sm: 8 }, py: 1.5, mb: 3 }}
                  size="large"
                  className={styles.buttonContact}
                  onClick={() => window.open('https://www.facebook.com/ANGKASanggaTayoNa/', '_blank')}
                >
                  Contact Us
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="h3"
            sx={{ fontSize: {xs: '30px', sm: '30px', md: '50px'}, fontWeight: 800, color: '#10aee5', pt: {xs: 5}, mb: 5 }}
            textAlign='center'
            data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine"
          >
            DOWNLOADABLES
          </Typography>
          <Grid container justifyContent='center' alignItems='center' spacing={2} sx={{ pb: { xs: 2, lg: 10 } }}>
            <Grid item xs={6} md={4} lg={4} data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: {xs: 1, sm: 1, md: 1} }}>
                <Image src={Images.logoS} alt='Tshirt' style={{ width: '100%', height: 'auto' }} priority sizes="100vw"/>
              </Box>
              <Typography variant="h6" textAlign='center' sx={{ color: '#324158', my: {xs: 1, sm: 2}, lineHeight: '1em', letterSpacing: '-0.0139em',fontSize: {xs: '10px', sm: '18px'} }}>
                Angkasangga Official Logos
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{ textTransform: 'none', background: '#10aee5', fontWeight: 600, px: 8, py: 1, mb: 3 }}
                  size="large"
                  className={styles.buttonContact}
                  href="/download/107 Angkasangga Logos.zip"
                >
                  Download
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={4} data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: {xs: 1, sm: 1, md: 1} }}>
                <Image src={Images.sticker} alt='Long Sleeve' style={{ width: '100%', height: 'auto' }} priority sizes="100vw"/>
              </Box>
              <Typography variant="h6" textAlign='center' sx={{ color: '#324158', my: {xs: 1, sm: 2}, lineHeight: '1em', letterSpacing: '-0.0139em',fontSize: {xs: '10px', sm: '18px'} }}>
                Angkasangga Stickers
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{ textTransform: 'none', background: '#10aee5', fontWeight: 600, px: 8, py: 1, mb: 3 }}
                  size="large"
                  className={styles.buttonContact}
                  href="/download/Angkasangga Stickers.zip"
                >
                  Download
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={4} data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: {xs: 1, sm: 1, md: 1} }}>
                <Image src={Images.fbFrame} alt='Tshirt' style={{ width: '100%', height: 'auto' }} priority sizes="100vw"/>
              </Box>
              <Typography 
                variant="h6" 
                textAlign='center' 
                sx={{ 
                  color: '#324158', 
                  my: {xs: 1, sm: 1}, 
                  lineHeight: '1em', 
                  letterSpacing: '-0.0139em',
                  fontSize: {xs: '10px', sm: '18px'} 
                }}
              >
                Facebook Photo Frame
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{ textTransform: 'none', background: '#10aee5', fontWeight: 600, px: 8, py: 1, mb: 3 }}
                  size="large"
                  className={styles.buttonContact}
                  href="/download/Angkasangga Photo Frame.zip"
                >
                  Download
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
      <Dialog open={open} maxWidth='sm' fullWidth onClose={() => setOpen(false)}>
        <Grid container direction='row' justifyContent='flex-end' sx={{ position: 'absolute', zIndex: 999999 }}>
            <Grid item>
                <MdOutlineClose 
                    size={25} 
                    style={{ cursor: 'pointer', color: '#fff', margin: '1.5rem' }} 
                    onClick={() => {
                      setOpen(false)
                    }}
                />
            </Grid>
        </Grid>
        <DialogContent sx={{ p: {xs: 1, sm: 2} }}>
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
            {arrBanners.map((popup, index) => {
            return(
                <SwiperSlide key={index}>
                <Image 
                    alt={popup.alt} 
                    src={popup.image} 
                    priority 
                    sizes="80vw" 
                    className={styles.popup}
                />
                </SwiperSlide>
            )
            })}
        </Swiper>
        <Box sx={{ my: 3 }}>
            <Typography textAlign='center' sx={{ fontSize: {xs: '20px', sm: '30px'}, fontWeight: 700, letterSpacing: '-0.0089em', color: '#324158', lineHeight: '1.3em', mb: 2 }}>
            Tulungan po ninyo kaming isulong ang ating adbokasiya
            </Typography>
            <Box>
            <Button
                variant="contained"
                size="large"
                sx={{ py: 2 }}
                fullWidth
                onClick={() => {
                  setOpen(false);
                  window.open('/#donate', '_self');
                }}
            >
                Donate
            </Button>
            </Box>
        </Box>
        </DialogContent>
    </Dialog>
    </Box>
  );
}
