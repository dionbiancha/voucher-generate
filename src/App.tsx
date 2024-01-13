import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Button, useColorMode } from "@chakra-ui/react";

function App() {
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}

export default App;
