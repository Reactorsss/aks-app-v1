'use client';

import Loading from "@/app/component/loading";
import { setIsLoading } from "@/app/store/slice";
import { RootState } from "@/app/store/store";
import { Images } from "@/app/ts/images";
import { useWindowSize } from "@/app/ts/size";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from '../../../page.module.css';

export default function Verification() {
    const windowSize = useWindowSize();
    const pathName = usePathname();
    const params: any = pathName.split('/');
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.data.isLoading);
    const router = useRouter();
    const [data, setData] = useState<any>('')
    const [photo, setPhoto] = useState<any>('')
    const [hide, setHide] = useState<boolean>(true)
    const [group, setGroup] = useState<any>('')

    useEffect(() => {
        console.log(params)
        dispatch(setIsLoading(true))
        if(params[2]) {
            axios.post('/api/session/mobile', {
                p_mobile_no: params[2]
            }).then((response) => {
                setData(response.data.data[0])
                if(response.data.data[0].id > 0) {
                    if(response.data.data[0].group_type === '0') {
                        setGroup(response.data.data[0].biker_solo)
                    }
                    else if(response.data.data[0].group_type === '1') {
                        setGroup(response.data.data[0].el_presidente)
                    }
                    else if(response.data.data[0].group_type === '2') {
                        setGroup(response.data.data[0].other_platforms)
                    }
                    else if(response.data.data[0].group_type === '3') {
                        setGroup(response.data.data[0].rider_group)
                    }
                    else if(response.data.data[0].group_type === '4') {
                        setGroup(response.data.data[0].toda)
                    }
                    else if(response.data.data[0].group_type === '5') {
                        setGroup(response.data.data[0].poda)
                    }
                    else if(response.data.data[0].group_type === '6') {
                        setGroup(response.data.data[0].e_trike)
                    }
                    else if(response.data.data[0].group_type === '7') {
                        setGroup(response.data.data[0].e_bike)
                    }
                    else if(response.data.data[0].group_type === '8') {
                        setGroup(response.data.data[0].informal_worker)
                    }
                    else if(response.data.data[0].group_type === '9') {
                        setGroup(response.data.data[0].industry_worker)
                    }
                    else if(response.data.data[0].group_type === '10') {
                        setGroup(response.data.data[0].passenger)
                    }
                    else if(response.data.data[0].group_type === '11') {
                        setGroup(response.data.data[0].student.toLowerCase() === 'yes' ? 'Student/Estudyante' : '')
                    }
    
                    axios.get('/api/read/ip').then(response2 => {
                        axios.post('/api/read/photo', {
                            p_customer_id: response.data.data[0].id,
                            p_ip_address: response2.data.ip
                        }).then(async(result) => {
                            dispatch(setIsLoading(false))
                            setHide(false)
                            if(result.data.data[0].customer_id >= 0) {
                                setPhoto(`${Buffer.from(result.data.data[0].image_data).toString('base64')}`)
                            }
                            else {
                                setPhoto('')
                            }
                        }).catch(err => console.error(err))
                    }).catch(err => console.error(err))
                }
                else {
                    dispatch(setIsLoading(false))
                    let timerInterval: any;
                    Swal.fire({
                        title: "No data",
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
            })
        }
        else {
            dispatch(setIsLoading(false))
            let timerInterval: any;
            Swal.fire({
                title: "Access Denied",
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
    }, [])

    return(
        <>
        {hide ? <Loading open={isLoading} /> :
        <Box className={styles.container}>
            <Box 
                sx={{ background: '#f2f2f9' }} 
                style={{ 
                    width: windowSize.width > 414 ? '414px' : `${windowSize.width}px`, 
                    height: '100vh' 
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                    <Image src={Images.idLight} alt="HR" width={150}/>
                </Box>
                <Typography 
                    textAlign='center' 
                    sx={{ my: 3, 
                    fontWeight: 800, 
                    fontSize: '20px', 
                    textTransform: 'uppercase', 
                    color: '#10aee5' 
                    }}
                >
                    Angkasangga Digital ID
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {photo === 'null' || photo === '' ?
                    data.gender === 'Male' ?
                    <Image 
                        src={Images.male} 
                        alt="profile" 
                        width={130} 
                        height={130} 
                        className='image' 
                    /> :
                    data.gender === 'Female' ?
                    <Image 
                        src={Images.female} 
                        alt="profile" 
                        width={130} 
                        height={130} 
                        className='image' 
                    /> :
                    <Image 
                        src={Images.profilepic} 
                        alt="profile pic" 
                        width={130} 
                        height={130} 
                        className='image' 
                    />  :
                    <Image 
                        src={`data:image/jpeg;base64,${photo}`} 
                        alt="profile" 
                        width={130} 
                        height={130} 
                        className='image' 
                    />
                }
                </Box>
                <Box sx={{ p: 5 }}>
                    <TextField
                        id="name"
                        label="Name"
                        value={`${data.last_name}, ${data.first_name} ${data.middle_name}`}
                        variant="filled"
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ background: '#ffffff', mb: 2 }}
                        fullWidth
                    />
                    <TextField
                        id="id"
                        label="Referral"
                        value={`${data.id_no_display}`}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ background: '#ffffff' }}
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Group"
                        value={`${group}`}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{ background: '#ffffff' }}
                        fullWidth
                        variant="filled"
                    />
                </Box>
            </Box>
            <Loading open={isLoading} />
        </Box>}
        </>
    )
}