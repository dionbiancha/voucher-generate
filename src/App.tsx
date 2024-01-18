import { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Box, Button, Container, Divider, Stack } from "@chakra-ui/react";
import "./i18n";
import Header from "./features/header";
import SelectLogo from "./features/SelectLogo";
import ContactArea from "./features/ContactArea";
import Location from "./features/Location";
import Date from "./features/Date";
import Information from "./features/Information";
import TextInput from "./components/TextInput";
import { AddIcon } from "@chakra-ui/icons";
import Product from "./features/Product";

function ContentArea() {
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
        <Product />
        <TextInput
          title="Politica de Cancelamentos"
          placeholder="Digite suas politica de cancelamentos"
          emptyText="Nenhum dado encontrada"
          divider
        />

        <TextInput
          title="Observações"
          placeholder="Digite suas obervações"
          emptyText="Nenhuma observação encontrada"
        />
      </Stack>
    </Stack>
  );
}

function App() {
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
        <Header />
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
            <Button
              onClick={() => removeAdditionalArea(index)}
              colorScheme="red"
            >
              Excluir
            </Button>
          </Box>
        </Container>
      ))}
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
    </Stack>
  );
}

export default App;
