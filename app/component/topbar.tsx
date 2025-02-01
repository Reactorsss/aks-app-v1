'use client';

import { useState } from "react";
import { 
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar 
} from "@mui/material";
import { Images } from "../ts/images";
import { FaAlignLeft, FaHouse, FaStore } from "react-icons/fa6";
import { IoMdMegaphone } from "react-icons/io";
import { MdNewspaper, MdContactPhone, MdOutlineClose } from "react-icons/md";
// import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoginForm from "./loginForm";
import Loading from "./loading";
import AlertMessage from "./alertMessage";
import styles from '../page.module.css';
import Image from "next/image";
import { setOpenDonateModal, setOpenLoginModal } from "../store/slice";
import ResetPassword from "./resetPassword";
import PassAlertMessage from "./passAlertMessage";
import Donate from "./donate";
import { Link } from 'react-scroll';

interface TopbarProps {
    topbool: boolean
}

export default function Topbar({ topbool } : TopbarProps) {
    // const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.data.isLoading);
    const openLoginModal = useSelector((state: RootState) => state.data.openLoginModal);
    const openPassModal = useSelector((state: RootState) => state.data.openPassModal);
    const passModalBool = useSelector((state: RootState) => state.data.passModalBool);
    const passSuccessModalBool = useSelector((state: RootState) => state.data.passSuccessModalBool);
    const openDonateModal = useSelector((state: RootState) => state.data.openDonateModal);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const arrTop = [
        { icon: <FaHouse size={20} />, title: 'Home', redirect: 'home' },
        { icon: <IoMdMegaphone size={23} />, title: 'Adbokasiya', redirect: 'adbokasiya' },
        { icon: <MdNewspaper size={22} />, title: 'News', redirect: 'news' },
        { icon: <FaStore size={20} />, title: 'Merch', redirect: 'merch' },
        { icon: <MdContactPhone size={20} />, title: 'Contact Us', redirect: 'contact' }
    ]

    const handleSetActive = (to: any) => {
        console.log("active:", to);
    };

    const handleRedirect = (link: any) => {
        // console.log(link)
        if(link === 'home') {
            window.open('/', '_self')
        }
        else if(link === 'adbokasiya') {
            window.open(link, '_self')
        }
        else if(link === 'news') {
            window.open(`/adbokasiya#${link}`, '_self')
        }
        else if(link === 'merch') {
            window.open(`/#${link}`, '_self')
        }
        setMobileOpen(!mobileOpen);
        // window.open(link, '_self')
    }

    const drawer = (
        <div>
            <Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%' }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="close drawer"
                        edge="end"
                        onClick={handleDrawerClose}
                    >
                        <MdOutlineClose size={20} />
                    </IconButton>
                </Box>
            </Toolbar>
            <List>
                {arrTop.map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <Link 
                            activeClass="active" 
                            to={text.redirect}
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onSetActive={handleSetActive}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={text.title} 
                                    className={`${styles.fontTopbar}`} 
                                    onClick={() => handleRedirect(text.redirect)} 
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return(
        <>
            <AppBar 
                position="static" 
                className={styles.appBar}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid
                            container
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Grid item>
                                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                                    <Image 
                                        src={Images.horizontalLogo} 
                                        width={190} 
                                        height={60} 
                                        alt="LOGO" 
                                        priority 
                                        sizes="80vw"
                                    />
                                </Box>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ display: { md: 'none', lg: 'none' } }}
                                >
                                    <FaAlignLeft size={20}/>
                                </IconButton>
                            </Grid>
                            <Grid item sx={{ display: { md: 'none', lg: 'none' } }}>
                                <Box sx={{ 
                                    display: { xs: 'flex', sm: 'flex', md: 'none' },
                                    mr: 1 
                                }}>
                                    <Image 
                                        src={Images.horizontalLogo} 
                                        width={150} 
                                        height={50} 
                                        alt="LOGO" 
                                        priority 
                                        sizes="80vw"
                                    />
                                </Box>
                            </Grid>
                            <Grid>
                                <Box sx={{display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex'}}}>
                                    <Box sx={{ 
                                        mr: 1,
                                        my: 'auto', 
                                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'block'} 
                                    }}>
                                        {arrTop.map((text, index) => {
                                            return(
                                                <Link 
                                                    activeClass="active" 
                                                    to={text.redirect}
                                                    spy={true} 
                                                    smooth={true} 
                                                    offset={50} 
                                                    duration={500} 
                                                    onSetActive={handleSetActive}
                                                    key={index}
                                                >
                                                    <Button 
                                                        variant="text"
                                                        sx={{ 
                                                            color: '#fff',
                                                            textTransform: 'none',
                                                            fontSize: '16px',
                                                            mx: 1
                                                        }}
                                                        onClick={() => handleRedirect(text.redirect)}
                                                    >
                                                        {text.title}
                                                    </Button>
                                                </Link>
                                                // <Button 
                                                //     href={text.redirect} 
                                                //     className={styles.buttonLinkTop} 
                                                //     key={index} variant="text" 
                                                //     sx={{ 
                                                //         color: '#fff',
                                                //         textTransform: 'none',
                                                //         fontSize: '16px',
                                                //         mx: 1
                                                //     }}
                                                // >
                                                //     {text.title}
                                                // </Button>
                                            )
                                        })}
                                    </Box>
                                    {topbool ? 
                                    <>
                                        <LoginForm form={true} />
                                    </> :
                                        <Button 
                                            variant="contained" 
                                            sx={{ background: '#ffc841', color: '#000000' }}
                                            onClick={() => dispatch(setOpenDonateModal(true))}
                                        >
                                            Donate
                                        </Button>
                                    }
                                </Box>
                                <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
                                    {topbool ? <>
                                        <Button 
                                            variant="contained"
                                            sx={{ 
                                                textTransform: 'uppercase', 
                                                background: '#ffffff', 
                                                color:'#10aee5', 
                                                fontWeight: 600 
                                            }}
                                            size="small"
                                            onClick={() => dispatch(setOpenLoginModal(true))}
                                        >
                                            Login
                                        </Button>
                                    </> : <>
                                        <Button 
                                            variant="contained" 
                                            sx={{ background: '#ffc841', color: '#000000' }}
                                        >
                                            Donate
                                        </Button>
                                    </>}
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                anchor={'left'}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>
            <Loading open={isLoading} />
            <AlertMessage />
            <Dialog 
                open={openLoginModal}
                maxWidth='xs'
                fullWidth
            >
                <LoginForm form={false} />
            </Dialog>
            <Dialog 
                open={openPassModal}
                maxWidth='xs'
                fullWidth
            >
                <ResetPassword form={passModalBool}/>
            </Dialog>
            <Dialog 
                open={passSuccessModalBool}
                maxWidth='xs'
                fullWidth
            >
                <PassAlertMessage />
            </Dialog>
            <Dialog open={openDonateModal} maxWidth='xs' fullWidth sx={{ zIndex: 99999 }}>
                <Donate />
            </Dialog>
        </>
    )
}