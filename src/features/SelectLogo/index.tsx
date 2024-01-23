import React, { useState } from "react";
import { Box, FormControl, FormLabel, Image, Select } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

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

  if (showPreview && !selectedOptionLogo) return <></>;

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

      {selectedOptionLogo && (
        <Image
          src={selectedOptionLogo.imagePreviewUrl}
          alt={`Preview`}
          boxSize="150px"
          objectFit="cover"
        />
      )}
    </Box>
  );
}

export default SelectLogo;
