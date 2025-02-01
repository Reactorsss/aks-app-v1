import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
    open: boolean
}

export default function Loading({ open }: LoadingProps) {
    return(
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 99999 })}
            open={open}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}