import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { setAlertOpen } from "../store/slice";
import { Alert } from "@mui/material";

export default function AlertMessage() {
    const alertOpen = useSelector((state: RootState) => state.data.alertOpen);
    const alertSeverity = useSelector((state: RootState) => state.data.alertSeverity);
    const alertMessage = useSelector((state: RootState) => state.data.alertMessage);
    const dispatch = useDispatch();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(setAlertOpen(false))
    };
    
    return(
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose} sx={{ zIndex: 99999 }}>
            <Alert
                severity={alertSeverity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}