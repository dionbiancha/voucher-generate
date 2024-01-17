import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { format } from "date-fns"; // Importa a função format do date-fns

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";

interface ItemListOption {
  value: string;
  title: string;
}

interface DateProps {
  from: string;
  to: string;
}

function ItemList({ title, value }: ItemListOption) {
  const { t } = useTranslation();
  return (
    <p style={{ margin: "5px" }}>
      {t(`${title}`)}: <span style={{ fontWeight: 400 }}>{value}</span>
    </p>
  );
}

function DateSelect() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<DateProps>({
    from: "",
    to: "",
  });

  const handleChange = (field: keyof DateProps, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  function isEmpty() {
    if (formState.from || formState.to) return false;
    return true;
  }

  return (
    <Box sx={{ marginBottom: "30px" }}>
      <FormLabel>{t("Data")}</FormLabel>
      {!showPreview && (
        <FormControl>
          <Input
            type="date"
            sx={{ marginY: "5px" }}
            value={formState.from}
            onChange={(e) => handleChange("from", e.target.value)}
          />
          <Input
            type="date"
            sx={{ marginY: "5px" }}
            value={formState.to}
            onChange={(e) => handleChange("to", e.target.value)}
          />
        </FormControl>
      )}

      {isEmpty() ? (
        <Box
          sx={{
            marginTop: "20px",
            border: "1px dashed",
            width: "320px",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "13px",
          }}
        >
          {t("Nenhum data encontrada")}
        </Box>
      ) : (
        <Box mt={4} style={{ fontWeight: 500 }}>
          {formState.from && (
            <ItemList
              title="De"
              value={format(new Date(formState.from), "dd/MM/yyyy")}
            />
          )}
          {formState.to && (
            <ItemList
              title="Até"
              value={format(new Date(formState.to), "dd/MM/yyyy")}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default DateSelect;
