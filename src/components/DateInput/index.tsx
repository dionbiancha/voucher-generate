import { useState } from "react";
import { Box, FormLabel, Input, Stack } from "@chakra-ui/react";
import { addDays, format } from "date-fns"; // Importa a função format do date-fns

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

interface DateInputProps {
  title: string;
  sx?: {
    [key: string]: any; // Pode ser mais específico dependendo dos estilos que você deseja permitir
  };
}

function DateInput({ title, sx }: DateInputProps) {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<string>("");
  if (showPreview && !formState) return <></>;
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
          type="date"
          sx={{ marginY: "5px" }}
          value={formState}
          onChange={(e) => setFormState(e.target.value)}
        />
      )}

      {showPreview && formState && (
        <Box
          sx={{
            opacity: 1,
            width: "100%",
          }}
        >
          {format(addDays(new Date(formState), 1), "dd/MM/yyyy")}
        </Box>
      )}
    </Box>
  );
}

export default DateInput;
