import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const direct = new Promise(async(resolve, reject) => {
        await aks.post('/aks/customer/admin/read/dashboard/search/direct', {
            p_filter: body.p_filter,
            p_referrer_id_no: body.p_referrer_id_no,
            p_referrer_name: body.p_referrer_name
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

    const message = direct.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}