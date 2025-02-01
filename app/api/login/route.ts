import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const login = new Promise(async(resolve, reject) => {
        await aks.post('/aks/customer/create/login/session', {
            p_mobile_no: body.p_mobile_no,
            p_passwordhash: body.p_passwordhash,
            p_ip_address: body.p_ip_address
        }).then(response => {
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

    const message = login.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}