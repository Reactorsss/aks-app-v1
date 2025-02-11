'use client';

import { Images } from "@/app/ts/images";
import { Box, Container, Grid, TextField, Typography, Button, Tooltip, IconButton, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, DialogContent, TablePagination, Divider, Avatar } from "@mui/material";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import Image from "next/image";
import styles from '../../../page.module.css';
import { FaUserEdit, FaSignOutAlt, FaHandHoldingUsd, FaFacebookF, FaInstagram, FaViber, FaTelegramPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setIsLoading, setOpenDigitalID, setOpenDonateModal } from "@/app/store/slice";
import Decryption from "@/app/ts/descryption";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "@/app/component/loading";
import { MdOutlineClose } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import IdCard from "@/app/component/idCard";
import dayjs from "dayjs";
import Donate from "@/app/component/donate";
import { useQRCode } from "next-qrcode";
import { useWindowSize } from "@/app/ts/size";

export default function Dashboard() {
    const widthSize = useWindowSize();
    const { Canvas } = useQRCode();
    const dispatch = useDispatch();
    const generatePdf = useRef(null);
    const isLoading = useSelector((state: RootState) => state.data.isLoading);
    const openDigitalID = useSelector((state: RootState) => state.data.openDigitalID);
    const openDonateModal = useSelector((state: RootState) => state.data.openDonateModal);
    const [openQR, setOpenQR] = useState<boolean>(false);
    const [openNews, setOpenNews] = useState<boolean>(false);
    const [referral2, setReferral2] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [refDirect, setRefDirect] = useState<any>([]);
    const [refIndirect, setRefIndirect] = useState<any>([]);
    const [refAll, setRefAll] = useState<any>([]);
    const [refTable, setRefTable] = useState<string>('all');
    const router = useRouter();
    const pathName = usePathname();
    const params: any = pathName.split('/');
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickLogout = () => {
        Swal.fire({
            icon: 'question',
            title: 'Logout',
            text: 'Are you sure you want to logout ?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((res) => {
            if(res.isConfirmed) {
                dispatch(setIsLoading(true))
                sessionStorage.setItem('logout', 'true')
                axios.get('/api/read/ip').then(res => {
                    axios.post('/api/login', {
                        p_mobile_no: data.mobile_no,
                        p_passwordhash: data.passwordhash,
                        p_ip_address: res.data.ip
                    }).then(() => {
                        dispatch(setIsLoading(false))
                        router.push('/')
                    })
                })
            }
        })
    }

    const handleClickReferrals = () => {
        dispatch(setIsLoading(true))
        axios.post('/api/referral/direct', {
            p_filter: '0',
            p_referrer_id_no: data.id_no,
            p_referrer_name: ''
        }).then(response => {
            setRefDirect(response.data.data)
            axios.post('/api/referral/indirect', {
                p_filter: '0',
                p_referrer_id_no: data.id_no,
                p_referrer_name: ''
            }).then(resp => {
                setRefIndirect(resp.data.data)
                setRefAll(response.data.data.concat(resp.data.data))
                dispatch(setIsLoading(false))
                setReferral2(true)
            }).catch(err => {
                dispatch(setIsLoading(false))
                console.log(err)
            })
        }).catch(err => {
            dispatch(setIsLoading(false))
            console.log(err)
        })
    }

    useEffect(() => {
        try {
            dispatch(setIsLoading(true))
            if(JSON.parse(Decryption(params[2]))) {
                axios.post('/api/session', {
                    p_session_token: JSON.parse(Decryption(params[2]))
                }).then(response => {
                    if(response.data.data[0].id > 0) {
                        dispatch(setIsLoading(false))
                        setData(response.data.data[0])
                        axios.get('/api/read/ip').then(response2 => {
                            axios.post('/api/read/photo', {
                                p_customer_id: response.data.data[0].id,
                                p_ip_address: response2.data.ip
                            }).then(async(result) => {                                    
                                if(result.data.data[0].customer_id >= 0) {
                                    setImageBase64(`${Buffer.from(result.data.data[0].image_data).toString('base64')}`)
                                    dispatch(setIsLoading(false))
                                }
                                else {
                                    setImageBase64('')
                                    dispatch(setIsLoading(false))
                                }
    
                            }).catch(err => {
                                dispatch(setIsLoading(false))
                                console.error(err)
                            })
                        })
                    }
                    else {
                        dispatch(setIsLoading(false))
                        let timerInterval: any;
                        Swal.fire({
                            title: "Session Expired!",
                            html: "Redirecting to home page...",
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                sessionStorage.removeItem('agree')
                                router.push('/')
                            }
                        });
                    }
                }).catch(error => {
                    dispatch(setIsLoading(false))
                    let timerInterval: any;
                    Swal.fire({
                        title: "Invalid Session Token!",
                        html: "Please re-login again.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            sessionStorage.removeItem('agree')
                            router.push('/')
                        }
                    });
                    console.log(error)
                })
            }
            else {
                dispatch(setIsLoading(false))
                let timerInterval: any;
                Swal.fire({
                    title: "Invalid Session Token!",
                    html: "Redirecting... Please login.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        sessionStorage.removeItem('agree')
                        router.push('/')
                    }
                });
            }
        } catch (error) {
            console.error(error)
            dispatch(setIsLoading(false))
            router.push('/');
        }
    }, [])

    const handleGeneratePdf = async () => {
        const inputData: any = generatePdf.current
        const pdf = new jsPDF("p", "in", "a4");
        const canvas = await html2canvas(inputData)
        // Step 3: Add the captured canvas image to the PDF
        const imgData = canvas.toDataURL("image/png");

        // A4 size in inches is 8.27 x 11.69
        const xOffset = (8.27 - 4.8) / 2; // Center the ID card horizontally on A4 paper
        const yOffset = (11.69 - 5.5) / 2; // Center the ID card vertically on A4 paper

        // Step 4: Add the image to the PDF (using 3.5 x 2.5 inches ID card size)
        pdf.addImage(imgData, "PNG", xOffset, yOffset, 4.8, 5.5);

        // Step 5: Save the PDF
        pdf.save("ID_card.pdf");
    }  

    return(
        <Box sx={{ display:'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Container maxWidth="sm">
                {referral2 &&
                <Button 
                    className={styles.interFont} 
                    variant="text" startIcon={<MdArrowBackIos 
                    style={{ color: '#1da7db' }}/>} sx={{ fontSize: 20, fontWeight: 700, color: '#1da7db', textTransform: 'none' }}
                    onClick={() => setReferral2(false)}
                >
                    Back
                </Button>}
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item>
                        <Image src={Images.idLight} alt="logo" width={100} />
                    </Grid>
                    <Grid item>
                        <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {imageBase64 ?
                                    // <Image 
                                    //     src={`data:image/jpeg;base64,${imageBase64}`}
                                    //     style={{ 
                                    //         width: widthSize.width < 380 ? 100 : 155,
                                    //         height: widthSize.width < 380 ? 100 : 155,
                                    //         left: -10
                                    //     }}
                                    //     alt="user"
                                    // />
                                    <Avatar
                                        alt={'user'}
                                        src={`data:image/jpeg;base64,${imageBase64}`}
                                        sx={{ 
                                            width: widthSize.width < 380 ? 100 : 165,
                                            height: widthSize.width < 380 ? 100 : 165,
                                            left: widthSize.width < 380 ? -8 : -12
                                        }}
                                    />
                                :
                                    data.gender ?
                                    <Avatar
                                        alt={'user'}
                                        src={data.gender === 'Male' ? Images.male.src : Images.female.src}
                                        sx={{ 
                                            width: 120,
                                            height: 120,
                                            left: -10
                                        }}
                                    /> :
                                    <Avatar
                                        alt={'user'}
                                        src={''}
                                        sx={{ 
                                            width: 120,
                                            height: 120,
                                            left: -10
                                        }}
                                    />
                                }
                            </Box>
                            <Image src={Images.logo107} alt="logo 107" style={{ width: '100%', height: 'auto', zIndex: 1 }} />
                        </Box>
                        <Typography variant="h5" textAlign='center' sx={{ fontWeight: 800, mb: 1 }} className={styles.interFont}>
                            {referral2 ? 'My Referral List' : `Hi! Kasangga, ${data.first_name ? data.first_name : 'loading...'}`}
                        </Typography>
                        <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 12, fontWeight: 300, mb: 2 }}>
                            Maari mong gamitin ang iyong referral APL ID number at mag-imbita ng bagong miyembro na mag-register para ikaw ay manalo ng papremyo o ayuda sa darating na events!
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                slotProps={{
                                    input: {
                                        inputProps: {
                                            style: {
                                                textAlign: 'center',
                                                fontWeight: 800,
                                                fontSize: 30,
                                                padding: 10,
                                                border: '2px solid #1da7db',
                                                borderRadius: 5
                                            }
                                        },
                                    },
                                    inputLabel: {
                                        style: {
                                            textAlign: 'center',
                                            fontWeight: 500,
                                            fontSize: 15
                                        }
                                    }
                                }}
                                value={data.id_no_display}
                                // label="Referral ID Number"
                                className={styles.interFont}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        {referral2 === false &&
                        <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 12, fontWeight: 300, mb: 2 }}>
                            Kumpletuhin ang iyong member profile para makakuha ng karagdagang impormasyon at mas malaking chansa na manalo ng mga papremyo. ANGKASangga! I-click na ang&nbsp;
                            <span style={{ color: '#1da7db', fontWeight: 500 }}>
                                <FaUserEdit style={{ color: '#1da7db', marginRight: 2 }} />
                                Edit Profile
                            </span>
                        </Typography>}
                    </Grid>
                    <Grid item  sx={{ width: '100%', my: 2 }}>
                        {referral2 ?
                        <Box>
                            <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                <Grid item xs={4} sm={4}>
                                    <Box sx={{ background: '#1da7db', borderRadius: 3, p: refTable === 'all' ? 2 : 1, minWidth: '100%', cursor: 'pointer' }} onClick={() => setRefTable('all')}>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 800, color: '#fff', fontSize: 25 }}>{refAll.length}</Typography>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 400, color: '#fff', fontSize: 12 }}>Total Referral Count</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Box sx={{ background: '#34c2e8', borderRadius: 3, p: refTable === 'direct' ? 2 : 1, minWidth: '100%', cursor: 'pointer' }} onClick={() => setRefTable('direct')}>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 800, color: '#fff', fontSize: 25 }}>{refDirect.length}</Typography>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 400, color: '#fff', fontSize: 12 }}>Total Direct Referrers</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Box sx={{ background: '#5ccbe6', borderRadius: 3, p: refTable === 'indirect' ? 2 : 1, minWidth: '100%', cursor: 'pointer' }} onClick={() => setRefTable('indirect')}>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 800, color: '#fff', fontSize: 25 }}>{refIndirect.length}</Typography>
                                        <Typography className={styles.interFont} textAlign='center' sx={{ fontWeight: 400, color: '#fff', fontSize: 12 }}>Total Indirect Referrers</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <TableContainer sx={{ mt: 4, border: '1px solid #B3BEC1', borderRadius: 3 }}>
                                <Table>
                                    <TableHead sx={{ background: '#bfcdda' }}>
                                        <TableRow>
                                            {/* <TableCell className={styles.interFont} sx={{ textAlign: 'center' }}>Level</TableCell> */}
                                            <TableCell className={styles.interFont}>APL ID No.</TableCell>
                                            <TableCell className={styles.interFont}>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {refTable === "all" ?
                                        refAll.length > 0 ?
                                        refAll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res: any, index: any) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell className={styles.interFont}>
                                                        {res.id_no_display}
                                                    </TableCell>
                                                    <TableCell className={styles.interFont}>
                                                        {`${res.first_name} ${res.middle_name} ${res.last_name}`}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} className={styles.interFont} sx={{ textAlign: 'center' }}>No available data</TableCell>
                                        </TableRow>
                                        : 
                                        refTable === 'direct' ?
                                        refDirect.length > 0 ?
                                        refDirect.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res: any, index: any) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell className={styles.interFont}>
                                                        {res.id_no_display}
                                                    </TableCell>
                                                    <TableCell className={styles.interFont}>
                                                        {`${res.first_name} ${res.middle_name} ${res.last_name}`}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} className={styles.interFont} sx={{ textAlign: 'center' }}>No available data</TableCell>
                                        </TableRow>
                                        :
                                        refTable === 'indirect' ?
                                        refIndirect.length > 0 ?
                                        refIndirect.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res: any, index: any) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell className={styles.interFont}>
                                                        {res.id_no_display}
                                                    </TableCell>
                                                    <TableCell className={styles.interFont}>
                                                        {`${res.first_name} ${res.middle_name} ${res.last_name}`}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} className={styles.interFont} sx={{ textAlign: 'center' }}>No available data</TableCell>
                                        </TableRow>
                                        :
                                        <TableRow>
                                            <TableCell colSpan={3} className={styles.interFont} sx={{ textAlign: 'center' }}>No available data</TableCell>
                                        </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={refTable === 'all' ? refAll.length : refTable === 'direct' ? refDirect.length : refTable === 'indirect' ? refIndirect.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    className={styles.poppinsRegular}
                                />
                            </TableContainer>
                        </Box>
                        :
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
                            <Grid item>
                                <Image 
                                    src={Images.EditProfile} 
                                    alt="edit-profile" 
                                    width={75} 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => router.push(`/profile/${params[2]}`)}
                                />
                                <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 11 }}>
                                    Edit Profile
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Image 
                                    src={Images.ViewDigitalID} 
                                    alt="view-digital-id" 
                                    width={75} 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        dispatch(setOpenDigitalID(true))
                                        setScroll('paper')
                                    }}
                                />
                                <Typography 
                                    textAlign='center'
                                    className={styles.interFont} 
                                    sx={{ fontSize: 11 }}
                                >
                                    View Digital ID
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Image src={Images.ViewQRCode} alt="view-qrcode" width={75} style={{ cursor: 'pointer' }} onClick={() => setOpenQR(true)}/>
                                <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 11 }}>
                                    View QR Code
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Image 
                                    src={Images.MyReferrals} 
                                    alt="my-referrals" 
                                    width={75} 
                                    onClick={handleClickReferrals}
                                    style={{ cursor: 'pointer' }}
                                />
                                <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 11 }}>
                                    My Referrals
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Image src={Images.News} alt="news" width={75} style={{ cursor: data.birth_date && data.formatted_address && data.region && data.province_district && data.barangay && data.city_municipality ? 'pointer' : 'not-allowed' }} onClick={() => setOpenNews(true)}/>
                                <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 11 }}>
                                    News
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Image src={Images.Events} alt="events" width={75} style={{ cursor: data.birth_date && data.formatted_address && data.region && data.province_district && data.barangay && data.city_municipality ? 'pointer' : 'not-allowed' }}/>
                                <Typography textAlign='center' className={styles.interFont} sx={{ fontSize: 11 }}>
                                    Events
                                </Typography>
                            </Grid>
                        </Grid>}
                    </Grid>
                    <Grid item sx={{ width: '100%', my: 2 }}>
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Button 
                                    fullWidth 
                                    variant="contained"
                                    startIcon={<FaHandHoldingUsd size={17} />}
                                    sx={{ background: '#1da7db', borderRadius: 3, textTransform: 'none', fontWeight: 800 }}
                                    className={styles.interFont}
                                    onClick={() => dispatch(setOpenDonateModal(true))}
                                >
                                    Donate
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button 
                                    fullWidth 
                                    variant="contained"
                                    startIcon={<FaSignOutAlt size={15} />}
                                    sx={{ background: '#d32f2e', borderRadius: 3, textTransform: 'none', fontWeight: 800 }}
                                    className={styles.interFont}
                                    onClick={handleClickLogout}
                                >
                                    Logout
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                            <Grid item>
                                <Tooltip title='Facebook'>
                                    <IconButton sx={{ background: '#1da7db' }} className={styles.iconBtn} onClick={() => window.open('https://www.facebook.com/ANGKASanggaTayoNa', "_blank")}>
                                        <FaFacebookF size={20} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='Instagram'>
                                    <IconButton sx={{ background: '#1da7db' }} className={styles.iconBtn} onClick={() => window.open('https://www.instagram.com/angkasangga/', '_blank')}>
                                        <FaInstagram size={20} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='Viber'>
                                    <IconButton sx={{ background: '#1da7db' }} className={styles.iconBtn} onClick={() => window.open('https://invite.viber.com/?g2=AQBgbyyheD5APFNphixf%2BNRcnqF0oUoC0xJJ3Eaipj0ZS2KWkDHWZN%2BJvBzzH9il&fbclid=IwY2xjawFrIppleHRuA2FlbQIxMAABHaP40tu5JDUuaEBZSk3ZwPUm5U0fVGPTFGe6dl94q4mNp1sk6QFtj2MsCw_aem_lnW7ItosYQ9-bq0GEpcazA&lang=en', '_blank')}>
                                        <FaViber size={20} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='Telegram'>
                                    <IconButton sx={{ background: '#1da7db' }} className={styles.iconBtn} onClick={() => window.open('https://t.me/angkasangga', '_blank')}>
                                        <FaTelegramPlane size={20} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Loading open={isLoading} />
            <Dialog open={openDigitalID} scroll={scroll} fullWidth>
                <Grid container direction='row' justifyContent='flex-end'>
                    <Grid item>
                        <MdOutlineClose 
                            size={20} 
                            style={{ cursor: 'pointer', color: '#000', margin: '1rem' }} 
                            onClick={() => dispatch(setOpenDigitalID(false))}
                        />
                    </Grid>
                </Grid>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box>
                        <Typography 
                            textAlign='center' 
                            sx={{ fontWeight: 800, fontSize: {xs: '15px', lg: '27px'}, textTransform: 'uppercase' }}
                            className={styles.interFont}
                        >
                            Angkasangga ID is <span style={{ color: '#10aee5' }}>Active</span>
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'} }}
                            className={styles.interFont}
                        >
                            Kasangga! Maari mong i-download ang iyong
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'}, mb: 1 }}
                            className={styles.interFont}
                        >
                            ID at i-print sa tamang sukat.
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'} }}
                            className={styles.interFont}
                        >
                            (3.5 inches width x 2.5 inches height)
                        </Typography>
                    </Box>
                    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            sx={{ background: '#10aee5', borderRadius: '20px', my: 2, textTransform: 'none', fontWeight: 600, fontSize: '18px' }}
                            className={styles.interFont}
                            onClick={() => handleGeneratePdf()}
                        >
                            Download PDF
                        </Button>
                    </Box>
                    <Box sx={{ display: {xs: 'flex', sm: 'none'}, justifyContent: 'center' }}>
                        <Typography textAlign='center' variant="body2" sx={{ m: 3 }} className={styles.interFont}>
                            Note: Use Landscape mode to view the ID card
                        </Typography>
                    </Box>
                    <Box ref={generatePdf} id="contentToCapture">
                        <IdCard
                            profile={imageBase64} 
                            name={`${data.last_name}, ${data.first_name} ${data.middle_name}`} 
                            IdNo2={`APL-${data.id_no}`} 
                            gender={data.gender}
                            street={data.formatted_address ? `${data.formatted_address.split('&')[0]} ${data.formatted_address.split('&')[1]}` : ''}
                            brgy={data.barangay}
                            city={data.city_municipality}
                            birthdate={dayjs(data.birth_date).format('YYYY-MM-DD') === 'Invalid Date' ? '' : dayjs(data.birth_date).format('YYYY-MM-DD')}
                            session={params[2]}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog open={openDonateModal} maxWidth='xs' fullWidth>
                <Donate />
            </Dialog>
            <Dialog open={openQR} maxWidth='xs' fullWidth>
                <DialogContent sx={{ background: '#14abe3' }}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <Grid item>
                            <MdOutlineClose size={20} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => {
                                setOpenQR(false)
                            }}/>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ mb: 3 }}>
                        <Grid item>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Image src={Images.idDark} alt="logo" width={180}/>
                            </Box>
                            <Typography textAlign='center' sx={{ color: '#fff', fontWeight: 500 }} variant="body1" className={styles.interFont}>Your Referral / ID Number: </Typography>
                            <Box sx={{ background: '#fff', py: 1, px: 2, borderRadius: '20px', mb: 3, mt: 1 }}>
                                <Typography textAlign='center' sx={{ fontWeight: 800 }} variant="h6" className={styles.interFont}>
                                    {data.id_no_display}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Canvas
                                    text={`${process.env.NEXT_PUBLIC_INT_URL_VERIF}/${params[2]}`}
                                    options={{
                                        errorCorrectionLevel: 'M',
                                        margin: 2,
                                        scale: 5,
                                        width: 150,
                                        color: {
                                            dark: '#000000',
                                            light: '#ffffff',
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={openNews} maxWidth='xs' fullWidth>
                <DialogContent sx={{ background: '#ebf3fa' }}>
                    <Typography variant="h6" textAlign='center' sx={{ fontWeight: 700 }} className={styles.interFont}>
                        ANGKASangga News
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }}  onClick={() => window.open('https://www.facebook.com/PhilippineSTAR/posts/pfbid035BLUX13Tr39ZmPfR2JhVAzbbucVzdjCrWAvKeE8By9bPFtLDJnVMFJTp48FS5BJ9l?rdid=Ee9JoEcc6UWOuseE', "_blank")}/>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            Ang Kasangga partylist first nominee and Angkas CEO George Royeca. Ang Kasangga partylist first nominee and Angkas CEO George Royeca participates in...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news2} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }}  onClick={() => window.open('https://www.manilatimes.net/2024/09/20/news/national/angkas-boss-running-for-congress/1972624', "_blank")}/>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            Angkas boss running for Congress. George Royeca, CEO of ride hailing app Angkas, has thrown his hat into the political ...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news3} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={() => window.open('https://www.philstar.com/opinion/2024/09/17/2385771/my-personal-journey-empower-informal-workers', "_blank")}/>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            My personal journey to empower informal workers. I&apos;ll be honest - I didn&apos;t want to do this. The idea of running for public office...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news4} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={() => window.open('https://www.philstar.com/opinion/2024/09/17/2385771/my-personal-journey-empower-informal-workers', "_blank")}/>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            Peddler of Hope: A misunderstood majority. The informal sector is a force that propels everyday life in our communities. Market...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news4} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} 
                                onClick={() => window.open('https://www.philstar.com/opinion/2024/09/03/2382410/building-scale-lessons-angkas-developing-apps-global-impact?fbclid=IwY2xjawFiG1lleHRuA2FlbQIxMAABHZFAs6BVPgTPjeroF-M3PBb_cm59v2Y9M1ZjgsEgUsmXcNsZG5tWOw6uzg_aem_MHRr1HcyBPG9nXDiCS-Etg', "_blank")}
                            />
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            Lessons from Angkas on developing apps for global impact. In the vibrant and rapidly evolving world of entrepreneurship, leveraging technology is...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news4} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={() => window.open('https://www.facebook.com/comelec.ph/posts/pfbid02xoejahyUUvbbVPdF2i5bD8mFy5EYFe4aum7FfTJ6KRbDJ5HAa2R7MCkfFmqQCrJ4l', "_blank")}/>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            EXTENDED : Deadline for Reactivation. May oras ka pa hanggang September 25, 2024 para magpa-reactivate online...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Grid item lg={5} md={5} sm={5} xs={6}>
                            <Image src={Images.news4} alt="news" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={6}>
                            <Typography variant="body2" className={styles.interFont}>
                            Bagong Pilipinas Serbisyo Fair sa Batangas! Isang malaking prebilehiyo pong masaksihan ang napakagandang programa na...
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Button variant="contained" fullWidth onClick={() => setOpenNews(false)}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}