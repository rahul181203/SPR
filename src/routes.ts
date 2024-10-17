/**
 * An Array of routes that are accessable to public
 * These routes do not require auth
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    // "/"
]

export const authRoutes = [
    // "/"
]

export const protectedRoutes:string[] = [
    "/dashboard",
    "/dashboard/data",
    "/dashboard/customers",
    "/dashboard/orders",
    "/dashboard/products",
    "/dashboard/checkout",
    "/dashboard/payment-success",
    "/dashboard/services",
    "/dashboard/transactions",
    "/dashboard/referals",
    "/dashboard/cart"
]

/**
 * The prefix for API authentication routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_REDIRECT_PATH = "/dashboard/data"