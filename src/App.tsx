import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Button, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import "./i18n";

function App() {
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <header>
      <Button onClick={toggleColorMode}>
        {t("welcome")} {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}

export default App;
