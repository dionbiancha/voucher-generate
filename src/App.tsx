import { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Stack,
} from "@chakra-ui/react";
import "./i18n";
import HeaderArea from "./features/HeaderArea";
import SelectLogo from "./features/SelectLogo";
import ContactArea from "./features/ContactArea";
import Location from "./features/Location";
import Information from "./features/Information";
import TextInput from "./components/TextInput";
import { AddIcon } from "@chakra-ui/icons";
import Product from "./features/Product";
import { usePreview } from "./context/PreviewContext";
import DateInput from "./components/DateInput";
import QRCode from "react-qr-code";
import SelectConsultant from "./features/SelectConsultant";

function ContentArea() {
  const { showQRCODE } = usePreview();
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack
        sx={{
          backgroundColor: "#e2e8f01c",
          width: "500px",
          padding: "15px",
        }}
        direction={"column"}
      >
        <FormControl mb={5}>
          <TextInput
            title="Número de confirmação"
            placeholder="Digite o número de confirmação"
            emptyText="Nenhum número encontrado"
          />
        </FormControl>

        <DateInput title="De" />
        <DateInput title="Até" sx={{ marginBottom: "50px" }} />

        <Location />
        <SelectConsultant />
        <DateInput
          title="Data de criação do voucher"
          sx={{ marginBottom: "30px" }}
        />
        {showQRCODE && (
          <QRCode
            size={320}
            style={{ paddingTop: "20px" }}
            value={showQRCODE}
          />
        )}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          paddingLeft: "20px",
        }}
        direction={"column"}
      >
        <Information />
        <Product />
        <TextInput
          title="Política de cancelamento"
          placeholder="Digite sua política de cancelamento"
          emptyText="Nenhum dado encontrado"
          divider
        />

        <TextInput
          title="Observações"
          placeholder="Digite suas observações"
          emptyText="Nenhuma observação encontrada"
        />
      </Stack>
    </Stack>
  );
}

function App() {
  const { showPreview } = usePreview();
  const [additionalAreas, setAdditionalAreas] = useState<
    Record<string, unknown>[]
  >([]);

  const addAdditionalArea = () => {
    setAdditionalAreas((prevAreas) => [...prevAreas, {}]);
  };

  const removeAdditionalArea = (index: number) => {
    setAdditionalAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
  };

  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <Stack direction={"column"} padding="30px" alignItems={"center"}>
      <Container maxW="1200px">
        <HeaderArea />
      </Container>
      <Container id="pdf" maxW="1200px" paddingX="30px">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={"50px"}>
            <SelectLogo />
            <ContactArea />
          </Stack>
          <p style={{ fontSize: "40px", fontWeight: "600" }}>Voucher</p>
        </Stack>
        <Divider sx={{ marginY: "30px" }} />
        <ContentArea />
      </Container>
      {additionalAreas.map((_, index) => (
        <Container key={index} id={`pdf${index}`} maxW="1200px" paddingX="30px">
          <Divider sx={{ marginY: "30px" }} />
          <ContentArea />
          {!showPreview && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                border: "1px dashed red",
                width: "100%",
                maxWidth: "1140px",
                padding: "20px",
                borderRadius: "5px",
                fontSize: "13px",
              }}
            >
              <Button
                onClick={() => removeAdditionalArea(index)}
                colorScheme="red"
              >
                Excluir
              </Button>
            </Box>
          )}
        </Container>
      ))}
      {!showPreview && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            border: "1px dashed",
            width: "100%",
            maxWidth: "1140px",
            padding: "20px",
            borderRadius: "5px",
            fontSize: "13px",
          }}
        >
          <Button size={"lg"} onClick={addAdditionalArea} colorScheme="gray">
            <AddIcon />
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default App;
