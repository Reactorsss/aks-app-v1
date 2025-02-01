import axios from "axios";

const aks = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
        'x-auth': process.env.NEXT_PUBLIC_AUTH
    }
});

export default aks;