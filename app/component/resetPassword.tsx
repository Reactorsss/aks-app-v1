import { useEffect, useState } from "react";
import { 
    Button,
    DialogContent, 
    FormControl, 
    Grid, 
    IconButton, 
    InputAdornment, 
    OutlinedInput, 
    TextField, 
    Typography 
} from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAlertMessage, setAlertOpen, setAlertSeverity, setIsLoading, setOpenPassModal, setPassModalBool, setPassSuccessModalBool } from "../store/slice";
import { Images } from "../ts/images";
import Image from "next/image";
import axios from "axios";
import sms from "../ts/config/sms";
import styles from '../page.module.css';

interface ResetProps {
    form: boolean
}

export default function ResetPassword({ form }: ResetProps) {
    const dispatch = useDispatch();
    const [mobileNo, setMobileNo] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')
    const [otp, setOtp] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);   
    const [disabledInputOTP, setDisabledInputOTP] = useState<boolean>(true);   
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

    const replaceLeadingZeroWith63 = (mobileNumber: any) => {
        return mobileNumber.replace(/^0/, '63');
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

    const handleChangeMobileNo = (e: any) => {
        if(e.target.value.length <= 11) {
            setMobileNo(e.target.value.replace(/\D/g, ''));
            dispatch(setAlertOpen(false));
            dispatch(setAlertMessage(''));
            dispatch(setAlertSeverity(''));
        }
        else {
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage('Please enter your 11-digit mobile number.'));
            dispatch(setAlertSeverity('error'));
        }
    }

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

    const handleClickOTP = () => {
        dispatch(setIsLoading(true));
        if(mobileNo === '' || mobileNo.length < 11){
            if(mobileNo === '' || mobileNo.length < 11) {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Please enter your 11-digit mobile number.'));
                dispatch(setAlertSeverity('error'));
            }
            dispatch(setIsLoading(false));
        }
        else if(validateMobileNumber(mobileNo) === 'Invalid mobile number.') {
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage(validateMobileNumber(mobileNo)));
            dispatch(setAlertSeverity('error'));
            dispatch(setIsLoading(false));
        }
        else {
            axios.post('/api/otp/generate', {
                p_otp_module: 'password',
                p_mobile_no: replaceLeadingZeroWith63(mobileNo),
                p_otp: Math.floor(100000 + Math.random() * 900000)
            }).then(response => {
                if(response.data.data[0].response_code >= 0) {
                    sms.post('/api/v1/subaccounts/Angkasangga_OTP/messages', {
                        source: "ANGKAS",
                        destination: replaceLeadingZeroWith63(mobileNo),
                        text: `Kasangga ang iyong OTP ay ${response.data.data[0].response_message} huwag itong i-share, ito ay mag-eexpire sa loob ng 10 mins.`,
                        encoding: "AUTO"
                    }).then(result => {
                        dispatch(setIsLoading(false));
                        if(result.status === 200) {
                            setOtpSent(true);
                            setCountdown(60);
                            setDisabledInputOTP(false)
                            dispatch(setAlertOpen(true));
                            dispatch(setAlertMessage('OTP has sent to your mobile number.'));
                            dispatch(setAlertSeverity('success'));
                        }
                        else {
                            dispatch(setAlertOpen(true));
                            dispatch(setAlertMessage('OTP failed to send to your mobile number.'));
                            dispatch(setAlertSeverity('error'));
                        }
                    }).catch(err => {
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage('Internal Server Error'));
                        dispatch(setAlertSeverity('error'));
                        dispatch(setIsLoading(false));
                        console.error(err)
                    })
                }
                else {
                    dispatch(setAlertOpen(true));
                    dispatch(setAlertMessage(response.data.data[0].response_message));
                    dispatch(setAlertSeverity('error'));
                    dispatch(setIsLoading(false));
                }
            }).catch(err => {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Internal Server Error'));
                dispatch(setAlertSeverity('error'));
                dispatch(setIsLoading(false));
                console.error(err)
            })
        }
    }

    const handleClickProceed = () => {
        dispatch(setIsLoading(true));
        if(mobileNo === '' || mobileNo.length < 11 || otp === ''){
            if(mobileNo === '' || mobileNo.length < 11 ) {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Please enter your 11-digit mobile number.'));
                dispatch(setAlertSeverity('error'));
            }
            else if(otp === '') {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Please enter your correct otp.'));
                dispatch(setAlertSeverity('error'));
            }
            dispatch(setIsLoading(false));
        }
        else if(validateMobileNumber(mobileNo) === 'Invalid mobile number.') {
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage(validateMobileNumber(mobileNo)));
            dispatch(setAlertSeverity('error'));
            dispatch(setIsLoading(false));
        }
        else {
            axios.get('/api/read/ip').then(response2 => {
                axios.post('/api/otp/retrieve', {
                    p_otp_module: 'password',
                    p_mobile_no: replaceLeadingZeroWith63(mobileNo),
                    p_otp: otp,
                    p_ip_address: response2.data.ip
                }).then(response => {
                    dispatch(setIsLoading(false));
                    if(response.data.data[0].response_code >= 0) {
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage(response.data.data[0].response_message));
                        dispatch(setAlertSeverity('success'));
                        setOtpSent(false);
                        setCountdown(0);
                        dispatch(setOpenPassModal(true))
                        dispatch(setPassModalBool(true))
                        
                    }
                    else {
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage(response.data.data[0].response_message));
                        dispatch(setAlertSeverity('error'));
                    }
                }).catch(err => {
                    dispatch(setAlertOpen(true));
                    dispatch(setAlertMessage('Internal Server Error'));
                    dispatch(setAlertSeverity('error'));
                    dispatch(setIsLoading(false));
                    console.error(err)
                })
            })
        }
    }

    const handleClickChangePassword = () => {
        dispatch(setIsLoading(true));
        if(password === '' || rePassword === '') {
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage('Password/Re-type password is required field.'));
            dispatch(setAlertSeverity('error'));
            dispatch(setIsLoading(false));
        }
        else if(password !== rePassword){
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage('Password and Re-type password do not match.'));
            dispatch(setAlertSeverity('error'));
            dispatch(setIsLoading(false));
        }
        else {
            axios.get('/api/read/ip').then(response2 => {
                axios.patch('/api/update/password', {
                    p_mobile_no: mobileNo,
                    p_passwordhash: password,
                    p_ip_address: response2.data.ip
                }).then(response => {
                    dispatch(setIsLoading(false));
                    if(response.data.data[0].response_code >= 0) {
                        setMobileNo('')
                        setPassword('')
                        setRePassword('')
                        dispatch(setOpenPassModal(false))
                        dispatch(setPassModalBool(false))
                        dispatch(setPassSuccessModalBool(true))
                    }
                    else {
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage(response.data.data[0].response_message));
                        dispatch(setAlertSeverity('error'));
                    }
                }).catch(err => {
                    dispatch(setAlertOpen(true));
                    dispatch(setAlertMessage('Internal Server Error'));
                    dispatch(setAlertSeverity('error'));
                    dispatch(setIsLoading(false));
                    console.error(err)
                })
            })
        }
    }

    return(
        <DialogContent className={styles.backgroundModalLogin}>
            <Grid container direction='row' justifyContent='flex-end'>
                <MdOutlineClose style={{ cursor: 'pointer' }} size={20} onClick={() => dispatch(setOpenPassModal(false))}/>
            </Grid>
            <Grid container direction='row' justifyContent='center'>
                <Image 
                    src={Images.idLight} 
                    alt='logo' 
                    style={{ width: '140px', height: 'auto' }}  
                    priority 
                    sizes="80vw"
                />
            </Grid>
            <Typography 
                variant="h5" 
                textAlign='center' 
                sx={{ my: 2, fontWeight: 700 }}
            >
                {form ? 'Change' : 'Forgot'} Password
            </Typography>
            {form ?
            <>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='center' 
                    alignItems='center'
                    spacing={2}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography variant="body2">Password*</Typography>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
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
                                value={password}
                                sx={{ background: '#ffffff' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        sm={12} 
                        md={12} 
                        lg={12}
                    >
                        <FormControl 
                            fullWidth 
                            variant="outlined"
                        >
                            <Typography variant="body2">Re-type Password*</Typography>
                            <OutlinedInput
                                id="re-type-password"
                                type={showPassword2 ? 'text' : 'password'}
                                onChange={(e) => setRePassword(e.target.value)}
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
                                value={rePassword}
                                sx={{ background: '#ffffff' }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </> :
            <>
                <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography>Mobile Number*</Typography>
                        <TextField 
                            id="mobile" 
                            required 
                            fullWidth
                            onChange={handleChangeMobileNo}
                            value={mobileNo}
                            sx={{ mb: 2, background: '#ffffff' }}
                        />
                    </Grid>
                    <Grid item xs={7} sm={8} md={8} lg={8}>
                        <Typography>Ilagay ang OTP*</Typography>
                        <TextField 
                            id="otp" 
                            required 
                            fullWidth
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            sx={{ 
                                mb: 2, 
                                background: '#ffffff' 
                            }}
                            disabled={disabledInputOTP ? true : false}
                        />
                    </Grid>
                    <Grid item xs={5} sm={4} md={4} lg={4} spacing={4}>
                        <Button 
                            variant="contained" 
                            sx={{ 
                                py: { xs: 1.1 },
                                background: '#ffc841', 
                                color:'#000000', 
                                fontWeight: 500, 
                                mb: 1, 
                                ml: { sm: 1, xs: 1}, mt: { sm: 2, xs: 2} 
                            }}
                            onClick={handleClickOTP}
                            fullWidth
                            disabled={otpSent && countdown > 0 ? true : false}
                        >
                            {otpSent && countdown > 0
                            ? `${countdown}s`
                            : 'Send OTP'}
                        </Button>
                    </Grid>
                </Grid>
            </>}
            <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                    background: '#ffc841',
                    color:'#000000', 
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'none', 
                    my: 3 
                }}
                onClick={() => form ? handleClickChangePassword() : handleClickProceed()}
            >
                Proceed
            </Button>
        </DialogContent>
    )
}