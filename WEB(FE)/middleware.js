import { NextResponse } from "next/server";
import {jwtVerify} from 'jose';

const secret = process.env.JWT_SECRET

export async function middleware(request) {
    const JWTtoken = request.cookies.get('usercookie')
    const url = request.nextUrl.clone();
    if (url.pathname.includes('/home') || url.pathname.includes('/memonote') || url.pathname.includes('/messages') || url.pathname.includes('/notifications') || url.pathname.includes('/orgchart')) {
        if (JWTtoken === undefined) {
            url.pathname = '/'
        } else {
            try {
                const { payload, protectedHeader } = await jwtVerify(JWTtoken, new TextEncoder().encode(secret))
                return NextResponse.next();
            } catch (e) {
                console.log(e)
                url.pathname = '/'
            }
        }
        return NextResponse.redirect(url)
    } else if (url.pathname == '/') {
        if (JWTtoken === undefined) {
            return NextResponse.next();
        } else {
            try {
                await jwtVerify(JWTtoken, new TextEncoder().encode(secret))
                url.pathname = '/home'
                return NextResponse.redirect(url)
            } catch(e) {
                console.log(e)
                return NextResponse.next()
            }
        }
    }
    return NextResponse.next();
}