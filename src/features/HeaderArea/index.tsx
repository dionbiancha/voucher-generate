import { Button, ButtonGroup, Select, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DownloadIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import html2pdf from "html2pdf.js";
import { usePreview } from "../../context/DataContext";
import ImageModal from "../ImageBackground";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

function HeaderArea() {
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

  const handleDownload = () => {
    const config = {
      margin: 1,
      filename: "Voucher.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
    };
    const element = document.getElementById("pdf"); // Substitua 'conteudo' pelo ID do elemento que você quer converter para PDF
    html2pdf(element, config);
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
          colorScheme="green"
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
