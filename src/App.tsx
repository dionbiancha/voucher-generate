import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Container } from "@chakra-ui/react";
import "./i18n";
import Header from "./components/header";

function App() {
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);
  return (
    <Container maxW="1200px" padding="30px">
      <Header />
    </Container>
  );
}

export default App;
