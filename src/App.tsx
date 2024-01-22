import { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import "./i18n";
import HeaderArea from "./features/HeaderArea";
import SelectLogo from "./features/SelectLogo";
import ContactArea from "./features/ContactArea";
import Location from "./features/Location";
import TextInput from "./components/TextInput";
import { AddIcon } from "@chakra-ui/icons";
import Product from "./features/Product";
import { usePreview } from "./context/DataContext";
import DateInput from "./components/DateInput";
import QRCode from "react-qr-code";
import SelectConsultant from "./features/SelectConsultant";

function ContentArea() {
  const { showQRCODE, selectType } = usePreview();
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
            bold
          />
        </FormControl>

        <DateInput title="De" />
        <DateInput title="Até" sx={{ marginBottom: "50px" }} />
        {selectType !== "Serviço" && <Location />}

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

      <Product />
    </Stack>
  );
}

function App() {
  const { colorMode } = useColorMode();
  const { showPreview, selectBackground } = usePreview();
  const [additionalAreas, setAdditionalAreas] = useState<
    Record<string, unknown>[]
  >([]);

  const addAdditionalArea = () => {
    setAdditionalAreas((prevAreas) => [...prevAreas, {}]);
  };

  const removeAdditionalArea = (index: number) => {
    setAdditionalAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
  };

  function isLight() {
    return colorMode === "light";
  }

  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",

        backgroundImage: selectBackground,
        backgroundSize: "cover", // ou "100% 100%"
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack
        sx={{
          backgroundColor: isLight() ? "#FFFFFF" : "#1A202C",
          color: isLight() ? "#000000" : "#FFFFFF",
        }}
        width="100%"
        maxW="1200px"
        direction={"column"}
        justifyContent={"center"}
        padding="30px"
        alignItems={"center"}
      >
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
          <Container
            key={index}
            id={`pdf${index}`}
            maxW="1200px"
            paddingX="30px"
          >
            <Divider sx={{ marginY: "30px" }} />
            <ContentArea />
            {!showPreview && (
              <>
                <Divider sx={{ marginY: "30px" }} />
                <Button
                  width="100%"
                  onClick={() => removeAdditionalArea(index)}
                  colorScheme="red"
                  paddingY="25px"
                >
                  Excluir
                </Button>
              </>
            )}
          </Container>
        ))}
        {!showPreview && (
          <Button
            mt="15px"
            maxW="1140px"
            width="100%"
            size={"lg"}
            onClick={addAdditionalArea}
            colorScheme="gray"
            paddingY="25px"
          >
            <AddIcon />
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default App;
