'use client';

import React, { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Container, 
    CssBaseline, 
    Dialog, 
    DialogContent,
    Grid, 
    Typography 
} from "@mui/material";
import { 
    FaPlay, 
    FaShare, 
    FaFacebook, 
    FaTwitter, 
    FaPinterest, 
    FaTumblr, 
    FaEnvelope 
} from "react-icons/fa6";
import { Images } from "@/app/ts/images";
import styles from '../../page.module.css';
import Content from "@/app/component/content";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Footer from "@/app/component/footer";
import { MdOutlineClose } from "react-icons/md";
import AOS from "aos";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Topbar from "@/app/component/topbar";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<unknown>;},
    ref: React.Ref<unknown>,) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Adbokasiya() {
    const [openShare, setOpenShare] = useState<boolean>(false)
    const [video, setOpenVideo] = useState<boolean>(false)
    const [fb, setFb] = useState<string>('')
    const [x, setX] = useState<string>('')
    const [pin, setPin] = useState<string>('')
    const [tumb, setTumb] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [watch, setWatch] = useState<string>('')

    const arrImages = [
        { image: Images.driver, title: 'Tricycle Driver' },
        { image: Images.courier, title: 'Delivery Courier' },
        { image: Images.delivery, title: 'Food Delivery Riders' },
        { image: Images.magsasaka, title: 'Magsasaka' },
        { image: Images.magwawalis, title: 'Magwawalis' },
        { image: Images.mangingisda, title: 'Mangingisda' },
        { image: Images.pedicab, title: 'Padyak/Pedicab Drivers' },
        { image: Images.tindero, title: 'Tindero/Market Vendors' },
        { image: Images.rider1, title: 'Motorcycle Taxi Riders' },
        { image: Images.vendor, title: 'Street Vendors' },
        { image: Images.rider2, title: 'Motorcycle Riders' }
    ]

    const arrNews = [
        { 
            image: Images.news, 
            title: 'Ang Kasangga partylist first nominee and Angkas CEO George Royeca', 
            text: 'Ang Kasangga partylist first nominee and Angkas CEO George Royeca participates in...' ,
            link: 'https://www.facebook.com/PhilippineSTAR/posts/pfbid035BLUX13Tr39ZmPfR2JhVAzbbucVzdjCrWAvKeE8By9bPFtLDJnVMFJTp48FS5BJ9l?rdid=Ee9JoEcc6UWOuseE'
        },
        { 
            image: Images.news4, 
            title: 'Peddler of Hope: A misunderstood majority', 
            text: 'The informal sector is a force that propels everyday life in our communities. Market...',
            link: 'https://www.philstar.com/opinion/2024/10/01/2389173/misunderstood-majority?fbclid=IwY2xjawGtpZ5leHRuA2FlbQIxMAABHbFdt__0At3Kjc0gwuEGbMO1OfeHUFvDcmlgkvFkIq656iUzFa9sYYAtgw_aem_moWiS6n5ZzrmC7IFcAOXWA'
        },
        { 
            image: Images.news2, 
            title: 'Angkas boss running for Congress', 
            text: 'George Royeca, CEO of ride hailing app Angkas, has thrown his hat into the political ...', 
            link: 'https://www.manilatimes.net/2024/09/20/news/national/angkas-boss-running-for-congress/1972624'
        },
        { 
            image: Images.news3, 
            title: 'My personal journey to empower informal workers', 
            text: `I'll be honest – I didn’t want to do this. The idea of running for public office...`,
            link: 'https://www.philstar.com/opinion/2024/09/17/2385771/my-personal-journey-empower-informal-workers'
         },
        { 
            image: Images.news4, 
            title: 'Lessons from Angkas on developing apps for global impact', 
            text: 'In the vibrant and rapidly evolving world of entrepreneurship, leveraging technology is...',
            link: 'https://www.philstar.com/opinion/2024/09/03/2382410/building-scale-lessons-angkas-developing-apps-global-impact?fbclid=IwY2xjawFiG1lleHRuA2FlbQIxMAABHZFAs6BVPgTPjeroF-M3PBb_cm59v2Y9M1ZjgsEgUsmXcNsZG5tWOw6uzg_aem_MHRr1HcyBPG9nXDiCS-Etg'
        },
        { 
            image: Images.news4, 
            title: 'EXTENDED : Deadline for Reactivation', 
            text: 'May oras ka pa hanggang September 25, 2024 para magpa-reactivate online...',
            link: 'https://www.facebook.com/comelec.ph/posts/pfbid02xoejahyUUvbbVPdF2i5bD8mFy5EYFe4aum7FfTJ6KRbDJ5HAa2R7MCkfFmqQCrJ4l'
        },
        { 
            image: Images.news4, 
            title: 'Bagong Pilipinas Serbisyo Fair sa Batangas!', 
            text: 'Isang malaking prebilehiyo pong masaksihan ang napakagandang programa na...' 
        }
    ]

    const arrVideo = [
        {
            video: '01 - Rogeliodelacruz.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-a24ae8bf-e39a-403d-bc34-4ba5d3a12bcc&t=Wix%20Pro%20Gallery',
            twitter: 'https://x.com/intent/tweet?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-a24ae8bf-e39a-403d-bc34-4ba5d3a12bcc&amp;text=Wix%20Pro%20Gallery&amp;hashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional',
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-a24ae8bf-e39a-403d-bc34-4ba5d3a12bcc&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_2d8b757e1e3e4601b727d8df2520e9e2f003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_2d8b757e1e3e4601b727d8df2520e9e2f003.jpg&description=Wix%20Pro%20Gallery',
            tumblr: 'http://www.tumblr.com/share/link?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-a24ae8bf-e39a-403d-bc34-4ba5d3a12bcc',
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-a24ae8bf-e39a-403d-bc34-4ba5d3a12bcc'
        },
        {
            video: '02 - Victoraquino.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-ddb03e3f-8312-40ef-b629-762c7735eb04&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-ddb03e3f-8312-40ef-b629-762c7735eb04&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-ddb03e3f-8312-40ef-b629-762c7735eb04&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            tumblr: 'http://www.tumblr.com/share/link?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-ddb03e3f-8312-40ef-b629-762c7735eb04', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-ddb03e3f-8312-40ef-b629-762c7735eb04'
        },
        {
            video: '03 - Ruelolayres.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-3db7cc6e-1569-4c08-9dbd-364017696857&t=Wix%20Pro%20Gallery', 
            twitter: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-3db7cc6e-1569-4c08-9dbd-364017696857&t=Wix%20Pro%20Gallery', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-3db7cc6e-1569-4c08-9dbd-364017696857&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_4a58165fb9334445a01afeac888d9269f003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_4a58165fb9334445a01afeac888d9269f003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'http://www.tumblr.com/share/link?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-3db7cc6e-1569-4c08-9dbd-364017696857', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-3db7cc6e-1569-4c08-9dbd-364017696857'
        },
        {
            video: '04 - Leandroumandap.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_02c3b2a1a54a4454a42bbe98593038c3f003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_02c3b2a1a54a4454a42bbe98593038c3f003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586&posttype=link&title=&caption=&content=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-321e6069-375b-4d39-9fda-190a8252b586'
        },
        {
            video: '05 - Christopherdrece.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_d82010174722412cb5bf650435308c53f003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_d82010174722412cb5bf650435308c53f003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7&posttype=link&title=&caption=&content=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-6a23b1fe-f3f3-4ae5-99bf-a3bb168a49c7'
            
        },
        {
            video: '06 - Bonifaciodones.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_253ae978a28e47188767d329e8f1dbacf003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_253ae978a28e47188767d329e8f1dbacf003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'http://www.tumblr.com/share/link?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410'
        },
        {
            video: '07 - Ericcastillo.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-e2d0383e-f7f9-4294-933f-6442137c253f&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-e2d0383e-f7f9-4294-933f-6442137c253f&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-e2d0383e-f7f9-4294-933f-6442137c253f&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_653c04f2d1534a419da30a8173e2f23bf003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_653c04f2d1534a419da30a8173e2f23bf003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'http://www.tumblr.com/share/link?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-e2d0383e-f7f9-4294-933f-6442137c253f', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-e2d0383e-f7f9-4294-933f-6442137c253f'
        },
        {
            video: '08 - Lawrence Cariaga.mp4', 
            play: true, 
            fb: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-fad09692-a718-4f8a-99c2-e2343a836f3d&t=Wix%20Pro%20Gallery', 
            twitter: 'https://x.com/intent/post?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-fad09692-a718-4f8a-99c2-e2343a836f3d&amp%3Btext=Wix+Pro+Gallery&amp%3Bhashtags=gallery%2Cphotos%2Cphotographer%2Cprofessional', 
            pinterest: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-fad09692-a718-4f8a-99c2-e2343a836f3d&media=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F6f0890_184e3ba6486e405da52ebdef883c528bf003.jpg%2Fv1%2Ffit%2Fw_500%2Ch_500%2Cq_90%2F6f0890_184e3ba6486e405da52ebdef883c528bf003.jpg&description=Wix%20Pro%20Gallery', 
            tumblr: 'https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3FshareSource%3Dlegacy%26canonicalUrl%3D%26url%3Dhttps%253A%252F%252Fwww.angkasangga.ph%252Fadbokasiya%253Fpgid%253Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410%26posttype%3Dlink%26title%3D%26caption%3D%26content%3Dhttps%253A%252F%252Fwww.angkasangga.ph%252Fadbokasiya%253Fpgid%253Dm1g8n410-453d79d1-96a7-4b01-8e50-7e21df8b0410', 
            email: 'mailto:?Subject=Wix%20Pro%20Gallery&body=https%3A%2F%2Fwww.angkasangga.ph%2Fadbokasiya%3Fpgid%3Dm1g8n410-fad09692-a718-4f8a-99c2-e2343a836f3d'
        },
    ]

    useEffect(() => {
        AOS.init({});
    }, []);

    return(
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <Topbar topbool={true}/>
            <Box> 
                <video 
                    className={styles.video2} 
                    src={require('/public/assets/adbo/Angkasangga Animated Cover.mp4')} 
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </Box>
            <Content bool={false} />
            <Box sx={{ width: '100%', minHeight: '100vh',  background: '#ecf3fa' }}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Container sx={{ my: 3 }} data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine">
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, color: '#10aee5', fontSize: {xs: '30px', sm: '40px', md: '50px'} }}
                            textAlign='center'
                        >
                            ANGKASANGGA NG
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, color: '#10aee5', mb: 3, fontSize: {xs: '30px', sm: '40px', md: '50px'} }}
                            textAlign='center'
                        >
                            IMPORMAL NA SEKTOR!
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 300, color: '#595959', mb: 3, fontSize: {xs: '16px', sm: '20px'} }}
                            textAlign='center'
                        >
                            Ang impormal na sektor ay ang bahagi ng ekonomiya na hindi nakapaloob sa pormal na sistema ng trabaho.  Madalas sila ang hindi nabibigyan ng tamang pagkilala at benepisyo.
                        </Typography>
                    </Container>
                </Grid>
                <Marquee>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                        {arrImages.map((image, index) => {
                            return(
                                <Grid item key={index} sx={{ mx: 1 }}>
                                    <Image 
                                        src={image.image} 
                                        alt={image.title} 
                                        style={{ width: '166px', height: '166px', borderRadius: '20px' }}
                                    />
                                    <Typography 
                                        sx={{ color: '#000000', fontSize: '14px' }} 
                                        textAlign='center'
                                    >
                                        {image.title}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Box>
                </Marquee>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                    <Box sx={{ display: 'block' }}>
                        <Image 
                            src={Images.habal1} 
                            alt="habal" 
                            style={{ width: '100%', height: '100%' }}
                            priority
                            sizes="100vw"
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Typography
                        variant="h3"
                        sx={{ my: 3, fontWeight: 800, color: '#10aee5', fontSize: {xs: '30px', sm: '40px', md: '50px'} }}
                        textAlign='center'
                        data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine"
                    >
                        ANGKASANGGA MO KAMI
                    </Typography>
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        
                        navigation={true}
                        breakpoints={{
                            360: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            640: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            760: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 10,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1424: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1524: {
                                slidesPerView: 6,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {arrVideo.map((vid, index) => {
                            return(
                                <SwiperSlide key={index}>
                                    <Grid sx={{ background: '#fff', height: '400px' }}>
                                        <div className={styles.divClass}>
                                            <div className={styles.figureClass}>
                                                <video 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                                    src={require(`/public/assets/testi/${vid.video}`)} 
                                                    autoPlay={vid.play}
                                                    loop
                                                    muted
                                                />
                                                <Grid container direction='row' justifyContent='center' alignItems='center' className={styles.center} spacing={3}>
                                                    <Grid item>
                                                        <FaShare 
                                                            size={30} 
                                                            color="secondary" 
                                                            style={{ background: '#fff', borderRadius: '50%', opacity: 0.7, cursor: 'pointer', padding: '0.5rem' }} className={styles.iconsPlay}
                                                            onClick={() => {
                                                                setOpenShare(true)
                                                                setFb(vid.fb)
                                                                setX(vid.twitter)
                                                                setPin(vid.pinterest)
                                                                setTumb(vid.tumblr)
                                                                setEmail(vid.email)
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <FaPlay 
                                                            size={30} 
                                                            color="secondary" 
                                                            style={{ background: '#fff', borderRadius: '50%', opacity: 0.7, cursor: 'pointer', padding: '0.5rem' }} className={styles.iconsPlay}
                                                            onClick={() => {
                                                                setOpenVideo(true)
                                                                setWatch(vid.video)
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <Box>
                        <Image src={Images.bg} alt="logo" style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Box id="news">
                        <Typography
                            variant="h3"
                            sx={{ mt: 3, mb: 4, py: 5, fontWeight: 800, color: '#10aee5', fontSize: {xs: '30px', sm: '40px', md: '50px'} }}
                            textAlign='center'
                            data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine"
                        >
                            ANGKASANGGA NEWS
                        </Typography>
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ px: 2 }}>
                            {arrNews.map((news, index) => {
                                return(
                                    <Grid item sm={6} md={4} lg={3} sx={{ pb: 2 }} key={index}>
                                        <Card data-aos="zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine">
                                            <CardMedia
                                                sx={{ height: 200 }}
                                                image={news.image.src}
                                                title="news"
                                            />
                                            <CardContent>
                                                <Typography 
                                                    textAlign='center' 
                                                    variant="body1" 
                                                    className={styles.inter} 
                                                    sx={{ pb: 2, fontWeight: 600, fontSize: '14px' }}
                                                >
                                                    {news.title}
                                                </Typography>
                                                <Typography 
                                                    textAlign='center' 
                                                    variant='body2' 
                                                    className={styles.inter}
                                                    sx={{ fontWeight: 400, fontSize: '12px' }}
                                                >
                                                    {news.text}
                                                </Typography>
                                                <Button 
                                                    fullWidth 
                                                    variant="contained" 
                                                    color="inherit" 
                                                    sx={{ 
                                                        borderRadius: '20px', 
                                                        textTransform: 'none', 
                                                        mt: 3, 
                                                        mb: 2, 
                                                        py: 1 
                                                    }}
                                                    onClick={() => news.link === '' ? console.log('invalid link') : window.open(news.link, '_blank')}
                                                    className={styles.basahin}
                                                >
                                                    Basahin
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
            <Dialog open={openShare} maxWidth='sm' fullWidth>
                <DialogContent sx={{ px: {xs: 3, sm: 5} }}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <MdOutlineClose size={20} style={{ cursor: 'pointer', marginBottom: 10 }} onClick={() => {
                            setOpenShare(false)
                            setFb('')
                            setX('')
                            setPin('')
                            setTumb('')
                            setEmail('')
                        }}/>
                    </Grid>
                    <Typography sx={{ mb: 3 }}>
                        Share a post:
                    </Typography>
                    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={3} sx={{ mb: 3 }}>
                        <Grid item>
                            <FaFacebook size={30} onClick={() => window.open(fb)}/>
                        </Grid>
                        <Grid item>
                            <FaTwitter size={30} onClick={() => window.open(x)}/>
                        </Grid>
                        <Grid item>
                            <FaPinterest size={30} onClick={() => window.open(pin)}/>
                        </Grid>
                        <Grid item>
                            <FaTumblr size={30} onClick={() => window.open(tumb)}/>
                        </Grid>
                        <Grid item>
                            <FaEnvelope size={30} onClick={() => window.open(email)}/>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog
                open={video}
                TransitionComponent={Transition}
                sx={{ background: 'transparent'}}
                fullWidth
            >
                <DialogContent sx={{ p: 0 }}>
                    <Grid container direction='row' justifyContent='flex-end' sx={{ position: 'absolute' }}>
                        <MdOutlineClose size={20} style={{ cursor: 'pointer', margin: 10, color: '#fff' }} onClick={() => {
                            setOpenVideo(false)
                            setWatch('')
                        }}/>
                    </Grid>
                    <video 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        src={watch ? require(`/public/assets/testi/${watch}`) : <></>} 
                        autoPlay
                        muted
                        controls
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}