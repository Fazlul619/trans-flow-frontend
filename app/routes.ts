import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "./routes/layout.tsx", [
        index("./routes/home.tsx"), 
        route("signup", "./routes/signup.tsx"),
        route("login", "./routes/login.tsx"),
        route("oauth-success", "./routes/OAuthSuccess.tsx"),
        route("submit-transaction", "routes/submit-transaction.tsx"),
        route("transaction-history", "routes/transaction-history.tsx"),
        route("admin-transactions", "routes/admin-transactions.tsx"),
    ]),
] satisfies RouteConfig;
