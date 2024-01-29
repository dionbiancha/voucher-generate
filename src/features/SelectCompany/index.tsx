import React, { useState } from "react";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

type Option = {
  value: string;
  label: string;
  consultor: string;
};

const optionsLogo: Option[] = [
  {
    value: "Companhia  de exemplo",
    label: "Companhia  de exemplo",
    consultor: "Texto de exemplo",
  },
  {
    value: "Companhia  de exemplo 2",
    label: "Companhia  de exemplo 2",
    consultor: "Texto de exemplo",
  },
  {
    value: "Companhia  de exemplo 3",
    label: "Companhia  de exemplo 3",
    consultor: "Texto de exemplo",
  },
];

function SelectCompany() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [selectedOptionCompany, setSelectedOptionCompany] =
    useState<Option | null>(null);

  const handleSelectContact = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected =
      optionsLogo.find((option) => option.value === selectedValue) || null;
    setSelectedOptionCompany(selected);
  };

  if (showPreview && !selectedOptionCompany) return <></>;

  return (
    <Box sx={{ maxWidth: "500px", marginTop: "20px" }}>
      {!showPreview && (
        <FormControl>
          <FormLabel>{t("Selecione uma companhia")}</FormLabel>
          <Select
            placeholder={t("Nenhuma companhia selecionada")}
            width="100%"
            onChange={handleSelectContact}
            value={selectedOptionCompany?.value || ""}
          >
            {optionsLogo.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedOptionCompany && showPreview && (
        <Box mt={4} style={{ fontWeight: 500 }}>
          <p>{t(`Operador`)}</p>
          <p style={{ fontWeight: 400, marginBottom: "20px" }}>
            {selectedOptionCompany.value}
          </p>
          <p>{t(`Emergências`)}</p>
          <p style={{ fontWeight: 400 }}>{selectedOptionCompany.consultor}</p>
        </Box>
      )}
    </Box>
  );
}

export default SelectCompany;
