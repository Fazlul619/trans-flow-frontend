import { ContactUs } from "~/pages/conactUs";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
}

export default function Home() {
  return < ContactUs/>;
}
