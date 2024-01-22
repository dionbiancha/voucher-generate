import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import "./i18n";
import { DataProvider } from "./context/DataContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <DataProvider>
        <App />
      </DataProvider>
    </ChakraProvider>
  );
} else {
  console.error("Elemento com id 'root' não encontrado no DOM.");
}
