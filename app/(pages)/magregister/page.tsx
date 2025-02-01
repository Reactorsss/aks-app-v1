'use client';

import { 
    Box, 
    Button, 
    Checkbox, 
    Container, 
    CssBaseline, 
    DialogContent, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    IconButton, 
    InputAdornment, 
    OutlinedInput, 
    Paper, 
    Radio, 
    RadioGroup, 
    TextField, 
    Typography 
} from "@mui/material";
import { 
    setAlertMessage,
    setAlertOpen,
    setAlertSeverity,
    setIsLoading,
    setOpenLoginModal, 
    setOpenPassModal, 
    setOpenRegMess, 
    setSuccessMess, 
    setTermsOpen 
} from "@/app/store/slice";
import { RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../page.module.css";
import Topbar from "@/app/component/topbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { Images } from "@/app/ts/images";
import AOS from "aos";
import Terms from "@/app/component/terms";
import Header from "@/app/component/header";
import Footer from "@/app/component/footer";
import OtpInput from 'react-otp-input';
import sms from "@/app/ts/config/sms";
import Dialog, { DialogProps } from '@mui/material/Dialog';

export default function Register() {
    const dispatch = useDispatch();
    const openRegMess = useSelector((state: RootState) => state.data.openRegMess);
    const successMess = useSelector((state: RootState) => state.data.successMess);
    const termsOpen = useSelector((state: RootState) => state.data.termsOpen);
    const [ip, setIp] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [suffix, setSuffix] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [regVote, setRegVote] = useState<string>('');
    const [referrer, setReferrer] = useState<string>('');
    const [refCode, setRefCode] = useState<string>('');
    const [refCode2, setRefCode2] = useState<string>('');
    const [checkedConfirm, setCheckedConfirm] = useState<boolean>(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const [errorLastName, setErrorLastName] = useState<boolean>(false);
    const [errorFirstName, setErrorFirstName] = useState<boolean>(false);
    const [errorMiddleName, setErrorMiddleName] = useState<boolean>(false);
    const [errorMobile, setErrorMobile] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorPassword2, setErrorPassword2] = useState<boolean>(false);

    const [errorLastNameText, setErrorLastNameText] = useState<string>('');
    const [errorFirstNameText, setErrorFirstNameText] = useState<string>('');
    const [errorMiddleNameText, setErrorMiddleNameText] = useState<string>('');
    const [errorMobileText, setErrorMobileText] = useState<string>('');
    const [errorPasswordText, setErrorPasswordText] = useState<string>('');
    const [errorPassword2Text, setErrorPassword2Text] = useState<string>('');

    const [openOtpLogin, setOpenOtpLogin] = useState<boolean>(false);
    const [otpLogin, setOtpLogin] = useState<string>('');
    const [countdown, setCountdown] = useState(0);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        let timer: any;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else {
            setOtpSent(false);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeMobileNo = (e: any) => {
        if(e.target.value.length <= 11) {
            setMobile(e.target.value.replace(/\D/g, ''));
            setErrorMobile(false)
            setErrorMobileText('')
        }
    }

    const handleClickCheckedSubmit = () => {
        if(checkedConfirm) {
            setCheckedConfirm(false)
        }
        else {
            setCheckedConfirm(true)
        }
    }

    const validateMobileNumber = (number: any) => {
        const localPattern = /^09\d{9}$/;
        const internationalPattern = /^\+63\d{10}$/;

        if (localPattern.test(number)) {
            return 'Valid local mobile number.';
        } else if (internationalPattern.test(number)) {
            return 'Valid international mobile number.';
        } else {
            return 'Invalid mobile number.';
        }
    }

    function replaceLeadingZeroWith63(phoneNumber: any) {
        return phoneNumber.replace(/^0/, '63');
    }

    const handleOTPResend = () => {
        setOtpLogin('')
        dispatch(setIsLoading(true))
        axios.post('/api/otp/generate', {
            p_otp_module: 'register',
            p_mobile_no: replaceLeadingZeroWith63(mobile),
            p_otp: Math.floor(100000 + Math.random() * 900000)
        }).then(response2 => {
            if(response2.data.data[0].response_code >= 0) {
                sms.post('/api/v1/subaccounts/Angkasangga_OTP/messages', {
                    source: "ANGKAS",
                    destination: replaceLeadingZeroWith63(mobile),
                    text: `Kasangga ang iyong OTP ay ${response2.data.data[0].response_message} huwag itong i-share, ito ay mag-eexpire sa loob ng 10 mins.`,
                    encoding: "AUTO"
                }).then(result => {
                    if(result.status === 200) {
                        setOtpSent(true);
                        setCountdown(60);
                        dispatch(setIsLoading(false))
                        dispatch(setAlertOpen(true))
                        dispatch(setAlertMessage('Verification OTP has sent!'))
                        dispatch(setAlertSeverity('success'))
                    }
                    else {
                        dispatch(setIsLoading(false))
                        dispatch(setAlertOpen(true))
                        dispatch(setAlertMessage('Verification OTP Sent failed!'))
                        dispatch(setAlertSeverity('error'))
                    }
                }).catch(err => {
                    dispatch(setIsLoading(false))
                    dispatch(setAlertOpen(true))
                    dispatch(setAlertMessage('Internal Server Error'))
                    dispatch(setAlertSeverity('error'))
                    console.error(err)
                })
            }
            else {
                dispatch(setIsLoading(false))
                dispatch(setAlertOpen(true))
                dispatch(setAlertMessage(response2.data.data[0].response_message))
                dispatch(setAlertSeverity('error'))
            }
        }).catch(err => {
            dispatch(setIsLoading(false))
            dispatch(setAlertOpen(true))
            dispatch(setAlertMessage('Internal Server Error'))
            dispatch(setAlertSeverity('error'))
            console.error(err)
        })       
    }

    const handleLoginOtp = () => {
        dispatch(setIsLoading(true))
        axios.post('/api/otp/retrieve', {
            p_otp_module: 'register',
            p_mobile_no: replaceLeadingZeroWith63(mobile),
            p_otp: otpLogin,
            p_ip_address: '0.0.0.0'
        }).then(response => {
            if(response.data.data[0].response_code >= 0) {                
                dispatch(setSuccessMess('created'))
                setFirstName('')
                setMiddleName('')
                setLastName('')
                setMobile('')
                setSuffix('')
                setPassword('')
                setRePassword('')
                setRegVote('')
                setRefCode('')
                setRefCode2('')
                setReferrer('')
                setCheckedConfirm(false)
                dispatch(setOpenRegMess(true))
                setOpenOtpLogin(false)
                dispatch(setIsLoading(false))
                setOtpLogin('')
            }
            else {

                dispatch(setIsLoading(false))
                dispatch(setAlertOpen(true))
                dispatch(setAlertMessage(response.data.data[0].response_message))
                dispatch(setAlertSeverity('error'))
            }
        }).catch(err => {
            dispatch(setIsLoading(false))
            dispatch(setAlertOpen(true))
            dispatch(setAlertMessage('Internal Server Error'))
            dispatch(setAlertSeverity('error'))
            console.error(err)
        })
    }

    const handleClickSubmit = () => {
        dispatch(setIsLoading(true))
        if(lastName === '' || firstName === '' || middleName === '' || mobile === '' || mobile.length < 11 || password === '' || rePassword === '' || regVote === '') {
            if(lastName === '') {
                setErrorLastName(true)
                setErrorLastNameText('Lastname is required field.')
            }
            if(firstName === '') {
                setErrorFirstName(true)
                setErrorFirstNameText('Firstname is required field.')
            }
            if(middleName === '') {
                setErrorMiddleName(true)
                setErrorMiddleNameText('Middlename is required field.')
            }
            if(mobile === '') {
                setErrorMobile(true)
                setErrorMobileText('Mobile number is required field.')
            }
            if(mobile.length < 11) {
                setErrorMobile(true)
                setErrorMobileText('Please enter your 11-digit mobile number.')
            }
            if(password === '') {
                setErrorPassword(true)
                setErrorPasswordText('Password is required field.')
            }
            if(rePassword === '') {
                setErrorPassword2(true)
                setErrorPassword2Text('Re-type Password is required field.')
            }
            dispatch(setIsLoading(false))
        }
        else if(validateMobileNumber(mobile) === 'Invalid mobile number.') {
            dispatch(setIsLoading(false))
            dispatch(setAlertOpen(true))
            dispatch(setAlertMessage(validateMobileNumber(mobile)))
            dispatch(setAlertSeverity('error'))
        }
        else if(password !== rePassword) {
            dispatch(setIsLoading(false))
            dispatch(setAlertOpen(true))
            dispatch(setAlertMessage('Password and Re-type do not match.'))
            dispatch(setAlertSeverity('error'))
        }
        else {
            axios.post('/api/register', {
                p_first_name: firstName,
                p_middle_name: middleName,
                p_last_name: lastName,
                p_suffix: suffix,
                p_mobile_no: mobile,
                p_passwordhash: password,
                p_is_registered_voter: regVote,
                p_referrer_id_no: refCode2
            }).then(response => {
                if(response.data.data[0].response_code >= 0) {
                    axios.post('/api/otp/generate', {
                        p_otp_module: 'register',
                        p_mobile_no: replaceLeadingZeroWith63(mobile),
                        p_otp: Math.floor(100000 + Math.random() * 900000)
                    }).then(response2 => {
                        if(response2.data.data[0].response_code >= 0) {
                            sms.post('/api/v1/subaccounts/Angkasangga_OTP/messages', {
                                source: "ANGKAS",
                                destination: replaceLeadingZeroWith63(mobile),
                                text: `Kasangga ang iyong OTP ay ${response2.data.data[0].response_message} huwag itong i-share, ito ay mag-eexpire sa loob ng 10 mins.`,
                                encoding: "AUTO"
                            }).then(result => {
                                if(result.status === 200) {
                                    dispatch(setIsLoading(false))
                                    dispatch(setAlertOpen(true))
                                    dispatch(setAlertMessage('Verification OTP has sent!'))
                                    dispatch(setAlertSeverity('success'))
                                    setOpenOtpLogin(true)
                                }
                                else {
                                    dispatch(setIsLoading(false))
                                    dispatch(setAlertOpen(true))
                                    dispatch(setAlertMessage('Verification OTP Sent failed!'))
                                    dispatch(setAlertSeverity('error'))
                                }
                            }).catch(err => {
                                dispatch(setIsLoading(false))
                                dispatch(setAlertOpen(true))
                                dispatch(setAlertMessage('Internal Server Error'))
                                dispatch(setAlertSeverity('error'))
                                console.error(err)
                            })
                        }
                        else {
                            dispatch(setIsLoading(false))
                            dispatch(setAlertOpen(true))
                            dispatch(setAlertMessage(response2.data.data[0].response_message))
                            dispatch(setAlertSeverity('error'))
                        }
                    }).catch(err => {
                        dispatch(setIsLoading(false))
                        dispatch(setAlertOpen(true))
                        dispatch(setAlertMessage('Internal Server Error'))
                        dispatch(setAlertSeverity('error'))
                        console.error(err)
                    })
                }
                else {
                    if(response.data.data[0].response_message === 'A customer with this mobile number already exists.') {
                        dispatch(setIsLoading(false))
                        setFirstName('')
                        setMiddleName('')
                        setLastName('')
                        setMobile('')
                        setSuffix('')
                        setPassword('')
                        setRePassword('')
                        setRegVote('')
                        setRefCode('')
                        setReferrer('')
                        setCheckedConfirm(false)
                        dispatch(setOpenRegMess(true))
                        dispatch(setSuccessMess('exist'))
                    }
                    else {
                        dispatch(setIsLoading(false))
                        dispatch(setAlertOpen(true))
                        dispatch(setAlertMessage(response.data.data[0].response_message))
                        dispatch(setAlertSeverity('error'))
                        setCheckedConfirm(false)
                    }
                }
            }).catch(err => {
                dispatch(setIsLoading(false))
                dispatch(setAlertOpen(true))
                dispatch(setAlertMessage('Internal Server Error'))
                dispatch(setAlertSeverity('error'))
                setCheckedConfirm(false)
                console.error(err);
            })
        }
    }

    useEffect(() => {
        AOS.init({});
        axios.get('/api/read/ip').then(response => {
            setIp(response.data.ip)
        }).catch(err => console.error(err))
    }, [])

    return(
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <Topbar topbool={false} />
            <Box className={styles.backgroundReg}></Box>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '90vh',
                    display: 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: {xs: 48, sm: 23, md: 15, lg: 8 }
                }}
                className={styles.backgroundBox}
            >
                <Container
                    maxWidth='md'
                    sx={{
                        left: 0,
                        top: {xs: '60%', sm: '65%', md: '60%', lg: '50%' },
                        right: 0,
                        bottom: '10%',
                        position: 'absolute'
                    }}
                >
                    <Paper
                        sx={{ p: {xs: 1, sm: 2}, background: '#ebf2fa', zIndex: 99999 }}
                        data-aos="zoom-in"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-sine"
                    >
                        <Typography
                            textAlign='center'
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 800,
                                fontSize: { lg: '40px', md: '40px', sm: '30px',  xs: '30px'}
                            }}
                        >
                            MAGING KASANGGA!
                        </Typography>
                        <Typography
                            className={styles.inter}
                            textAlign='center'
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 400,
                                fontSize: { lg: '18px', md: '18px', sm: '18px', xs: '14px', }
                            }}
                        >
                            MAG SIGN-UP PARA MAGING MIYEMBRO AT MAKAKUHA NG ID
                        </Typography>
                        <Box sx={{ p: 2 }}>
                            <Grid container display='row' justifyContent='center' alignItems='center' spacing={1}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Typography>Last Name*</Typography>
                                    <TextField
                                        id="lastName"
                                        required
                                        fullWidth
                                        onChange={(e) => {
                                            setLastName(e.target.value)
                                            setErrorLastName(false)
                                            setErrorLastNameText('')
                                        }}
                                        value={lastName}
                                        error={errorLastName}
                                        helperText={errorLastNameText}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Typography>First Name*</Typography>
                                    <TextField
                                        id="firstName"
                                        required
                                        fullWidth
                                        onChange={(e) => {
                                            setFirstName(e.target.value)
                                            setErrorFirstName(false)
                                            setErrorFirstNameText('')
                                        }}
                                        value={firstName}
                                        error={errorFirstName}
                                        helperText={errorFirstNameText}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Typography>Middle Name*</Typography>
                                    <TextField
                                        id="middleName"
                                        required
                                        fullWidth
                                        onChange={(e) => {
                                            setMiddleName(e.target.value)
                                            setErrorMiddleName(false)
                                            setErrorMiddleNameText('')
                                        }}
                                        value={middleName}
                                        error={errorMiddleName}
                                        helperText={errorMiddleNameText}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Typography>Suffix</Typography>
                                    <TextField
                                        id="suffix"
                                        fullWidth
                                        onChange={(e) => setSuffix(e.target.value)}
                                        value={suffix}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography>Mobile Number*</Typography>
                                    <TextField
                                        id="mobile"
                                        required
                                        fullWidth
                                        onChange={handleChangeMobileNo}
                                        value={mobile}
                                        error={errorMobile}
                                        helperText={errorMobileText}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography>Password*</Typography>
                                        <OutlinedInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setErrorPassword(false)
                                                setErrorPasswordText('')
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword ? 'hide the password' : 'display the password'
                                                        }
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        onMouseUp={handleMouseUpPassword}
                                                        edge="end"
                                                    >
                                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            error={errorPassword}
                                            value={password}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#d32f2f',
                                                fontWeight: 400,
                                                lineHeight: 1.66,
                                                letterSpacing: '0.03333em',
                                                marginBottom: 0,
                                                marginLeft: '14px',
                                                marginRight: '14px',
                                                marginTop: '4px'
                                            }}
                                        >
                                            {errorPasswordText}
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography>Re-type Password*</Typography>
                                        <OutlinedInput
                                            id="re-type-password"
                                            type={showPassword2 ? 'text' : 'password'}
                                            onChange={(e) => {
                                                setRePassword(e.target.value)
                                                setErrorPassword2(false)
                                                setErrorPassword2Text('')
                                            }}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword2 ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword2}
                                                    onMouseUp={handleMouseUpPassword2}
                                                    edge="end"
                                                >
                                                {showPassword2 ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            error={errorPassword2}
                                            value={rePassword}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#d32f2f',
                                                fontWeight: 400,
                                                lineHeight: 1.66,
                                                letterSpacing: '0.03333em',
                                                marginBottom: 0,
                                                marginLeft: '14px',
                                                marginRight: '14px',
                                                marginTop: '4px'
                                            }}
                                        >
                                            {errorPassword2Text}
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl sx={{ mt: 3 }}>
                                        <FormLabel id="regVote-buttons-group-label" sx={{ color: '#000' }}>Ikaw ba ay registradong botante?</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="regVote-buttons-group-label"
                                            name="regVote"
                                            onChange={(e) => setRegVote(e.target.value)}
                                            value={regVote}
                                        >
                                            <FormControlLabel value={1} control={<Radio />} label="Oo" />
                                            <FormControlLabel value={0} control={<Radio />} label="Hindi" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Typography variant="h6" sx={{ my: 3 }}>Sino ang nag-refer sayo ?</Typography>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography>Referrer&apos;s Code ID Number</Typography>
                                    <TextField
                                        id="referrerCode"
                                        placeholder="Leave this blank if not applicable"
                                        required
                                        fullWidth
                                        onChange={(e) => {
                                            setRefCode(e.target.value)
                                            axios.post('/api/read/id', {
                                                p_id_no: e.target.value,
                                                p_ip: ip
                                            }).then((response) => {
                                                if(response.data.data[0].id > 0) {
                                                    setRefCode2(response.data.data[0].id_no)
                                                    setReferrer(`${response.data.data[0].first_name} ${response.data.data[0].last_name}`)
                                                }
                                                else {
                                                    setReferrer('')
                                                }
                                            }).catch((err) => {
                                                console.error(err)
                                            })
                                        }}
                                        value={refCode}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography>Referrer&apos;s Name or Oganization</Typography>
                                    <TextField
                                        id="referrer"
                                        placeholder="Leave this blank if not applicable"
                                        required
                                        fullWidth
                                        onChange={(e) => setReferrer(e.target.value)}
                                        value={referrer}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <FormControlLabel
                                        sx={{ my: 1 }}
                                        control={<Checkbox checked={checkedConfirm} />}
                                        label={
                                            <>
                                                <Typography>Sa pag-click sa Submit button, sumasang-ayon ako sa mga <span
                                                        style={{ textDecoration: 'underline' }}
                                                        onClick={() => {
                                                            dispatch(setTermsOpen(true))
                                                            setScroll('paper')
                                                        }}
                                                    >
                                                        tuntunin at kondisyon
                                                    </span>
                                                </Typography>
                                            </>
                                        }
                                        onClick={handleClickCheckedSubmit}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            py: 1.5,
                                            borderRadius: '25px',
                                            textTransform: 'capitalize',
                                            fontSize: '16px',
                                            background: '#ffc841',
                                            color: '#000'
                                        }}
                                        disabled={checkedConfirm ? false : true}
                                        onClick={handleClickSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </Box>
            <Header />
            <Footer />
            <Dialog
                maxWidth='xs'
                open={openRegMess}
            >
                <DialogContent sx={{ background: '#14abe3', zIndex: 99999 }}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <MdOutlineClose size={20} style={{ color: '#fff', cursor: 'pointer' }} onClick={() => {
                            dispatch(setOpenRegMess(false))
                            dispatch(setSuccessMess(''))
                        }}/>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Image src={Images.idDark} alt="logo" style={{ width: '180px', height: 'auto' }} />
                        {/* <Image src={Images.withFlag} alt="logo" style={{ width: '200px', height: 'auto' }} /> */}
                    </Grid>
                    <Container maxWidth='sm'>
                        {successMess === 'created' ?
                        <>
                            <Typography textAlign='center' variant="h5" className={styles.inter} sx={{ fontWeight: 800, color: '#fff', letterSpacing: 0.8, lineHeight: 1.18 }}>Congrats! Ikaw ay miyembro na ng ANGKASangga Party-list!</Typography>
                            <Typography textAlign='center' variant="body2" className={styles.inter} sx={{ fontWeight: 400, color: '#fff', my: 2 }}>
                                Maari ka na mag-login at kumpletuhin ang member data form. I-click ang login button
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                <Image src={Images.btnLogin} alt="btn login" style={{ width: '70%', height: 'auto', cursor: 'pointer' }} onClick={() => {
                                    dispatch(setOpenLoginModal(true))
                                    dispatch(setOpenRegMess(false))
                                }}/>
                            </Box>
                            <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                                <Grid item lg={5} md={5} sm={5} xs={6}>
                                    <Image src={Images.photo1} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                                </Grid>
                                <Grid item lg={7} md={7} sm={7} xs={6}>
                                    <Typography variant="body2" color="white">
                                        Makakatanggap ka ng text updates at karagdagang impormasyon tungkol sa ating adbokasiya.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                                <Grid item lg={5} md={5} sm={5} xs={6}>
                                    <Image src={Images.photo2} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                                </Grid>
                                <Grid item lg={7} md={7} sm={7} xs={6}>
                                    <Typography variant="body2" color="white">
                                        Kasali kana din sa ating mga raffle. Kasangga events and concerts.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                                <Grid item lg={5} md={5} sm={5} xs={6}>
                                    <Image src={Images.photo3} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                                </Grid>
                                <Grid item lg={7} md={7} sm={7} xs={6}>
                                    <Typography variant="body2" color="white">
                                        Maari ka na din makatanggap ng ayuda.
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* <Typography textAlign='center' variant="h5" className={styles.inter} sx={{ fontWeight: 600, color: '#fff' }}>Ikaw ay miyembro na ng ANGKASangga Party-list!</Typography> */}
                            {/* <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={3}>
                                <Grid item xs={12} sm={7} md={7} lg={7}>
                                    <Typography variant="body2" className={styles.inter} sx={{ fontWeight: 400, color: '#fff', my: 2 }}>
                                        Maari ka na mag-login at kumpletuhin ang member data form. I-click ang login button
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={5} md={5} lg={5}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ background: '#fff', color:'#10aee5', fontWeight: 600 }}
                                        onClick={() => {
                                            dispatch(setOpenLoginModal(true))
                                            dispatch(setOpenRegMess(false))
                                        }}
                                    >
                                        Mag-login
                                    </Button>
                                </Grid>
                            </Grid> */}
                        </> :
                        successMess === 'exist' ?
                        <>
                            <Typography
                                textAlign='center'
                                variant="body1"
                                className={styles.inter}
                                sx={{ fontWeight: 400, color: '#fff', my: 3 }}
                            >
                                Kasangga! Ikaw ay dating rehistradong miyembro na, mag-login upang kumpletuhin ang member information para makakuha ng ID at QR Code.
                            </Typography>
                            <Grid container direction='row' justifyContent='center' alignItems='center'>
                                <Typography
                                    variant="body2"
                                    textAlign='center'
                                    sx={{ fontWeight: 400, color: '#f2f2f2' }}
                                >
                                    Kung nakalimutan ang password pindutin ang
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ background: '#ffc841', color:'#000', fontWeight: 600, textTransform: 'none', mb: 3 }}
                                    onClick={() => {
                                        dispatch(setOpenPassModal(true))
                                        dispatch(setOpenRegMess(false))
                                    }}
                                >
                                    Reset Password
                                </Button>
                            </Grid>
                        </> : <></>
                        }
                    </Container>
                </DialogContent>
            </Dialog>
            <Dialog
                maxWidth='sm'
                open={termsOpen}
            >
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <Grid item>
                            <MdOutlineClose 
                                size={20} 
                                style={{ cursor: 'pointer', color: '#000' }} 
                                onClick={() => {
                                    dispatch(setTermsOpen(false))
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Terms />
                </DialogContent>
            </Dialog>
            <Dialog open={openOtpLogin} maxWidth='xs' fullWidth>
                <DialogContent sx={{ background: '#ffffff', p: 3 }}>
                    <Typography textAlign='center' sx={{ mb: 3, fontSize: '25px', fontWeight: 700 }}>OTP Verification</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <OtpInput
                            value={otpLogin}
                            onChange={setOtpLogin}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props: any) => <input {...props} />}
                            shouldAutoFocus
                            inputStyle={{
                                margin: '0.2rem',
                                fontSize: '30px',
                                padding: '0.2rem'
                            }}
                        />
                    </Box>
                    <Typography textAlign='center' sx={{ fontSize: '12.5px', fontWeight: 400, mt: 3 }}>Didn&apos;t receive OTP code?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="text" sx={{ textTransform: 'none', mb: 3 }} onClick={handleOTPResend} disabled={otpSent && countdown > 0 ? true : false}>
                            {otpSent && countdown > 0
                            ? `${countdown}s`
                            : 'Resend OTP'}
                        </Button>
                    </Box>
                    <Button fullWidth variant="contained" onClick={handleLoginOtp} sx={{ textTransform: 'none', my: 1 }}>Verify & Proceed</Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}