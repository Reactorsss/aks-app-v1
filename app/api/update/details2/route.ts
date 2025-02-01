import aks from "@/app/ts/config/axios";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const body = await request.json();

    const details = new Promise(async(resolve, reject) => {
        await aks.patch('/aks/customer/update/full/details/2', body).then(response => {
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

    const message = details.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}