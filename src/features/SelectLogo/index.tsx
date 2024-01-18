import React, { useState } from "react";
import { Box, FormControl, FormLabel, Image, Select } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";

type Option = {
  value: string;
  label: string;
  imagePreviewUrl: string;
};

const optionsLogo: Option[] = [
  {
    value: "Empresa 1",
    label: "Empresa 1",
    imagePreviewUrl: "/logos/1.png",
  },
  {
    value: "Empresa 2",
    label: "Empresa 2",
    imagePreviewUrl: "/logos/2.jpg",
  },
  {
    value: "Empresa 3",
    label: "Empresa 3",
    imagePreviewUrl: "/logos/3.jpg",
  },
];

function SelectLogo() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [selectedOptionLogo, setSelectedOptionLogo] = useState<Option | null>(
    null
  );

  const handleSelectLogo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected =
      optionsLogo.find((option) => option.value === selectedValue) || null;
    setSelectedOptionLogo(selected);
  };

  return (
    <Box>
      {!showPreview && (
        <FormControl>
          <FormLabel>{t("Selecione uma logo")}</FormLabel>
          <Select
            placeholder={t("Nenhum item selecionado")}
            width="200px"
            onChange={handleSelectLogo}
            value={selectedOptionLogo?.value || ""}
          >
            {optionsLogo.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedOptionLogo ? (
        <Box mt={4}>
          <Image
            src={selectedOptionLogo.imagePreviewUrl}
            alt={`Preview`}
            boxSize="200px"
            objectFit="cover"
          />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "20px",
            border: "1px dashed",
            width: "200px",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "13px",
          }}
        >
          {t("Nenhum item selecionado")}
        </Box>
      )}
    </Box>
  );
}

export default SelectLogo;
