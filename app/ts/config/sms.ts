import axios from "axios";

const sms = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SMS,
    headers: {
        Authorization: process.env.NEXT_PUBLIC_SMS_AUTH
    }
});

export default sms;