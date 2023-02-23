import { ChakraProvider, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
