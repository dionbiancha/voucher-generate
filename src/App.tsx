import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Box, Container, Divider, Stack } from "@chakra-ui/react";
import "./i18n";
import Header from "./components/header";
import SelectLogo from "./features/SelectLogo";
import { PreviewProvider } from "./context/PreviewContext";
import ContactArea from "./features/ContactArea";
import Location from "./features/Location";
import Information from "./features/Information";

function App() {
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <PreviewProvider>
      <Container maxW="1200px" padding="30px">
        <Header />
        <Stack direction={"row"} justifyContent={"space-between"} id="pdf">
          <Stack direction={"row"} spacing={"50px"}>
            <SelectLogo />
            <ContactArea />
          </Stack>
          <p style={{ fontSize: "40px", fontWeight: "600" }}>Voucher</p>
        </Stack>
        <Divider sx={{ marginY: "30px" }} />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack
            sx={{
              backgroundColor: "#e2e8f030",
              width: "350px",
              padding: "15px",
            }}
            direction={"column"}
          >
            <Location />
          </Stack>
          <Information />
        </Stack>
      </Container>
    </PreviewProvider>
  );
}

export default App;
