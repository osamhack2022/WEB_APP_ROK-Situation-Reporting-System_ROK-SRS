import { NextResponse } from "next/server";
import {jwtDecrypt, jwtVerify} from 'jose';

const secret = process.env.JWT_SECRET

export async function middleware(request) {
    const JWTtoken = request.cookies.get('usercookie')
    const url = request.nextUrl.clone();
    if (url.pathname.includes('/home')) {
        if (JWTtoken === undefined) {
            url.pathname = '/'
        } else {
            try {
                const { payload, protectedHeader } = await jwtVerify(JWTtoken, new TextEncoder().encode(secret))
                console.log(payload)
                return NextResponse.next();
            } catch (e) {
                console.log(e)
                url.pathname = '/'
            }
        }
        return NextResponse.redirect(url)
    } else if (url.pathname.includes('/')) {
        const JWTtoken = request.cookies.get('usercookie')
    }
    return NextResponse.next();
}