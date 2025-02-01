import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SliceState {
    alertOpen: boolean
    alertSeverity: any
    alertMessage: string
    isLoading: boolean
    openLoginModal: boolean
    openPassModal: boolean
    passModalBool: boolean
    passSuccessModalBool: boolean
    termsOpen: boolean
    successMess: string
    openRegMess: boolean
    openDonateModal: boolean
    openDigitalID: boolean
}

const initialState: SliceState = {
    alertOpen: false,
    alertSeverity: '',
    alertMessage: '',
    isLoading: false,
    openLoginModal: false,
    openPassModal: false,
    passModalBool: false,
    passSuccessModalBool: false,
    termsOpen: false,
    successMess: '',
    openRegMess: false,
    openDonateModal: false,
    openDigitalID: false
}

export const Slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        setAlertOpen: (state, action: PayloadAction<boolean>) => {
            state.alertOpen = action.payload
        },
        setAlertSeverity: (state, action: PayloadAction<any>) => {
            state.alertSeverity = action.payload
        },
        setAlertMessage: (state, action: PayloadAction<string>) => {
            state.alertMessage = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setOpenLoginModal: (state, action: PayloadAction<boolean>) => {
            state.openLoginModal = action.payload
        },
        setOpenPassModal: (state, action: PayloadAction<boolean>) => {
            state.openPassModal = action.payload
        },
        setPassModalBool: (state, action: PayloadAction<boolean>) => {
            state.passModalBool = action.payload
        },
        setPassSuccessModalBool: (state, action: PayloadAction<boolean>) => {
            state.passSuccessModalBool = action.payload
        },
        setTermsOpen: (state, action: PayloadAction<boolean>) => {
            state.termsOpen = action.payload
        },
        setSuccessMess: (state, action: PayloadAction<string>) => {
            state.successMess = action.payload
        },
        setOpenRegMess: (state, action: PayloadAction<boolean>) => {
            state.openRegMess = action.payload
        },
        setOpenDonateModal: (state, action: PayloadAction<boolean>) => {
            state.openDonateModal = action.payload
        },
        setOpenDigitalID: (state, action: PayloadAction<boolean>) => {
            state.openDigitalID = action.payload
        },
    }
})

export const {
    setAlertOpen,
    setAlertSeverity,
    setAlertMessage,
    setIsLoading,
    setOpenLoginModal,
    setOpenPassModal,
    setPassModalBool,
    setPassSuccessModalBool,
    setTermsOpen,
    setSuccessMess,
    setOpenRegMess,
    setOpenDonateModal,
    setOpenDigitalID
} = Slice.actions

export default Slice.reducer