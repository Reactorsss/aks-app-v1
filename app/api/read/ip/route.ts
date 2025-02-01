import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const generateIP = new Promise(async(resolve, reject) => {
        await axios.get('https://api.ipify.org?format=json').then(response => {
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

    const message = generateIP.then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return error
    })

    return NextResponse.json(await message);
}