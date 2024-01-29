import React, { useState } from "react";
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

type Option = {
  value: string;
  label: string;
};

const optionsLogo: Option[] = [
  {
    value: "João França",
    label: "João França",
  },
  {
    value: "Luiza Milioli",
    label: "Luiza Milioli",
  },
  {
    value: "Cleber da Cunha",
    label: "Cleber da Cunha",
  },
];

function SelectConsultant() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [selectedOptionConsultant, setSelectedOptionConsultant] =
    useState<Option | null>(null);

  const handleSelectConsultant = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const selected =
      optionsLogo.find((option) => option.value === selectedValue) || null;
    setSelectedOptionConsultant(selected);
  };

  if (showPreview && !selectedOptionConsultant) return <></>;
  return (
    <Box sx={{ marginY: "30px" }}>
      <FormControl>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FormLabel>{t("Consultor")}</FormLabel>
        </Stack>

        {!showPreview && (
          <Select
            placeholder={t("Nenhum consultor selecionado")}
            width="100%"
            onChange={handleSelectConsultant}
            value={selectedOptionConsultant?.value || ""}
          >
            {optionsLogo.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </FormControl>

      {selectedOptionConsultant && showPreview && (
        <Box mt={1}>{selectedOptionConsultant.value}</Box>
      )}
    </Box>
  );
}

export default SelectConsultant;
