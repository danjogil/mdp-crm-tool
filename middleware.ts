export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/leads",
    "/leads/new",
    "/leads/:id+",
    "/properties",
    "/properties/new",
    "/properties/:id+",
  ],
};
