import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";

interface TextFieldProps {
  title: string;
  placeholder: string;
  emptyText: string;
}

function TextField({ title, placeholder, emptyText }: TextFieldProps) {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState("");

  function isEmpty() {
    if (formState) return false;
    return true;
  }

  return (
    <Box sx={{ paddingBottom: "30px" }}>
      <FormLabel>{t(`${title}`)}</FormLabel>
      {!showPreview && (
        <FormControl>
          <Input
            type="text"
            sx={{ marginY: "5px" }}
            placeholder={t(`${placeholder}`)}
            value={formState}
            onChange={(e) => setFormState(e.target.value)}
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
          {t(`${emptyText}`)}
        </Box>
      ) : (
        <Box mt={4}>{formState}</Box>
      )}
    </Box>
  );
}

export default TextField;
