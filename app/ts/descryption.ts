import crypto from 'crypto'

export default function Decryption(text: any){
    try {
        const iv = Buffer.from(`${process.env.NEXT_PUBLIC_INT_IV}`, 'hex');
        const encryptedText = Buffer.from(text, 'hex');
        const decipher = crypto.createDecipheriv(`${process.env.NEXT_PUBLIC_ALGORITHM}`, Buffer.from(`${process.env.NEXT_PUBLIC_INT_KEY}`, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
    catch(error: any) {
        return error
    }
}