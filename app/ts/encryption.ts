import crypto from 'crypto'

export default function Encryption(text: any){
    try {
        const cipher = crypto.createCipheriv(`${process.env.NEXT_PUBLIC_ALGORITHM}`, Buffer.from(Buffer.from(`${process.env.NEXT_PUBLIC_INT_KEY}`, 'hex')), Buffer.from(`${process.env.NEXT_PUBLIC_INT_IV}`, 'hex'));
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return encrypted.toString('hex');
    }
    catch(error: any) {
        return error
    }
}