import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const register = new Promise(async(resolve, reject) => {
        await aks.post('/aks/customer/create-customer', {
            p_first_name: body.p_first_name,
            p_middle_name: body.p_middle_name,
            p_last_name: body.p_last_name,
            p_suffix: body.p_suffix,
            p_mobile_no: body.p_mobile_no,
            p_passwordhash: body.p_passwordhash,
            p_is_registered_voter: body.p_is_registered_voter,
            p_referrer_id_no: body.p_referrer_id_no
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

    const message = register.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}