import { useState } from "react";
import { Box, FormLabel, Input, Stack } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

interface TimeInputProps {
  title: string;
  sx?: {
    [key: string]: any; // Pode ser mais específico dependendo dos estilos que você deseja permitir
  };
}

function TimeInput({ title, sx }: TimeInputProps) {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<string>("");

  return (
    <Box sx={sx}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        mt={!showPreview ? "20px" : ""}
      >
        <FormLabel>{t(`${title}`)}</FormLabel>
      </Stack>
      {!showPreview && (
        <Input
          type="time"
          sx={{ marginY: "5px" }}
          value={formState}
          onChange={(e) => setFormState(e.target.value)}
        />
      )}

      {showPreview && (
        <Box
          sx={{
            opacity: 1,
            width: "100%",
          }}
        >
          {formState}
        </Box>
      )}
    </Box>
  );
}

export default TimeInput;
