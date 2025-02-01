import { Box, DialogContent, Grid } from "@mui/material";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Images } from "../ts/images";
import { setOpenDonateModal } from "../store/slice";

export default function Donate() {
    const dispatch = useDispatch();

    return(
        <DialogContent>
            <Grid container direction='row' justifyContent='flex-end'>
                <Grid item>
                    <MdOutlineClose size={20} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => dispatch(setOpenDonateModal(false))}/>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Images.gcash} style={{ width: '100%', height: 'auto' }} alt="donate" />
            </Box>
        </DialogContent>
    )
}