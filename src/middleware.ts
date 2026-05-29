import { defineMiddleware } from "astro:middleware";

const redirects: Record<string, string> = {
  "/resume": "/resume.pdf",
  "/bigtuna": "/bulldog",
  "/big-tuna.html": "/bulldog",
  "/bulldog-backup.html": "/bulldog",
};

export const onRequest = defineMiddleware((context, next) => {
  const target = redirects[context.url.pathname];
  if (target) {
    return context.redirect(target, 301);
  }
  return next();
});
