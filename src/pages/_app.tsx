import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CarDataProvider } from "@/Context/CarDataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarDataProvider>
      <Component {...pageProps} />
    </CarDataProvider>
  );
}
