import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const register = new Promise(async(resolve, reject) => {
        await aks.get(`/aks/customer/read/customer/by/session?p_session_token=${body.p_session_token}`).then(response => {
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

    const message = register.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}