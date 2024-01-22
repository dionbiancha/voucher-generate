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
import { usePreview } from "../../context/DataContext";
import ImageModal from "../ImageBackground";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

function HeaderArea() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { i18n, t } = useTranslation();
  const { showPreview, setShowPreview, setSelectBackground } = usePreview();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectImage = (imageUrl: string) => {
    setSelectBackground(imageUrl);
    localStorage.setItem("selectBackground", imageUrl);
  };
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

  useEffect(() => {
    const savedImage = localStorage.getItem("selectBackground");
    if (savedImage) {
      setSelectBackground(savedImage);
    }
  });

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
        <Button onClick={() => setIsModalOpen(true)}>
          <SettingsIcon />
        </Button>
      </Stack>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
    </Stack>
  );
}

export default HeaderArea;
