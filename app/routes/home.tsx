import { ContactUs } from "~/pages/conactUs.js";
import { Route } from "./+types/home.js";

export function meta({}: Route.MetaArgs) {
}

export default function Home() {
  return < ContactUs/>;
}
