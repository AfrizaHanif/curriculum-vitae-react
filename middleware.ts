import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { portfolioItems } from "./src/lib/data/portfolioData";
import { blogItems } from "./src/lib/data/blogData";

export function middleware(req: NextRequest) {
  // Match /portfolio/:param (no trailing segments)
  try {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // Match /portfolio/:param (no trailing segments)
    const match = pathname.match(/^\/portfolio\/([^/]+)\/?$/);
    if (!match) return;

    const param = decodeURIComponent(match[1]);
    const lowerParam = param.toLowerCase();

    // Determine section (portfolio or blog) and perform matching accordingly
    const sectionMatch = pathname.match(/^\/(portfolio|blog)\//);
    const section = sectionMatch ? sectionMatch[1] : "portfolio";

    // Debug mode: return diagnostics when ?mw-debug=1 is present
    if (url.searchParams.get("mw-debug") === "1") {
      const matchedSlugPortfolio = !!portfolioItems.find(
        (p) => p.slug === param || p.slug.toLowerCase() === lowerParam
      );
      // const matchedIdPortfolio =
      //   portfolioItems.find(
      //     (p) => p.id === param || p.id.toLowerCase() === lowerParam
      //   )?.id ?? null;
      const matchedSlugBlog = !!blogItems.find(
        (p) => p.slug === param || p.slug.toLowerCase() === lowerParam
      );
      // const matchedIdBlog =
      //   blogItems.find(
      //     (p) => p.id === param || p.id.toLowerCase() === lowerParam
      //   )?.id ?? null;
      return NextResponse.json({
        param,
        section,
        matchedSlugPortfolio,
        // matchedIdPortfolio,
        matchedSlugBlog,
        // matchedIdBlog,
      });
    }

    if (section === "portfolio") {
      // If param already matches a slug (case-insensitive), continue
      const bySlug = portfolioItems.find(
        (p) => p.slug === param || p.slug.toLowerCase() === lowerParam
      );
      if (bySlug) {
        const res = NextResponse.next();
        res.headers.set("x-middleware-status", "matched-slug");
        res.headers.set("x-middleware-slug", bySlug.slug);
        return res;
      }

      // If param matches an id (case-insensitive), redirect to slug
      // const byId = portfolioItems.find(
      //   (p) => p.id === param || p.id.toLowerCase() === lowerParam
      // );
      // if (byId) {
      //   url.pathname = `/portfolio/${encodeURIComponent(byId.slug)}`;
      //   const res = NextResponse.redirect(url, 308);
      //   res.headers.set("x-redirected-by", "portfolio-middleware");
      //   res.headers.set("x-redirect-from", param);
      //   res.headers.set("x-redirect-to", byId.slug);
      //   return res;
      // }
    } else if (section === "blog") {
      // If param already matches a slug (case-insensitive), continue
      const bySlug = blogItems.find(
        (p) => p.slug === param || p.slug.toLowerCase() === lowerParam
      );
      if (bySlug) {
        const res = NextResponse.next();
        res.headers.set("x-middleware-status", "matched-slug-blog");
        res.headers.set("x-middleware-slug", bySlug.slug);
        return res;
      }

      // If param matches an id (case-insensitive), redirect to slug
      // const byId = blogItems.find(
      //   (p) => p.id === param || p.id.toLowerCase() === lowerParam
      // );
      // if (byId) {
      //   url.pathname = `/blog/${encodeURIComponent(byId.slug)}`;
      //   const res = NextResponse.redirect(url, 308);
      //   res.headers.set("x-redirected-by", "blog-middleware");
      //   res.headers.set("x-redirect-from", param);
      //   res.headers.set("x-redirect-to", byId.slug);
      //   return res;
      // }
    }

    const res = NextResponse.next();
    res.headers.set("x-middleware-status", "no-match");
    return res;
  } catch (err: unknown) {
    const res = NextResponse.next();
    res.headers.set(
      "x-middleware-error",
      String(err instanceof Error ? err.message : err)
    );
    return res;
  }
}

export const config = {
  // If middleware is only used for other routes, adjust or remove these:
  // matcher: ["/portfolio/:id*", "/blog/:id*"],
};
