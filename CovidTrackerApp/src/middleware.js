import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  /*const res = NextResponse.next()

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000') // replace this your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )*/

  const path = request.nextUrl.pathname;
  
  const isPublicPath = path === '/login' || path === '/register';
  const token = request.cookies.get("token")?.value || "";

  console.log(isPublicPath, token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`${path}`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  //return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register', '/profile'],
}