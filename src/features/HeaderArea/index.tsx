import {
  Button,
  ButtonGroup,
  Select,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  DownloadIcon,
  MoonIcon,
  SunIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import html2pdf from "html2pdf.js";
import { usePreview } from "../../context/PreviewContext";

function HeaderArea() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { i18n, t } = useTranslation();
  const { showPreview, setShowPreview } = usePreview();

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  function isLight() {
    return colorMode === "light";
  }

  const handleDownload = () => {
    const element = document.getElementById("pdf"); // Substitua 'conteudo' pelo ID do elemento que você quer converter para PDF
    html2pdf(element);
  };

  return (
    <Stack
      width="100%"
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ marginBottom: "50px" }}
    >
      <ButtonGroup spacing="6">
        <Button
          onClick={() => setShowPreview(!showPreview)}
          rightIcon={showPreview ? <ViewIcon /> : <ViewOffIcon />}
          colorScheme="blue"
        >
          {t("Prévia")}
        </Button>
        <Button onClick={handleDownload} rightIcon={<DownloadIcon />}>
          PDF
        </Button>
      </ButtonGroup>
      <Stack width="100%" direction={"row"} justifyContent={"end"}>
        <Select width="100px" onChange={handleLanguageChange}>
          <option value="pt-BR">PT</option>
          <option value="en-US">EN</option>
          <option value="es-ES">ES</option>
        </Select>
        <Button onClick={toggleColorMode}>
          {isLight() ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Stack>
  );
}

export default HeaderArea;
