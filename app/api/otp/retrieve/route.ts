import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const generateOTP = new Promise(async(resolve, reject) => {
        await aks.get(`/aks/customer/read/otp/history?p_otp_module=${body.p_otp_module}&p_mobile_no=${body.p_mobile_no}&p_otp=${body.p_otp}&p_ip_address=${body.p_ip_address}`).then(response => {
            resolve(response.data)
        }).catch(error => {
            if (error.response) {
                reject(error.response.data)
            }
            else if (error.request) {
                reject(error.request)
            }
            else {
                reject(error.message)
            }
        })
    })

    const message = generateOTP.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}