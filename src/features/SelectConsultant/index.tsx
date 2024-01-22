import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

type Option = {
  value: string;
  label: string;
};

const optionsLogo: Option[] = [
  {
    value: "Lerigou da silva",
    label: "Lerigou da silva",
  },
  {
    value: "Zé gotinha",
    label: "Zé gotinha",
  },
  {
    value: "Irineu da cunha",
    label: "Irineu da cunha",
  },
];

function SelectConsultant() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [selectedOptionConsultant, setSelectedOptionConsultant] =
    useState<Option | null>(null);

  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleSelectConsultant = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const selected =
      optionsLogo.find((option) => option.value === selectedValue) || null;
    setSelectedOptionConsultant(selected);
  };

  const handleEnableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  if (showPreview && isInputDisabled) return <></>;

  return (
    <Box sx={{ marginY: "30px" }}>
      <FormControl>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
            {t("Consultor")}
          </FormLabel>
          {!showPreview && (
            <Button h="1.75rem" size="sm" onClick={handleEnableInput}>
              {isInputDisabled ? t("Exibir") : t("Esconder")}
            </Button>
          )}
        </Stack>

        {!showPreview && (
          <Select
            disabled={isInputDisabled}
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

      {selectedOptionConsultant ? (
        <Box mt={4} sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
          {selectedOptionConsultant.value}
        </Box>
      ) : isInputDisabled ? (
        <></>
      ) : (
        <Box
          sx={{
            marginTop: "20px",
            border: "1px dashed",
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "13px",
          }}
        >
          {t("Nenhum consultor selecionado")}
        </Box>
      )}
    </Box>
  );
}

export default SelectConsultant;
