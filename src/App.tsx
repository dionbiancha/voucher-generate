import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Container, Divider, Stack } from "@chakra-ui/react";
import "./i18n";
import Header from "./features/header";
import SelectLogo from "./features/SelectLogo";
import { usePreview } from "./context/PreviewContext";
import ContactArea from "./features/ContactArea";
import Location from "./features/Location";
import Date from "./features/Date";
import Information from "./features/Information";
import TextInput from "./components/TextInput";
import QRCode from "react-qr-code";

function App() {
  const { qrCodeLink } = usePreview();
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <>
      <Container maxW="1200px" padding="30px">
        <Header />
      </Container>
      <Container id="pdf" maxW="1200px" paddingX="30px">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={"50px"}>
            <SelectLogo />
            <ContactArea />
          </Stack>
          <p style={{ fontSize: "40px", fontWeight: "600" }}>Voucher</p>
          {qrCodeLink && <QRCode size={150} value={qrCodeLink} />}
        </Stack>
        <Divider sx={{ marginY: "30px" }} />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack
            sx={{
              backgroundColor: "#e2e8f01c",
              width: "350px",
              padding: "15px",
            }}
            direction={"column"}
          >
            <Date />
            <Location />
          </Stack>
          <Stack
            sx={{
              width: "100%",
              paddingLeft: "20px",
            }}
            direction={"column"}
          >
            <Information />
            <TextInput
              title="Politica de Cancelamentos"
              placeholder="Digite suas politica de cancelamentos"
              emptyText="Nenhum dado encontrada"
            />
            <TextInput
              title="Observações"
              placeholder="Digite suas obervações"
              emptyText="Nenhuma observação encontrada"
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default App;
