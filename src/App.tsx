import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Box, Container } from "@chakra-ui/react";
import "./i18n";
import Header from "./components/header";
import SelectLogo from "./features/SelectLogo";
import { PreviewProvider } from "./context/PreviewContext";

function App() {
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <PreviewProvider>
      <Container maxW="1200px" padding="30px">
        <Header />
        <Box id="pdf">
          <SelectLogo />
        </Box>
      </Container>
    </PreviewProvider>
  );
}

export default App;
