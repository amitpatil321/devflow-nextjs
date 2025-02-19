import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import paths from "./constants/paths";

const isProtectedRoute = createRouteMatcher([
  `${paths.collections}(.*)`,
  `${paths.askQuestion}(.*)`,
  `${paths.signIn}(.*)`,
]);

export default clerkMiddleware((auth, req) => {
  // try {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // } catch (error) {
  //   console.error('Authentication Error:', error);
  //   // return NextResponse.redirect(req.nextUrl.origin+pages?.home+'?error=Unexpected error while logging in');
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
