import { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Image,
  Stack,
  useColorMode,
  useToast,
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
import { useTranslation } from "react-i18next";
import TimeInput from "./components/TimeInput";
import SelectCompany from "./features/SelectCompany";

function ContentArea() {
  const { selectType } = usePreview();
  const [linkCode, setLinkCode] = useState("");
  useEffect(() => {
    serviceWorkerRegistration.register();
  }, []);

  function isHotel() {
    return selectType === "Hotel";
  }

  function isTransfer() {
    return selectType === "Transfer";
  }

  // function isPasseio() {
  //   return selectType === "Passeio";
  // }

  // function isTicket() {
  //   return selectType === "Ticket";
  // }

  return (
    <Stack width="100%" direction={"row"} justifyContent={"space-between"}>
      <Stack
        sx={{
          backgroundColor: "#e2e8f01c",
          maxWidth: "350px",
          width: "100%",
          padding: "15px",
        }}
        direction={"column"}
      >
        <FormControl mb={5}>
          <TextInput
            title="Número de confirmação"
            placeholder="Digite o número de confirmação"
            bold
          />
        </FormControl>
        {isTransfer() && <Divider />}

        <DateInput title={isTransfer() ? "Chegada" : "De"} />
        {isTransfer() && (
          <>
            <FormControl my={4}>
              <TextInput
                title="Aeroporto"
                placeholder="Digite o nome do aeroporto"
              />
            </FormControl>

            <TimeInput title={"Horário"} />

            <FormControl my={4}>
              <TextInput title="Voo" placeholder="Digite o voo" />
            </FormControl>
            <FormControl my={4}>
              <TextInput title="Hotel" placeholder="Digite o nome do hotel" />
            </FormControl>

            <Divider />
          </>
        )}
        <DateInput title={isTransfer() ? "Saída" : "Até"} />
        {isTransfer() && (
          <>
            <FormControl my={4}>
              <TextInput title="Hotel" placeholder="Digite o nome do hotel" />
            </FormControl>

            <TimeInput title={"Horário de pick up"} />

            <FormControl my={4}>
              <TextInput
                title="Aeroporto"
                placeholder="Digite o nome do aeroporto"
              />
            </FormControl>

            <TimeInput title={"Horário do voo"} />

            <FormControl my={4}>
              <TextInput title="Voo" placeholder="Digite o voo" />
            </FormControl>

            <Divider />
          </>
        )}

        {!isHotel() && (
          <FormControl my={4}>
            <TextInput
              title="Telefone do pax"
              placeholder="Digite o telefone"
            />
          </FormControl>
        )}
        {isHotel() && (
          <>
            <Location setLinkQRCode={setLinkCode} />
            <SelectCompany />
          </>
        )}

        <SelectConsultant />
        <DateInput
          title="Data de criação do voucher"
          sx={{ marginBottom: "30px" }}
        />
        {linkCode && (
          <QRCode
            size={200}
            style={{ paddingBottom: "20px" }}
            value={linkCode}
          />
        )}
      </Stack>

      <Product />
    </Stack>
  );
}

function App() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { showPreview, selectBackground } = usePreview();
  const [additionalAreas, setAdditionalAreas] = useState<
    Record<string, unknown>[]
  >([]);

  const addAdditionalArea = () => {
    setAdditionalAreas((prevAreas) => [...prevAreas, {}]);
  };

  const removeAdditionalArea = (index: number) => {
    setAdditionalAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
    toast({
      title: t("Voucher deletado com sucesso!"),
      status: "success",
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
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
        minHeight: "100vh",
        backgroundImage: selectBackground,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack
        sx={{
          minHeight: "100vh",
          backgroundColor: isLight() ? "#FFFFFF" : "#1A202C",
          color: isLight() ? "#000000" : "#FFFFFF",
        }}
        maxWidth="1200px"
        width="100%"
        direction={"column"}
        padding="30px"
        alignItems={"center"}
      >
        <HeaderArea />

        <Box maxWidth="1200px" width="100%" id="pdf">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Image sx={{ height: "30px" }} src={"logos/arkbeds.png"} />
            <p style={{ fontSize: "30px", fontWeight: "600" }}>Voucher</p>
          </Stack>
          <Divider sx={{ marginY: "30px", border: "1px dashed #EDF2F7" }} />
          <Stack direction={"row"} spacing={"10px"}>
            <SelectLogo />
            <ContactArea />
          </Stack>
          <Box sx={{ marginY: "50px" }} />
          <ContentArea />
        </Box>
        {additionalAreas.map((_, index) => (
          <Box key={index} id={`pdf${index}`}>
            <Divider sx={{ marginY: "30px", border: "1px dashed #EDF2F7" }} />
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
                  {t("Excluir")}
                </Button>
              </>
            )}
          </Box>
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
