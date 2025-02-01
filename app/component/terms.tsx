import { Box, Typography } from "@mui/material";

export default function Terms() {
    return(
        <Box>
            <Typography 
                variant="h6" 
                textAlign='center' 
                sx={{ textTransform: 'uppercase', my: 3, fontWeight: 600 }}
            >
                Terms and Conditions
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Republic Act 10173, officially known as the Data Privacy Act of 2012 (DPA), is Philippine&apos;s data privacy law, aiming to “to protect the fundamental human right of privacy, of communication while ensuring free flow of information to promote innovation and growth” while also ensuring “that personal information in information and communications systems in the government and in the private sector are secured and protected.
            </Typography>
            <Typography sx={{ mb: 2 }}>
                I agree and understand the consent that Angkasangga may collect, use, disclose, and process my personal information set out in its official forms and/or otherwise provided by me/us or possessed by Angkasangga during the implementation of its programs.
            </Typography>
            <Typography sx={{ mb: 2 }}>
                I hereby consent to the processing of the personal data that I have provided and declare agreement with the data protection regulations in the data privacy above.
            </Typography>
            <Typography sx={{ mb: 3 }}>
                I hereby certify that the information provided is accurate and complete.
            </Typography>
        </Box>
    )
}