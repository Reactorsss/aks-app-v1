import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from '../page.module.css';
import { 
    Box,
    Button,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    TextField, 
    Typography
} from "@mui/material"
import { MdOutlineClose } from "react-icons/md";
import { 
    setAlertMessage,
    setAlertOpen,
    setAlertSeverity,
    setIsLoading,
    setOpenLoginModal, 
    setOpenPassModal
} from "../store/slice";
import Image from "next/image";
import { Images } from "../ts/images";
import axios from "axios";
import { useRouter } from "next/navigation";
import Encryption from "../ts/encryption";

interface LoginFormProps {
    form: boolean
}

export default function LoginForm({ form }: LoginFormProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [mobileNo, setMobileNo] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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

    const handleClickLogin = () => {
        dispatch(setIsLoading(true));
        if(mobileNo === '' || mobileNo.length < 11 || password === ''){
            if(mobileNo === '' || mobileNo.length < 11) {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Please enter your 11-digit mobile number.'));
                dispatch(setAlertSeverity('error'));
            }
            else if(password === '') {
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Please enter your correct password.'));
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
            axios.get('/api/read/ip').then(res => {
                axios.post('/api/login', {
                    p_mobile_no: mobileNo,
                    p_passwordhash: password,
                    p_ip_address: res.data.ip
                }).then(response => {
                    if(response.data.data[0].response_code >= 0) {
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage('Login Successful'));
                        dispatch(setAlertSeverity('success'));
                        setMobileNo('')
                        setPassword('')
                        dispatch(setOpenLoginModal(false))
                        dispatch(setIsLoading(false));

                        router.push('/dashboard/' + Encryption(JSON.stringify(response.data.data[0].response_message)))
                    }
                    else {
                        dispatch(setIsLoading(false));
                        dispatch(setAlertOpen(true));
                        dispatch(setAlertMessage(response.data.data[0].response_message));
                        dispatch(setAlertSeverity('error'));
                    }
                }).catch(err => {
                    dispatch(setAlertOpen(true));
                    dispatch(setAlertMessage('Internal Server Error'));
                    dispatch(setAlertSeverity('error'));
                    dispatch(setIsLoading(false))
                    console.error(err)
                })
            })
        }
    }

    return(
        <Box>
            {form ?
            <>
                <FormHelperText 
                    id="mag-login"
                    sx={{ fontSize: '11px', color: '#ffffff' }}
                >
                    Mag-login
                </FormHelperText>
                <FormControl
                    variant="standard" 
                    sx={{ 
                        mr: 1, 
                        maxWidth: '160px',
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            color: "#595959",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: "1px",
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                            },
                        },
                        "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                                color: "#595959",
                            },
                        }
                    }}
                >
                    <TextField
                        placeholder="Phone Number"
                        id="outlined-size-login"
                        size="small"
                        onChange={handleChangeMobileNo}
                        value={mobileNo}
                    />
                </FormControl>
                <FormControl
                    variant="standard" 
                    sx={{ 
                        mr: 1, 
                        maxWidth: '170px',
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            color: "#595959",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: "1px",
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                            },
                        },
                        "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                                color: "#595959",
                            },
                        }
                    }}
                >
                    <TextField
                        placeholder="Password"
                        id="outlined-size-password"
                        size="small"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormHelperText 
                        id="forgot-password" 
                        sx={{ fontSize: '11px', color: '#fff', cursor: 'pointer' }}
                        onClick={() => dispatch(setOpenPassModal(true))}
                    >
                        Forgot Password ?
                    </FormHelperText>
                </FormControl>
                <Button 
                    variant="contained"
                    sx={{ 
                        textTransform: 'uppercase',
                        background: '#ffffff',
                        color:'#10aee5',
                        fontWeight: 600,
                        py: 1,
                    }}
                    size="small"
                    fullWidth={form ? false : true}
                    onClick={handleClickLogin}
                >
                    Login
                </Button>
            </> : 
            <>
                <DialogContent className={styles.backgroundModalLogin} sx={{ p: 2 }}>
                    <Grid 
                        container 
                        direction='row' 
                        justifyContent='flex-end'
                    >
                        <MdOutlineClose 
                            className={styles.closeModalLogin} 
                            onClick={() => dispatch(setOpenLoginModal(false))}
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
                            src={Images.idLight} 
                            // src={Images.logoBlue} 
                            alt="logo" 
                            // style={{ width: '140px', height: 'auto' }} 
                            style={{ width: '120px', height: 'auto' }} 
                            priority 
                            sizes="80vw"
                        />
                    </Grid>
                    <Box sx={{ my: 2 }}>
                        <FormControl 
                            fullWidth
                            variant="standard" 
                            sx={{ 
                                mb: 2, 
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    color: "#595959",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                        borderWidth: "1px",
                                    },
                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#fff",
                                        },
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    "&.Mui-focused": {
                                        color: "#595959",
                                    },
                                }
                            }}
                        >
                            <TextField
                                label='Phone Number'
                                id="outlined-size-login"
                                className={styles.inter}
                                onChange={handleChangeMobileNo}
                                value={mobileNo}
                            />
                        </FormControl>
                        <FormControl 
                            fullWidth
                            variant="standard" 
                            sx={{ 
                                mb: 2, 
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    color: "#595959",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                        borderWidth: "1px",
                                    },
                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#fff",
                                        },
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    "&.Mui-focused": {
                                        color: "#595959",
                                    },
                                }
                            }}
                        >
                            <TextField
                                label="Password"
                                id="outlined-size-password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Typography
                                textAlign='end'
                                className={styles.inter}
                                sx={{ 
                                    fontSize: '13.5px',
                                    fontWeight: 500,
                                    color: '#595959',
                                    cursor: 'pointer',
                                    my: 1
                                }}
                                onClick={() => {
                                    dispatch(setOpenPassModal(true))
                                    dispatch(setOpenLoginModal(false))
                                }}
                            >
                                Forgot Password ?
                            </Typography>
                        </FormControl>
                        <Button 
                            variant="contained"
                            sx={{ 
                                textTransform: 'uppercase', 
                                background: '#fff', 
                                color:'#10aee5', 
                                fontWeight: 600 
                            }}
                            onClick={handleClickLogin}
                            fullWidth
                        >
                            Login
                        </Button>
                    </Box>
                </DialogContent>
            </>}
        </Box>
    )
}