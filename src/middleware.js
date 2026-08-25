import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Per-request CSP nonce.
 *
 * The static policy in `next.config.mjs` had to allow `script-src
 * 'unsafe-inline'` because Next streams the RSC payload through inline
 * `<script>` tags — and that allowance is what stops a CSP from being XSS
 * protection, since an injected `<script>` runs on the same terms. This site
 * has an admin session behind Supabase auth, so a script injected anywhere on
 * it can reach that session; the nonce is what closes that door.
 *
 * `'unsafe-inline'` stays on `style-src`: no nonce covers an inline `style`
 * attribute, and injected CSS is a much smaller problem than injected script.
 */
function buildCsp(nonce) {
  const isDev = process.env.NODE_ENV === "development";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob: https://images.unsplash.com",
    "media-src 'self' blob:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""}`,
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co${
      isDev ? " ws: wss:" : ""
    }`,
    "upgrade-insecure-requests",
  ].join("; ");
}

// ה-middleware רץ לפני כל בקשה לעמודי /admin, ובודק אם המשתמש מחובר.
// אם לא - מפנה אותו לעמוד ההתחברות.
export async function middleware(originalRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce);

  // Next reads the nonce off the *request's* CSP header, so it has to travel
  // downstream on the request the auth flow forwards — not just on the response.
  const headers = new Headers(originalRequest.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);
  const request = new NextRequest(originalRequest, { headers });

  const withCsp = (response) => {
    response.headers.set("Content-Security-Policy", csp);
    return response;
  };

  // The nonce policy is /admin-only, and so is the auth check. The public
  // pages are prerendered — they are built without a request, so their inline
  // scripts carry no nonce and a nonce-bearing CSP would block them. Those
  // pages keep the static policy from `next.config.mjs` instead; they hold no
  // session and take no input, so what they lose is the smaller half.
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return withCsp(NextResponse.redirect(url));
  }

  // אם המשתמש כבר מחובר וניגש לעמוד ההתחברות - נעביר אותו ישר לאדמין
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return withCsp(NextResponse.redirect(url));
  }

  return withCsp(supabaseResponse);
}

export const config = {
  // Every document, so every document gets a nonce. Static assets and image
  // optimisation are excluded — they are not HTML and carry no inline script.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]+$).*)"],
};
