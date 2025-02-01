import { Box, Container, DialogContent, Grid, Typography } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpenLoginModal, setOpenPassModal, setPassSuccessModalBool } from "../store/slice";
import styles from '../page.module.css';
import { Images } from "../ts/images";
import Image from "next/image";

export default function PassAlertMessage() {
    const dispatch = useDispatch();
    return(
        <DialogContent className={styles.passAlertMessageModal}>
            <Grid 
                container 
                direction='row' 
                justifyContent='flex-end'
            >
                <MdOutlineClose 
                    style={{ color: '#ffffff', cursor: 'pointer' }} 
                    onClick={() => dispatch(setPassSuccessModalBool(false))}
                    size={20}
                />
            </Grid>
            <Grid 
                container 
                direction='row' 
                justifyContent='center' 
                alignItems='center'
            >
                <Image 
                    src={Images.withFlag} 
                    alt="logo" 
                    style={{ width: '200px', height: 'auto' }} 
                    priority 
                    sizes="80vw"
                />
            </Grid>
            <Container maxWidth='sm'>
                <div>
                    <Typography 
                        textAlign='center' 
                        variant="h4"
                        sx={{ fontWeight: 600, color: '#ffffff' }}
                    >
                        Password Changed!
                    </Typography>
                    <Box sx={{ display: {xs: 'flex', sm: 'flex', md: 'none', lg: 'none'} }}>
                        <Typography 
                            textAlign='center' 
                            variant="body1" 
                            sx={{ fontWeight: 400, color: '#ffffff', my: 3 }}
                        >
                            Maari ka ng mag-login at kumpletuhin ang member data form. I-click ang&nbsp; 
                            <span 
                                style={{ borderRadius: '20px', 
                                    background: '#fff', 
                                    color: '#090909', 
                                    fontWeight: 700, 
                                    padding: '0.6rem',
                                    fontSize: '12px', 
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    dispatch(setPassSuccessModalBool(false))
                                    dispatch(setOpenLoginModal(true))
                                }}
                            >
                                LOGIN
                            </span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: {xs: 'none', sm: 'none', md: 'flex', lg: 'flex'} }}>
                        <Typography 
                            textAlign='center' 
                            variant="body1" 
                            sx={{ fontWeight: 400, color: '#ffffff', my: 3 }}
                        >
                            Maari ka ng mag-login at kumpletuhin ang member data form. I-click ang&nbsp; 
                            <span 
                                style={{ borderRadius: '20px', 
                                    background: '#fff', 
                                    color: '#090909', 
                                    fontWeight: 700, 
                                    padding: '0.6rem',
                                    fontSize: '12px', 
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    dispatch(setOpenPassModal(false))
                                    dispatch(setPassSuccessModalBool(false))
                                    dispatch(setOpenLoginModal(true))
                                }}
                            >
                                LOGIN
                            </span>
                        </Typography>
                    </Box>
                </div>
            </Container>
        </DialogContent>
    )
}