import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "./routes/layout.tsx", [
        index("./routes/home.tsx"), 
        route("signup", "./routes/signup.tsx"),
        route("login", "./routes/login.tsx"),
        route("admin", "./routes/admin.tsx"),
        route("oauth-success", "./routes/OAuthSuccess.tsx"),
    ]),
] satisfies RouteConfig;
