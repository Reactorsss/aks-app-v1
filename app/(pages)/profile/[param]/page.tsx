'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {Box, 
    Button, 
    Checkbox, 
    Container, 
    DialogContent, 
    Divider, 
    FormControl, 
    FormControlLabel, 
    FormGroup, 
    FormLabel, 
    Grid, 
    MenuItem, 
    Paper, 
    Radio, 
    RadioGroup, 
    Select, 
    TextField, 
    Typography 
} from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { MdArrowBackIos } from "react-icons/md";
import { 
    setAlertMessage, 
    setAlertOpen, 
    setAlertSeverity, 
    setIsLoading, 
    setOpenDonateModal
} from "@/app/store/slice";
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Decryption from "@/app/ts/descryption";
import Loading from "@/app/component/loading";
import axios from "axios";
import Swal from 'sweetalert2';
import styles from '../../../page.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import Image from "next/image";
import Donate from "@/app/component/donate";
import IdCard from "@/app/component/idCard";
import { Images } from "@/app/ts/images";
import { 
    FaSignOutAlt, 
    FaRegAddressCard, 
    FaQrcode, 
    FaGlobe, 
    FaCamera, 
    FaHandHoldingUsd 
} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useQRCode } from "next-qrcode";
import Terms from "@/app/component/terms";
import AlertMessage from "@/app/component/alertMessage";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Profile() {
    const { Canvas } = useQRCode();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.data.isLoading);
    const openDonateModal = useSelector((state: RootState) => state.data.openDonateModal);
    const router = useRouter();
    const pathName = usePathname();
    const params: any = pathName.split('/');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(null));
    const [age, setAge] = useState<any>('');
    const [gender, setGender] = useState<string>('');
    const [contactName, setContactName] = useState('');
    const [precintNo, setPrecintNo] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [chapterType, setChapterType] = useState<any>('');
    const [bikerSolo, setBikerSolo] = useState<any>('');
    const [elPresidente, setElPresidente] = useState<any>('');
    const [otherPlatform, setOtherPlatform] = useState<any>('');
    const [riderGroup, setRiderGroup] = useState('');
    const [toda, setToda] = useState('');
    const [poda, setPoda] = useState('');
    const [eTrike, setETrike] = useState<string>('');
    const [eBike, setEBike] = useState<string>('');
    const [impormalWorker, setImpormalWorker] = useState<string>('');
    const [industriyalWorker, setIndustriyalWorker] = useState<string>('');
    const [passenger, setPassenger] = useState<string>('');
    const [refCode, setRefCode] = useState<string>('');
    const [refName, setRefName] = useState<string>('');
    const [idNo, setIdNo] = useState<string>('');    
    const [registeredVoter, setRegisteredVoter] = useState<string>('');
    const [support, setSupport] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [houseNo, setHouseNo] = useState<string>('');
    const [askSource, setAksSource] = useState<any>('');
    const [votersCount, setVotersCount] = useState<any>('');
    const [terms, setTerms] = useState<boolean>(false);
    const [editSuccess, SetEditSuccess] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [agree, setAgree] = useState<boolean>(false);
    const [option, setOption] = useState<string>('');
    const [openQR, setOpenQR] = useState<boolean>(false);
    const [openDigitalID, setOpenDigitalID] = useState<boolean>(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [region, setRegion] = useState<any[]>([]);
    const [province, setProvince] = useState<any[]>([]);
    const [municipality, setMunicipality] = useState<any[]>([]);
    const [barangay, setBarangay] = useState<any[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');
    const [selectedBarangay, setSelectedBarangay] = useState<string>('');
    const [v1, setV1] = useState(false);
    const [v2, setV2] = useState(false);
    const [v3, setV3] = useState(false);
    const [v4, setV4] = useState(false);
    const [v5, setV5] = useState(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const generatePdf = useRef(null);

    const arrOptions = [
        { title: 'Angkas Biker Solo (Active and Inactive)' },
        { title: 'Angkas El Presidente Member' },
        { title: 'Other Platforms (MoveIt, Joyride, Grab, Lalamove etc.)' },
        { title: 'Rider Groups, Clubs, Associations' },
        { title: 'TODA' },
        { title: 'PODA' },
        { title: 'E-Trike' },
        { title: 'E-Bike' },
        { title: 'Impormal na Manggagawa (small business owner, online seller, freelancer, construction, farming, etc.)' },
        { title: 'Nagtatrabaho sa mga sumusunod na industriya (agri, transpo, maliit na negosyo, etc.)' },
        { title: 'Passenger' },
        { title: 'Student' }
    ]

    const platforms = [
        { title: 'Habal-habal' },
        { title: 'FoodPanda' },
        { title: 'Grab' },
        { title: 'JoyRide' },
        { title: 'Lalamove' },
        { title: 'Lazada' },
        { title: 'MoveIt' },
        { title: 'Owto' },
        { title: 'Shopee' },
        { title: 'Toktok' },
        { title: 'Transpotify' },
        { title: 'Others' },
    ]

    const angkasanggaOpts = [
        { title: 'Angkasangga Member' },
        { title: 'Angkasangga Event' },
        { title: 'Narinig sa Pulitiko' },
        { title: 'Friends/Relatives' },
        { title: 'Facebook' },
        { title: 'Instagram' },
        { title: 'Tiktok' },
        { title: 'News' },
        { title: 'Events' },
        { title: 'Newspaper' }
    ]

    function calculateAge(birthDate: any) {
        if(birthDate === 'Invalid Date') {
            return null
        }
        else {
            const today = new Date();
            const birth = new Date(birthDate);
            
            let age = today.getFullYear() - birth.getFullYear();
            const monthDifference = today.getMonth() - birth.getMonth();
            
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            setAge(age)
        }
    }

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result as string);
                } 
                else {
                    reject('Failed to convert file');
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsLoading(true))
        const file: any = e.target.files?.[0];
        if(file?.size > 3 * 1024 * 1024) {
            dispatch(setIsLoading(false));
            dispatch(setAlertOpen(true));
            dispatch(setAlertMessage('File size exceeds 2MB limit.'));
            dispatch(setAlertSeverity('error'));
            
            return false
        }
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setImageBase64(base64.split(',')[1]);
                dispatch(setIsLoading(false));
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Successfully converting upload photo.'));
                dispatch(setAlertSeverity('success'));
            } catch (error) {
                dispatch(setIsLoading(false));
                dispatch(setAlertOpen(true));
                dispatch(setAlertMessage('Error converting upload photo.'));
                dispatch(setAlertSeverity('error'));

                console.error('Error converting file:', error);
            }
        }
    };

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

    const handleChangeRegion = (e: any) => {
        setSelectedRegion(e.target.value)
        setSelectedProvince('')
        setSelectedMunicipality('')
        setSelectedBarangay('')

        setProvince([])
        setMunicipality([])
        setBarangay([])

        dispatch(setIsLoading(true))
        if(e.target.value) {
            if(e.target.value.split('&')[1] === 'National Capital Region') {
                axios.get(`https://psgc.gitlab.io/api/regions/${e.target.value.split('&')[0]}/districts/`).then((response) => {
                    setProvince(response.data)
                    dispatch(setIsLoading(false))
                }).catch(error => console.error(error))
            }
            else {
                axios.get(`https://psgc.gitlab.io/api/regions/${e.target.value.split('&')[0]}/provinces/`).then((response) => {
                    setProvince(response.data)
                    dispatch(setIsLoading(false))
                }).catch(error => console.error(error))
            }
        }
        else {
            dispatch(setIsLoading(false))
            setProvince([])
        }
    }

    const handleChangeProvince = (e: any) => {
        setSelectedProvince(e.target.value)
        setSelectedMunicipality('')
        setSelectedBarangay('')

        setMunicipality([])
        setBarangay([])

        dispatch(setIsLoading(true))
        if(e.target.value) {
            axios.get(`https://psgc.gitlab.io/api/provinces/${e.target.value.split('&')[0]}/cities-municipalities/`).then((response) => {
                setMunicipality(response.data)
                dispatch(setIsLoading(false))
            }).catch(error => console.error(error))
        }
        else {
            dispatch(setIsLoading(false))
            setMunicipality([])
        }
    }

    const handleChangeMunicipality = (e: any) => {
        setSelectedMunicipality(e.target.value)
        setSelectedBarangay('')

        setBarangay([])

        dispatch(setIsLoading(true))
        if(e.target.value) {
            if(selectedRegion?.split('&')[1] === 'National Capital Region' && selectedProvince?.split('&')[1] === 'First District') {
                axios.get(`https://psgc.gitlab.io/api/sub-municipalities/${e.target.value.split('&')[0]}/barangays/`).then((response) => {
                    setBarangay(response.data)
                    dispatch(setIsLoading(false))
                }).catch(error => console.error(error))
            }
            else {
                axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${e.target.value.split('&')[0]}/barangays/`).then((response) => {
                    setBarangay(response.data)
                    dispatch(setIsLoading(false))
                }).catch(error => console.error(error))
            }
        }
        else {
            dispatch(setIsLoading(false))
            setBarangay([]) 
        }
    }

    const handleChangeBarangay = (e: any) => {
        setSelectedBarangay(e.target.value)
    }

    const handleChangeDistrict = (e: any) => {
        setSelectedProvince(e.target.value)
        setSelectedMunicipality('')
        setSelectedBarangay('')

        setMunicipality([])
        setBarangay([])
        
        dispatch(setIsLoading(true))
        if(selectedRegion?.split('&')[1] === 'National Capital Region' && e.target.value.split('&')[1] === 'First District') {
            axios.get(`https://psgc.gitlab.io/api/districts/${e.target.value.split('&')[0]}/sub-municipalities`).then((response) => {
                setMunicipality(response.data)
                dispatch(setIsLoading(false))
            }).catch(error => console.error(error))
        }
        else {
            axios.get(`https://psgc.gitlab.io/api/districts/${e.target.value.split('&')[0]}/cities-municipalities/`).then((response) => {
                setMunicipality(response.data)
                dispatch(setIsLoading(false))
            }).catch(error => console.error(error))
        }
    }

    const handleChangeVolunteer = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === 'v1') {
            setV1(event.target.checked)
        }
        if(event.target.name === 'v2') {
            setV2(event.target.checked)
        }
        if(event.target.name === 'v3') {
            setV3(event.target.checked)
        }
        if(event.target.name === 'v4') {
            setV4(event.target.checked)
        }
        if(event.target.name === 'v5') {
            setV5(event.target.checked)
        }
    };

    const handleClickEdit = () => {
        setDisabled(false)
        setAgree(false)
    }

    const handleClickCancel = () => {
        setDisabled(true)
    }

    const handleClickSubmit = () => {
        dispatch(setIsLoading(true))
        axios.get('/api/read/ip').then(res => {
            axios.patch('/api/update/details', {
                "p_id" : id,
                "p_birth_date" : dayjs(birthDate).format('YYYY-MM-DD') === 'Invalid Date' ? null : dayjs(birthDate).format('YYYY-MM-DD'),
                "p_region" : selectedRegion,
                "p_province_district" : selectedProvince,
                "p_city_municipality" : selectedMunicipality,
                "p_barangay" : selectedBarangay,
                "p_formatted_address" : `${houseNo}&${street}`,
                "p_email_address" : email,
                "p_photo_path_name" : null,
                "p_group_type" : option,
                "p_chapter_type" : chapterType,
                "p_volunteer_type" : `${v1 ? 'Sumama o makibahagi sa pagkampanya' : ''}&${v2 ? 'Magpaskil ng tarpaulin': ''}&${v3 ? 'Magrecruit ng kakilala' : ''}&${v4 ? 'Maging active sa social media at groupchats' : ''}&${v5 ? 'Sumali sa mga events' : ''}`,
                "p_emergency_contact_name" : contactName,
                "p_emergency_contact_no" : contactNo,
                "p_is_support" : support,
                "p_aks_source" : askSource,
                "p_gender" : gender,
                "p_biker_solo" : bikerSolo,
                "p_el_presidente" : elPresidente,
                "p_other_platforms" : otherPlatform,
                "p_rider_group" : riderGroup,
                "p_toda" : toda,
                "p_poda" : poda,
                "p_e_trike" : eTrike,
                "p_e_bike" : eBike,
                "p_industry_worker" : industriyalWorker,
                "p_informal_worker" : impormalWorker,
                "p_passenger" : passenger,
                "p_precinct" : precintNo,
                "p_ip_address" : res.data.ip
            }).then(result => {
                if(result.data.data[0].response_code >= 0) {
                    axios.patch('/api/update/details2', {
                        p_id : id,
                        p_family_voters_count : votersCount,
                        p_student : option === '11' ? 'Yes' : 'No',
                        p_ip_address : res.data.ip
                    }).then((res) => {
                        dispatch(setIsLoading(false))
                        setAgree(false)
                        if(res.data.data[0].response_code >= 0) {
                            dispatch(setAlertOpen(true))
                            dispatch(setAlertMessage(result.data.data[0].response_message))
                            dispatch(setAlertSeverity('success'))
                            setDisabled(true)
                                            
                            if(imageBase64 === '') {
                                router.refresh();
                            }
                            else {
                                dispatch(setAlertOpen(false))
                                axios.post('/api/upload', {
                                    p_customer_id: id,
                                    p_image_data: imageBase64
                                }).then(response => {
                                    if(response.data.data[0].response_code >= 0) {
                                        dispatch(setAlertOpen(true))
                                        dispatch(setAlertMessage(response.data.data[0].response_message))
                                        dispatch(setAlertSeverity('success'))
                                        SetEditSuccess(true)
                                        setOpenQR(true)
                                        setTimeout(() => {
                                            router.refresh();
                                        }, 2000)
                                    }
                                    else {
                                        setDisabled(true)
                                        setAgree(false)
                                        dispatch(setIsLoading(false))
                                        dispatch(setAlertOpen(true))
                                        dispatch(setAlertMessage(response.data.data[0].response_message))
                                        dispatch(setAlertSeverity('error'))
                                    }
                                }).catch(err => {
                                    setDisabled(true)
                                    setAgree(false)
                                    setImageBase64('')
                                    dispatch(setIsLoading(false))
                                    dispatch(setAlertOpen(true))
                                    dispatch(setAlertMessage('Internal Server Error'))
                                    dispatch(setAlertSeverity('error'))
                                    
                                    console.error(err)
                                })
                            }
                        }
                        else {
                            setDisabled(true)
                            setAgree(false)
                            dispatch(setIsLoading(false))
                            dispatch(setAlertOpen(true))
                            dispatch(setAlertMessage(res.data.data[0].response_message))
                            dispatch(setAlertSeverity('error'))
                        }
                    }).catch(err => console.error(err))
                }
                else {
                    setDisabled(true)
                    setAgree(false)
                    dispatch(setIsLoading(false))
                    dispatch(setAlertOpen(true))
                    dispatch(setAlertMessage(result.data.data[0].response_message))
                    dispatch(setAlertSeverity('error'))
                }
            }).catch(err => {
                setDisabled(true)
                setAgree(false)
                dispatch(setIsLoading(false))
                dispatch(setAlertOpen(true))
                dispatch(setAlertMessage('Internal Server Error'))
                dispatch(setAlertSeverity('error'))

                console.error(err)
            })
        })
    }

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
                        p_mobile_no: mobileNo,
                        p_passwordhash: password,
                        p_ip_address: res.data.ip
                    }).then(() => {
                        dispatch(setIsLoading(false))
                        router.push('/')
                    })
                })
            }
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
                        setId(response.data.data[0].id)
                        setPassword(response.data.data[0].passwordhash)
                        calculateAge(dayjs(response.data.data[0].birth_date).format('YYYY-MM-DD'))
                        setLastName(response.data.data[0].last_name)
                        setFirstName(response.data.data[0].first_name)
                        setMiddleName(response.data.data[0].middle_name)
                        setSuffix(response.data.data[0].suffix)
                        setBirthDate(response.data.data[0].birth_date)
                        setGender(response.data.data[0].gender)
                        setEmail(response.data.data[0].email_address)
                        setSelectedRegion(response.data.data[0].region)
                        setSelectedProvince(response.data.data[0].province_district)
                        setSelectedMunicipality(response.data.data[0].city_municipality)
                        setSelectedBarangay(response.data.data[0].barangay)
                        setMobileNo(response.data.data[0].mobile_no)
                        setContactName(response.data.data[0].emergency_contact_name)
                        setContactNo(response.data.data[0].emergency_contact_no)
                        setOption(response.data.data[0].group_type)
                        setIdNo(response.data.data[0].id_no_display)
                        setRegisteredVoter(response.data.data[0].is_registered_voter)
                        setSupport(response.data.data[0].is_support)
                        setBikerSolo(response.data.data[0].biker_solo)
                        setElPresidente(response.data.data[0].el_presidente)
                        setOtherPlatform(response.data.data[0].other_platforms)
                        setRiderGroup(response.data.data[0].rider_group)
                        setToda(response.data.data[0].toda)
                        setPoda(response.data.data[0].poda)
                        setETrike(response.data.data[0].e_trike)
                        setEBike(response.data.data[0].e_bike)
                        setImpormalWorker(response.data.data[0].informal_worker)
                        setIndustriyalWorker(response.data.data[0].industry_worker)
                        setV1(response.data.data[0].volunteer_type?.split('&')[0] ? true: false)
                        setV2(response.data.data[0].volunteer_type?.split('&')[1] ? true: false)
                        setV3(response.data.data[0].volunteer_type?.split('&')[2] ? true: false)
                        setV4(response.data.data[0].volunteer_type?.split('&')[3] ? true: false)
                        setV5(response.data.data[0].volunteer_type?.split('&')[4] ? true: false)
                        setRefCode(response.data.data[0].referrer_id_no)
                        setHouseNo(response.data.data[0].formatted_address?.split('&')[0] === 'undefined' ? '' : response.data.data[0].formatted_address?.split('&')[0])
                        setStreet(response.data.data[0].formatted_address?.split('&')[1] === 'undefined' ? '' : response.data.data[0].formatted_address?.split('&')[1])
                        setPrecintNo(response.data.data[0].precinct)
                        setAksSource(response.data.data[0].aks_source)
                        setChapterType(response.data.data[0].chapter_type)
                        setPassenger(response.data.data[0].passenger)
                        setVotersCount(response.data.data[0].family_voters_count)

                        if(sessionStorage.getItem('agree') !== '1') {
                            setScroll('paper')
                            setTerms(true)
                        }

                        axios.get('/api/read/ip').then(response2 => {
                            axios.post('/api/read/id', {
                                p_id_no: `APL-${response.data.data[0].referrer_id_no}`,
                                p_ip: response2.data.ip
                            }).then((response3) => {
                                if(response3.data.data[0].id > 0) {
                                    setRefName(`${response3.data.data[0].first_name} ${response3.data.data[0].last_name}`)
                                }
                                else {
                                    setRefName('')
                                }
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
                            }).catch(err => {
                                dispatch(setIsLoading(false))
                                console.error(err)
                            })
                        }).catch(err => {
                            dispatch(setIsLoading(false))
                            console.error(err)
                        })
                        
                        axios.get('https://psgc.gitlab.io/api/regions/').then((response2) => {
                            setRegion(response2.data)
                            response2.data.map((d:any) => {
                                if(response.data.data[0].region?.split('&')[1] === d.regionName) {
                                    if(d.regionName === 'National Capital Region') {
                                        axios.get(`https://psgc.gitlab.io/api/regions/${d.code}/districts/`).then((response3) => {
                                            setProvince(response3.data)
                                            response3.data.map((d2: any) => {
                                                if(response.data.data[0].province_district?.split('&')[1] === d2.name) {
                                                    axios.get(`https://psgc.gitlab.io/api/districts/${d2.code}/cities-municipalities/`).then((response4) => {
                                                        setMunicipality(response4.data)
                                                        response4.data.map((d3: any) => {
                                                            if(response.data.data[0].city_municipality?.split('&')[1] === d3.name) {
                                                                axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${d3.code}/barangays/`).then((response) => {
                                                                    setBarangay(response.data)
                                                                }).catch(error => console.error(error))
                                                            }
                                                        })
                                                    }).catch(error => console.error(error))
                                                }
                                            })
                                        }).catch(error => console.error(error))
                                    }
                                    else {
                                        axios.get(`https://psgc.gitlab.io/api/regions/${d.code}/provinces/`).then((response3) => {
                                            setProvince(response3.data)
                                            response3.data.map((d2:any) => {
                                                if(response.data.data[0].province_district?.split('&')[1] === d2.name) {
                                                    axios.get(`https://psgc.gitlab.io/api/provinces/${d2.code}/cities-municipalities/`).then((response4) => {
                                                        setMunicipality(response4.data)
                                                        response4.data.map((d3: any) => {
                                                            if(response.data.data[0].city_municipality?.split('&')[1] === d3.name) {
                                                                axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${d3.code}/barangays/`).then((response) => {
                                                                    setBarangay(response.data)
                                                                    dispatch(setIsLoading(false))
                                                                }).catch(error => console.error(error))
                                                            }
                                                        })
                                                    }).catch(error => console.error(error))
                                                }
                                            })
                                        }).catch(error => console.error(error))
                                    }
                                }
                            })
                        }).catch(error => console.error(error))
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
    return(
        <Box sx={{ flexGrow: 1, background: '#ecf4fc', minHeight: '100vh' }}>
            <Container maxWidth='xl'>
                <Grid container>
                    <Grid item lg={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                        <Box sx={{ my: 4 }}>
                            <Button 
                                className={styles.interFont} 
                                variant="text" startIcon={<MdArrowBackIos style={{ color: '#1da7db' }}/>} sx={{ fontSize: 20, fontWeight: 700, color: '#1da7db', textTransform: 'none' }}
                                onClick={() => router.push(`/dashboard/${params[2]}`)}
                            >
                                Back
                            </Button>
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '20px' }}>
                                Helpdesk
                            </Typography>
                            <Typography variant="body2">
                                Ikaw ba&apos;y may katanungan?
                            </Typography>
                            <Typography variant="body2">
                                Mag-email lang sa: 
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                                <FaGlobe size={20} />
                                <Typography variant="body2" sx={{ my: 'auto', mx: 0.5 }}>
                                    support@angkasangga.ph
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ my: 2 }}>
                            <Container>
                                {birthDate && houseNo && street && region && province && barangay && municipality && gender ?
                                <>
                                    <Box sx={{ display: {xs: 'block', sm: 'block' , md: 'none', lg: 'none'} }}>
                                        <Button 
                                            className={styles.interFont} 
                                            variant="text" startIcon={<MdArrowBackIos style={{ color: '#1da7db' }}/>} sx={{ fontSize: 20, fontWeight: 700, color: '#1da7db', textTransform: 'none' }}
                                            onClick={() => router.push(`/dashboard/${params[2]}`)}
                                        >
                                            Back
                                        </Button>
                                    </Box>
                                    <Typography 
                                        textAlign='center' 
                                        sx={{ fontSize: {xs: '23px', md: '30px', lg: '30px'}, fontWeight: 800, mb: 0, textTransform: 'uppercase' }}
                                    >
                                        Congratulations!
                                    </Typography>
                                    <Typography 
                                        textAlign='center' 
                                        variant="body2" 
                                        sx={{ textTransform: 'uppercase', fontSize: '12.8px' }}
                                    >
                                        Ikaw ay isang ganap na miyembro 
                                    </Typography>
                                    <Typography 
                                        textAlign='center' 
                                        variant="body2" 
                                        sx={{ textTransform: 'uppercase', fontSize: '12.8px' }}
                                    >
                                        na ng ANGKASangga Party List.
                                    </Typography>
                                </> : 
                                <>
                                    <Typography 
                                    textAlign='center' 
                                    sx={{ fontSize: {xs: '30px', md: '30px', lg: '30px'}, fontWeight: 800, mb: 0, textTransform: 'uppercase' }}
                                >
                                    Maging kasangga!
                                </Typography>
                                <Typography 
                                    textAlign='center' 
                                    variant="body2" 
                                    sx={{ textTransform: 'uppercase', fontSize: '12.8px' }}
                                >
                                    Mag-signup para maging miyembro
                                </Typography>
                                <Typography 
                                    textAlign='center' 
                                    variant="body2" 
                                    sx={{ textTransform: 'uppercase', fontSize: '12.8px' }}
                                >
                                    at makuha ang angkasangga ID
                                </Typography>
                                    </>
                                }
                                <Grid 
                                    container 
                                    direction='row' 
                                    justifyContent='center' 
                                    alignItems='center' 
                                    sx={{ my: 3 }}
                                    spacing={3}
                                >
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex', justifyContent: {xs: 'center', lg: 'flex-end'}, alignItems: 'center' }}>
                                            <div className="image-container">
                                                {imageBase64 === 'null' || imageBase64 === '' ?
                                                gender === 'Male' ?
                                                <Image 
                                                    src={Images.male} 
                                                    alt="profile" 
                                                    width={130} 
                                                    height={120} 
                                                    className='image' 
                                                /> :
                                                gender === 'Female' ?
                                                <Image 
                                                    src={Images.female} 
                                                    alt="profile" 
                                                    width={130} 
                                                    height={120} 
                                                    className='image' 
                                                /> :
                                                <Image 
                                                    src={Images.profilepic} 
                                                    alt="profile" 
                                                    width={130} 
                                                    height={120} 
                                                    className='image' 
                                                />  :
                                                <Image 
                                                    src={`data:image/jpeg;base64,${imageBase64}`} 
                                                    alt="profile" 
                                                    width={130} 
                                                    height={120} 
                                                    className='image' 
                                                />
                                                }
                                                <div className="icon">
                                                    <Button
                                                        component="label"
                                                        role={undefined}
                                                        variant="outlined"
                                                        tabIndex={-1}
                                                        startIcon={<FaCamera size={20} />}
                                                        size="small"
                                                        disabled={ disabled ? true : false }
                                                        sx={{ background: '#ffc841', color: '#000', border: '1px solid #ffc841' }}
                                                    >
                                                        Upload
                                                        <VisuallyHiddenInput
                                                            type="file"
                                                            onChange={handleFileChange}
                                                            multiple
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Typography 
                                            sx={{ textTransform: 'uppercase', textAlign: {xs: 'center', sm: 'center', md: 'center', lg: 'start'} }}
                                        >
                                            Angkasangga ID number*
                                        </Typography>
                                        <Typography 
                                            sx={{ 
                                                textTransform: 'uppercase', 
                                                fontWeight: 800, 
                                                fontSize: '25px',
                                                textAlign: {xs: 'center', sm: 'center', md: 'center', lg: 'start'}
                                            }}
                                        >
                                            {idNo}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ mb: 2 }}>Personal Information</Divider>
                                <Grid container display='row' justifyContent='center' alignItems='center' spacing={2}>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>Last Name*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="lastnNme" 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)}
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>First Name*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="firstName" 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>Middle Name*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="middleName" 
                                            value={middleName} 
                                            onChange={(e) => setMiddleName(e.target.value)}
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>Suffix</Typography>
                                        <TextField 
                                            sx={{ mb: 3, background: '#fff' }} 
                                            id="suffix" 
                                            value={suffix} 
                                            onChange={(e) => setSuffix(e.target.value)}
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                                    <Grid item xs={12} sm={4} lg={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Typography>Birthday*</Typography>
                                            <DatePicker 
                                                sx={{ mb: 2, background: '#fff', width: '100%' }} 
                                                value={dayjs(birthDate)}
                                                onChange={(newValue) => {
                                                    setBirthDate(newValue)
                                                    calculateAge(newValue)
                                                }}
                                                disabled={disabled ? true : false}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={3}>
                                        <Typography>Age*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="age" 
                                            value={age} 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={3}>
                                        <Typography>Gender*</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                value={gender}
                                                sx={{ mb: 2, background: '#fff' }}
                                                onChange={(e) => setGender(e.target.value)}
                                                disabled={disabled ? true : false}
                                            >
                                                <MenuItem value='Male'>Male</MenuItem>
                                                <MenuItem value='Female'>Female</MenuItem>
                                                <MenuItem value='LGBTQIA+'>LGBTQIA+</MenuItem>
                                                <MenuItem value='Prefer not to say'>Prefer not to say</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }}>Contact Information</Divider>
                                <Grid container display='row' justifyContent='center' alignItems='center' spacing={2}>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>House No., Unit, Bldg.</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="bldg" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            value={houseNo === 'undefined' ? '' : houseNo}
                                            onChange={(e) => setHouseNo(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>Street</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="street" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            value={street === 'undefined' ? '' : street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6} sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}>
                                        <Typography>Email Address(Optional)</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }}
                                            value={email} 
                                            placeholder="Leave this blank if not applicable" 
                                            id="email" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        <Typography>Region*</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="region"
                                                id="region"
                                                sx={{ mb: 2, background: '#fff' }}
                                                value={selectedRegion}
                                                onChange={handleChangeRegion}
                                                disabled={disabled ? true : false}
                                            >
                                                {region.map((data, index) => {
                                                    return(<MenuItem key={index} value={`${data.code}&${data.regionName}`}>
                                                        {data.name}
                                                    </MenuItem>)
                                                })}
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3}>
                                        {selectedRegion?.split('&')[1] === 'National Capital Region' ?
                                        <>
                                            <Typography>District*</Typography>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="district"
                                                    id="district"
                                                    sx={{ mb: 2, background: '#fff' }}
                                                    value={selectedProvince}
                                                    onChange={handleChangeDistrict}
                                                    disabled={disabled ? true : false}
                                                >
                                                    {province.map((data, index) => {
                                                        return(
                                                            <MenuItem key={index} value={`${data.code}&${data.name}`}>
                                                                {data.name}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </> :
                                        <>
                                            <Typography>Province*</Typography>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="provinces"
                                                    id="provinces"
                                                    sx={{ mb: 2, background: '#fff' }}
                                                    value={selectedProvince}
                                                    onChange={handleChangeProvince}
                                                    disabled={disabled ? true : false}
                                                >
                                                    {province.map((data, index) => {
                                                        return(
                                                            <MenuItem key={index} value={`${data.code}&${data.name}`}>
                                                                {data.name}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </>}
                                    </Grid>
                                    <Grid item xs={12} lg={6} sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}>
                                        <Typography>Mobile Number*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="mobileNo" 
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <Typography>{selectedRegion?.split('&')[1] === 'National Capital Region' && selectedProvince.split('&')[1] === 'First District' ? 'SubMunicipality*' : 'City/Municipality*'}</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="city-label"
                                                id="city"
                                                value={selectedMunicipality}
                                                onChange={handleChangeMunicipality}
                                                sx={{ mb: 2, background: '#fff' }}
                                                disabled={disabled ? true : false}
                                            >
                                                {municipality.map((data, index) => {
                                                    return(
                                                        <MenuItem key={index} value={`${data.code}&${data.name}`}>
                                                            {data.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <Typography>Barangay*</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="brgy-label"
                                                id="brgy"
                                                value={selectedBarangay}
                                                onChange={handleChangeBarangay}
                                                sx={{ mb: 2, background: '#fff' }}
                                                disabled={disabled ? true : false}
                                            >
                                                {barangay.map((data, index) => {
                                                    return(<MenuItem key={index} value={`${data.code}&${data.name}`}>
                                                        {data.name}
                                                    </MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6} sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}>
                                        <Typography>Emergency Contact Name</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="emerContact" 
                                            value={contactName} 
                                            required 
                                            fullWidth
                                            onChange={(e) => setContactName(e.target.value)}
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container display='row' justifyContent='space-between' alignItems='center' spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={3}>
                                        <Typography>Precint No.</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="precint" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            value={precintNo}
                                            onChange={(e) => setPrecintNo(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={6} sx={{ display: {xs: 'block', sm: 'block', md: 'block', lg: 'none'}}}>
                                        <Typography>Email Address(Optional)</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }}
                                            value={email} 
                                            placeholder="Leave this blank if not applicable" 
                                            id="email" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={6} sx={{ display: {xs: 'block', sm: 'block', md: 'block', lg: 'none'}}}>
                                        <Typography>Mobile Number*</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="mobileNo" 
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={6} sx={{ display: {xs: 'block', sm: 'block', md: 'block', lg: 'none'}}}>
                                        <Typography>Emergency Contact Name</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="emerContact" 
                                            value={contactName} 
                                            required 
                                            fullWidth
                                            onChange={(e) => setContactName(e.target.value)}
                                            disabled={disabled ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={6}>
                                        <Typography>Emergency Phone Number</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="emergencyPhone" 
                                            required 
                                            fullWidth
                                            disabled={disabled ? true : false}
                                            value={contactNo}
                                            onChange={(e) => setContactNo(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2 }}>Additional Information</Divider>
                                <Grid container direction='row' justifyContent='space-between'>
                                    <Grid item lg={6}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ color: '#000' }}>Saan grupo ka kabilang ?</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={option}
                                                name="radio-buttons-group"
                                                onChange={(e: any) => {
                                                    setOption(e.target.value)
                                                    if(!toda) {
                                                        setToda('')
                                                    }
                                                    else if(!poda) {
                                                        setPoda('')
                                                    }
                                                    else if(!eTrike) {
                                                        setETrike('')
                                                    }
                                                    else if(!eBike) {
                                                        setEBike('')
                                                    }
                                                }}
                                            >  
                                                {arrOptions.map((option, index) => {
                                                    return(<FormControlLabel key={index} value={index} control={<Radio />} label={option.title} disabled={disabled ? true : false}/>)
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    {option === '11' ?
                                    <></> : <>
                                        <Grid item xs={12} lg={6}>
                                            <Paper sx={{ p: 2, background: '#ecf4fc', border: '1px solid #000', boxShadow: 'none' }}>
                                                {option === '0' ? 
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>Pumili sa mga sumusunod:</Typography>
                                                    <Typography>Angkas Biker Solo</Typography>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId="solo-label"
                                                            id="solo"
                                                            value={bikerSolo}
                                                            sx={{ mb: 2, background: '#fff' }}
                                                            disabled={disabled ? true : false}
                                                            onChange={(e) => setBikerSolo(e.target.value)}
                                                        >
                                                            <MenuItem value='Active Angkas Biker'>Active Angkas Biker</MenuItem>
                                                            <MenuItem value='Former Angkas Biker(Inactive)'>Former Angkas Biker(Inactive)</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </> 
                                                : option === '1' ?
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>El Presidente Member</Typography>
                                                    <Typography>Saan grupo/chapter ka kabilang?*</Typography>
                                                    <TextField 
                                                        sx={{ mb: 2, background: '#fff' }} 
                                                        placeholder="Required" 
                                                        id="elPresidente" 
                                                        required 
                                                        fullWidth
                                                        value={elPresidente}
                                                        onChange={(e) => setElPresidente(e.target.value)}
                                                        disabled={disabled ? true : false}
                                                    />
                                                </> : option === '2' ? 
                                                <>
                                                    <>
                                                        <Typography textAlign='center' sx={{ mb: 2 }}>Pumili sa mga sumusunod:</Typography>
                                                        <Typography>Other platforms or habal-habal</Typography>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                labelId="platforms-select-label"
                                                                id="platforms"
                                                                sx={{ mb: 2, background: '#fff' }}
                                                                value={otherPlatform}
                                                                onChange={(e) => setOtherPlatform(e.target.value)}
                                                                disabled={disabled ? true : false}
                                                            >
                                                                {platforms.map((platform, index) => {
                                                                    return(<MenuItem key={index} value={platform.title}>{platform.title}</MenuItem>)
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </> 
                                                </> : option === '3' ?
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>
                                                        Rider Groups, Clubs, Associations Options:
                                                    </Typography>
                                                    <Typography>
                                                        Saang grupo ka nabibilang?* (Required)
                                                    </Typography>
                                                    <TextField 
                                                        sx={{ mb: 2, background: '#fff' }} 
                                                        id="riderGrp" 
                                                        required 
                                                        fullWidth 
                                                        placeholder="Required"
                                                        value={riderGroup}
                                                        onChange={(e) => setRiderGroup(e.target.value)}
                                                        disabled={disabled ? true : false}
                                                    />
                                                    <Typography>
                                                        Anong chapter ka nabibilang? (Optional)
                                                    </Typography>
                                                    <TextField 
                                                        sx={{ mb: 2, background: '#fff' }} 
                                                        id="standard-basic" 
                                                        required 
                                                        fullWidth 
                                                        placeholder="Leave blank if not applicable"
                                                        disabled={disabled ? true : false}
                                                        onChange={(e) => setChapterType(e.target.value)}
                                                    />
                                                </> : option === '4' || option === '5' || option === '6' || option === '7' ?
                                                <>
                                                    <Typography>Saang area, distrito, club o chapter ka nabibilang?*</Typography>
                                                    <TextField 
                                                        sx={{ mb: 2, background: '#fff' }} 
                                                        id="standard-basic" 
                                                        required 
                                                        fullWidth
                                                        placeholder="Required"
                                                        value={option === '4' ? toda : option === '5' ? poda : option === '6' ? eTrike : option === '7' ? eBike : "" }
                                                        disabled={disabled ? true : false}
                                                        onChange={(e) => {
                                                            if(option === '4') {
                                                                setToda(e.target.value)
                                                            }
                                                            else if(option === '5') {
                                                                setPoda(e.target.value)
                                                            }
                                                            else if(option === '6') {
                                                                setETrike(e.target.value)
                                                            }
                                                            else if(option === '7') {
                                                                setEBike(e.target.value)
                                                            }
                                                        }}
                                                    />
                                                </> : option === '8' ?
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>Pumili sa mga sumusunod:</Typography>
                                                    <Typography>Impormal na Manggagawa</Typography>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId="impormal-select-label"
                                                            id="impormal-select"
                                                            value={impormalWorker}
                                                            onChange={(e) => setImpormalWorker(e.target.value)}
                                                            disabled={disabled ? true : false}
                                                            sx={{ mb: 2, background: '#fff' }}
                                                        >
                                                            <MenuItem value='Negosyante (Small Business Owner)'>
                                                                <Typography>Negosyante (Small Business Owner)</Typography>
                                                                <Typography>- Sari-sari store, Vendor, Market Store Owner</Typography>
                                                            </MenuItem>
                                                            <MenuItem value="Online Seller/Freelancer">
                                                                <Typography>Online Seller/Freelancer</Typography>
                                                                <Typography>- E-Commerce seller, Remote Worker, Content Creator</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Skilled Worker'>
                                                                <Typography>Skilled Worker</Typography>
                                                                <Typography>- Construction, Carpenter, Plumber, Electrician, Handyman</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Agriculture/Farming'>
                                                                <Typography>Agriculture/Farming</Typography>
                                                                <Typography>- Farmer, Fisherman, Plantation worker</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Others'>
                                                                <Typography>Others (Iba pa)</Typography>
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {impormalWorker === 'Others' ? 
                                                    <>
                                                    <Typography>Other: </Typography>
                                                    <TextField 
                                                            sx={{ mb: 2, background: '#fff' }} 
                                                            id="standard-basic" 
                                                            required 
                                                            fullWidth 
                                                            placeholder="Leave blank if not applicable" 
                                                            disabled={disabled ? true : false}
                                                        /> 
                                                    </> : <></>}
                                                </> : option === '9' ?
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>Pumili sa mga sumusunod:</Typography>
                                                    <Typography>Nagtatrabaho sa mga sumusunod na industriya:</Typography>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId="industriyal-select-label"
                                                            id="industriyal-select"
                                                            value={industriyalWorker}
                                                            sx={{ mb: 2, background: '#fff' }}
                                                            onChange={(e) => setIndustriyalWorker(e.target.value)}
                                                            disabled={disabled ? true : false}
                                                        >
                                                            <MenuItem value='Agrikultura at Pagsasaka'>
                                                                <Typography>Agrikultura at Pagsasaka</Typography>
                                                                <Typography>- Farming, Fishing, Forestry</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Transportasyon at Serbisyo'>
                                                                <Typography>Transportasyon at Serbisyo</Typography>
                                                                <Typography>- Transport, Logistics, Delivery</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Kalakalan at Negosyo'>
                                                                <Typography>Kalakalan at Negosyo</Typography>
                                                                <Typography>-Professional, Freelance, Small Businesses</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Konstruksyon at Pagawaan'>
                                                                <Typography>Konstruksyon at Pagawaan</Typography>
                                                                <Typography>- Construction, Manufacturing, Skilled trades</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='Others'>
                                                                <Typography>Others (Iba pa)</Typography>
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {industriyalWorker === 'Others' ? 
                                                    <>
                                                    <Typography>Other: </Typography>
                                                    <TextField 
                                                            sx={{ mb: 2, background: '#fff' }} 
                                                            id="standard-basic" 
                                                            required 
                                                            fullWidth 
                                                            placeholder="Leave blank if not applicable"
                                                            disabled={disabled ? true : false}
                                                        /> 
                                                    </> : <></>}
                                                </> : option === '10' ?
                                                <>
                                                    <Typography textAlign='center' sx={{ mb: 2 }}>Pumili sa mga sumusunod:</Typography>
                                                    <FormControl>
                                                        <FormLabel id="passenger-radio-buttons-group-label" sx={{ color: '#000' }}>Passenger</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="passenger-radio-buttons-group-label"
                                                            name="passenger-buttons-group"
                                                            onChange={(e) => setPassenger(e.target.value)}
                                                            value={passenger === null ? '' : passenger}
                                                        >
                                                            <FormControlLabel disabled={disabled ? true : false} value="Angkas Passenger" control={<Radio />} label="Angkas Passenger" />
                                                            <FormControlLabel disabled={disabled ? true : false} value="Commuter" control={<Radio />} label="Commuter" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </> : <></>}
                                            </Paper>
                                        </Grid>
                                    </>}
                                </Grid>
                                <Grid container direction='row' justifyContent='space-between' spacing={2} sx={{ my: 2 }}>
                                    <Grid item lg={6} alignItems='center'>
                                        <FormControl component="fieldset" variant="standard">
                                            <FormLabel component="legend" sx={{ color: '#000' }}>Nais mo bang mag-volunteer para sa Angkasangga Partylist?</FormLabel>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox 
                                                                checked={v1} 
                                                                onChange= {handleChangeVolunteer} 
                                                                name="v1"
                                                            />
                                                        }
                                                        label='Sumama o makibahagi sa pagkampanya'
                                                        disabled={disabled ? true : false}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox 
                                                                checked={v2} 
                                                                onChange= {handleChangeVolunteer} 
                                                                name="v2"
                                                            />
                                                        }
                                                        label='Magpaskil ng tarpaulin'
                                                        disabled={disabled ? true : false}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox 
                                                                checked={v3} 
                                                                onChange= {handleChangeVolunteer} 
                                                                name="v3"
                                                            />
                                                        }
                                                        label='Magrecruit ng kakilala'
                                                        disabled={disabled ? true : false}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox 
                                                                checked={v4} 
                                                                onChange= {handleChangeVolunteer} 
                                                                name="v4"
                                                            />
                                                        }
                                                        label='Maging active sa social media at groupchats'
                                                        disabled={disabled ? true : false}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox 
                                                                checked={v5} 
                                                                onChange= {handleChangeVolunteer} 
                                                                name="v5"
                                                            />
                                                        }
                                                        label='Sumali sa mga events'
                                                        disabled={disabled ? true : false}
                                                    />
                                                </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Typography>Referrer&apos;s Name </Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="refname" 
                                            required 
                                            fullWidth 
                                            disabled
                                            value={refName}
                                        /> 
                                        <Typography>Referrer&apos;s Code </Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="refcode" 
                                            required 
                                            fullWidth 
                                            disabled
                                            value={refCode ? `APL-${refCode}` : ''}
                                        />
                                        <Typography>Your Referrer Code / APL ID No.</Typography>
                                        <TextField 
                                            sx={{ mb: 2, background: '#fff' }} 
                                            id="apl" 
                                            value={idNo} 
                                            required 
                                            fullWidth 
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' justifyContent='center' spacing={2} sx={{ my: 2 }}>
                                    <Grid item xs={12} lg={3}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ color: '#000' }}>Ikaw ba ay rehistradong botante?</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={registeredVoter}
                                                name="radio-buttons-group"
                                                onChange={(e) => setRegisteredVoter(e.target.value)}
                                            >
                                                <FormControlLabel value={1}  disabled={disabled ? true : false} control={<Radio />} label="Oo" />
                                                <FormControlLabel value={0}  disabled={disabled ? true : false} control={<Radio />} label="Hindi" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label" sx={{ color: '#000' }}>Nais mo bang suportahan ang Angkasangga?</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={support === null ? '' : support}
                                                name="radio-buttons-group"
                                                onChange={(e) => setSupport(e.target.value)}
                                            >
                                                <FormControlLabel value={1}  disabled={disabled ? true : false} control={<Radio />} label="Oo" />
                                                <FormControlLabel value={2}  disabled={disabled ? true : false} control={<Radio />} label="Hindi" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <FormControl>
                                            <Typography>Ilan ang botante sainyong pamilya?</Typography>
                                            <TextField 
                                                sx={{ mb: 2, background: '#fff' }} 
                                                id="votersCount" 
                                                required 
                                                fullWidth 
                                                disabled={disabled ? true : false}
                                                value={votersCount}
                                                onChange={(e) => setVotersCount(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <Typography>Saan mo nalaman ang Angkasangga?</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                sx={{ mb: 2, background: '#fff' }}
                                                disabled={disabled ? true : false}
                                                value={askSource}
                                                onChange={(e) => setAksSource(e.target.value)}
                                            >
                                                {angkasanggaOpts.map((res, index) => {
                                                    return(<MenuItem key={index} value={res.title}>{res.title}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' justifyContent='center' spacing={2} sx={{ my: 2 }}>
                                    <Grid item md={6} lg={6}>
                                        <FormControlLabel 
                                            disabled={disabled ? true : false}
                                            control={<Checkbox checked={agree ? true : false} onClick={() => {
                                                if(agree) {
                                                    setAgree(false)
                                                }
                                                else {
                                                    setAgree(true)
                                                }
                                            }}/>} 
                                            label={<Typography>Sa pag-click sa Submit button, sumasang-ayon ako sa mga <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                            onClick={() => setTerms(true)}>tuntunin at kondisyon</span></Typography>} 
                                        />
                                    </Grid>
                                    <Grid item md={6} lg={6}>
                                        <Grid container direction='row' justifyContent={{xs:'space-between', sm: 'space-between', md: 'flex-end'}} spacing={2}>
                                            <Grid item lg={6}>
                                                <Button 
                                                    variant="contained" 
                                                    fullWidth 
                                                    sx={{ background: '#ffc841', color: '#000', fontWeight: 600 }}
                                                    onClick={disabled ? handleClickEdit : handleClickCancel }
                                                    disabled={agree && disabled === false ? true : false}
                                                >
                                                    {disabled ? 'Edit' : 'Cancel'}
                                                </Button>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <Button 
                                                    variant="contained" 
                                                    fullWidth 
                                                    disabled={agree ? false : true}
                                                    sx={{ fontWeight: 600 }}
                                                    onClick={handleClickSubmit}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={2} sx={{ mt: { xs: 5, lg: 10} }}>
                        <Grid container direction={{xs: 'row', sm: 'row', md: 'row', lg: 'column'}} spacing={1}>
                            <Grid item xs={12} sm={6} md={3} lg={12} sx={{ mb: 2 }}>
                                <Button  
                                    variant="contained" 
                                    startIcon={<FaRegAddressCard size={30}/>} 
                                    sx={{ 
                                        background: '#ffc841', 
                                        color: '#000', 
                                        fontWeight: 800, 
                                        textTransform: 'none', 
                                        fontSize: { lg: '24px', md: '15px', sm: '20px', xs: '24px' },
                                        borderRadius: '20px',
                                        px: 4
                                    }}
                                    className={styles.inter}
                                    fullWidth
                                    onClick={() => {
                                        if(birthDate && houseNo && street && region && province && barangay && municipality) {
                                            setOpenDigitalID(true)
                                            setScroll('paper')
                                        }
                                        else {
                                            dispatch(setAlertOpen(true))
                                            dispatch(setAlertMessage('Please complete the Birthday and Address.'))
                                            dispatch(setAlertSeverity('error'))
                                        }
                                    }}
                                    disabled={birthDate && houseNo && street && region && province && barangay && municipality ? false : true}
                                >
                                    View Digital ID
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={12} sx={{ mb: 2 }}>
                                <Button 
                                    fullWidth
                                        variant="contained" 
                                        startIcon={<FaQrcode size={25}/>} 
                                        sx={{ 
                                            background: '#10aee5', 
                                            fontWeight: 800, 
                                            textTransform: 'none', 
                                            fontSize: '24px',
                                            borderRadius: '20px',
                                            px: 4
                                        }}
                                        className={styles.inter}
                                        onClick={() => setOpenQR(true)}
                                    >
                                        View QR
                                    </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={12} sx={{ mb: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained" 
                                    startIcon={<FaHandHoldingUsd size={25}/>}
                                    sx={{ 
                                        background: '#10aee5', 
                                        fontWeight: 800, 
                                        textTransform: 'none', 
                                        fontSize: '24px',
                                        borderRadius: '20px',
                                        px: 4
                                    }}
                                    className={styles.inter}
                                    onClick={() => dispatch(setOpenDonateModal(true))}
                                >
                                    Donate
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={12} sx={{ mb: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained" 
                                    startIcon={<FaSignOutAlt size={25}/>}
                                    color="error"
                                    sx={{ 
                                        fontWeight: 800, 
                                        textTransform: 'none', 
                                        fontSize: '24px',
                                        borderRadius: '20px',
                                        px: 4
                                    }}
                                    className={styles.inter}
                                    onClick={handleClickLogout}
                                >
                                    Logout
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item sx={{ display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none'} }}>
                    <Box sx={{ my: 3 }}>
                        <Typography 
                            sx={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '20px' }}
                            textAlign='center'
                        >
                            Helpdesk
                        </Typography>
                        <Typography textAlign='center' variant="body2">
                            Ikaw ba&apos;y may katanungan?
                        </Typography>
                        <Typography textAlign='center' variant="body2">
                            Mag-email lang sa: 
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <FaGlobe size={20}/>
                            <Typography variant="body2" sx={{ my: 'auto', mx: 0.5 }}>
                                support@angkasangga.ph
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Container>
            <Loading open={isLoading}/>
            <Dialog open={openQR} maxWidth='xs' fullWidth>
                <DialogContent sx={{ background: '#14abe3' }}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <Grid item>
                            <MdOutlineClose size={20} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => {
                                setOpenQR(false)
                                SetEditSuccess(false)
                            }}/>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ mb: 3 }}>
                        <Grid item>
                            {editSuccess ?
                            <>
                                <Typography sx={{ color: '#fff', fontWeight: 500, textAlign: 'center' }} variant="h6">Salamat Angkasangga member!</Typography>
                                <Typography sx={{ color: '#fff', fontWeight: 300, fontSize: '12px', textAlign: 'center', mb: 3 }}>Paki-screenshot ang iyong ID details </Typography>
                            </> :
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Image src={Images.idDark} alt="logo" width={180}/>
                            </Box>
                            }
                            <Typography textAlign='center' sx={{ color: '#fff', fontWeight: 500 }} variant="body1">Your Referral / ID Number: </Typography>
                            <Box sx={{ background: '#fff', py: 1, px: 2, borderRadius: '20px', mb: 3, mt: 1 }}>
                                <Typography textAlign='center' sx={{ fontWeight: 800 }} variant="h6">
                                    {idNo}
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
            <Dialog open={openDonateModal} maxWidth='xs' fullWidth>
                <Donate />
            </Dialog>
            <Dialog open={terms} maxWidth='sm' fullWidth>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container direction='row' justifyContent='flex-end'>
                        <Grid item>
                            <MdOutlineClose 
                                size={20} 
                                style={{ cursor: 'pointer', color: '#000' }} 
                                onClick={() => {
                                    setTerms(false)
                                    setDisabled(false)
                                    sessionStorage.setItem('agree', '1')
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Terms />
                </DialogContent>
            </Dialog>
            <Dialog open={openDigitalID} scroll={scroll} fullWidth>
                <Grid container direction='row' justifyContent='flex-end'>
                    <Grid item>
                        <MdOutlineClose 
                            size={20} 
                            style={{ cursor: 'pointer', color: '#000', margin: '1rem' }} 
                            onClick={() => setOpenDigitalID(false)}
                        />
                    </Grid>
                </Grid>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box>
                        <Typography 
                            textAlign='center' 
                            sx={{ fontWeight: 800, fontSize: {xs: '15px', lg: '27px'}, textTransform: 'uppercase' }}
                        >
                            Angkasangga ID is <span style={{ color: '#10aee5' }}>Active</span>
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'} }}
                        >
                            Kasangga! Maari mong i-download ang iyong
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'}, mb: 1 }}
                        >
                            ID at i-print sa tamang sukat.
                        </Typography>
                        <Typography 
                            textAlign='center'
                            sx={{ fontWeight: 300, fontSize: {xs: '12px', sm: '15px', lg: '15px'} }}
                        >
                            (3.5 inches width x 2.5 inches height)
                        </Typography>
                    </Box>
                    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            sx={{ background: '#10aee5', borderRadius: '20px', my: 2, textTransform: 'none', fontWeight: 600, fontSize: '18px' }}
                            className={styles.inter}
                            onClick={() => handleGeneratePdf()}
                        >
                            Download PDF
                        </Button>
                    </Box>
                    <Box sx={{ display: {xs: 'flex', sm: 'none'}, justifyContent: 'center' }}>
                        <Typography textAlign='center' variant="body2" sx={{ m: 3 }}>
                            Note: Use Landscape mode to view the ID card
                        </Typography>
                    </Box>
                    <Box ref={generatePdf} id="contentToCapture">
                        <IdCard
                            profile={imageBase64} 
                            name={`${lastName}, ${firstName} ${middleName}`} 
                            IdNo2={idNo} 
                            gender={gender}
                            street={`${houseNo} ${street}`}
                            brgy={selectedBarangay}
                            city={selectedMunicipality}
                            birthdate={dayjs(birthDate).format('YYYY-MM-DD') === 'Invalid Date' ? '' : dayjs(birthDate).format('YYYY-MM-DD')}
                            session={params[2]}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <AlertMessage />
        </Box>
    )
}