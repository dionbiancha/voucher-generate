import { useState } from "react";
import { Box, Button, FormLabel, Input, Stack } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

interface ItemListOption {
  value: string;
  title: string;
}

interface TimeInputProps {
  title: string;
  sx?: {
    [key: string]: any; // Pode ser mais específico dependendo dos estilos que você deseja permitir
  };
}

function ItemList({ title, value }: ItemListOption) {
  const { t } = useTranslation();
  return (
    <p>
      {t(`${title}`)}: <span style={{ fontWeight: 400 }}>{value}</span>
    </p>
  );
}

function TimeInput({ title, sx }: TimeInputProps) {
  const { showPreview } = usePreview();
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { t } = useTranslation();
  const [formState, setFormState] = useState<string>("");

  const handleEnableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  function isEmpty() {
    if (formState) return false;
    return true;
  }

  if (showPreview && isInputDisabled) return <></>;

  return (
    <Box sx={sx}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        mt={!showPreview ? "20px" : ""}
      >
        {!showPreview && (
          <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
            {t(`${title}`)}
          </FormLabel>
        )}

        {!showPreview && (
          <Button h="1.75rem" size="sm" onClick={handleEnableInput}>
            {isInputDisabled ? t("Exibir") : t("Esconder")}
          </Button>
        )}
      </Stack>
      {!showPreview && (
        <Input
          disabled={isInputDisabled}
          type="time"
          sx={{ marginY: "5px" }}
          value={formState}
          onChange={(e) => setFormState(e.target.value)}
        />
      )}

      {isEmpty() ? (
        isInputDisabled ? (
          <></>
        ) : (
          <>
            {showPreview && !formState && (
              <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
                {t(`${title}`)}
              </FormLabel>
            )}

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
              {t("Nenhum horário encontrado")}
            </Box>
          </>
        )
      ) : (
        <Box
          mt={4}
          style={{
            fontWeight: 500,
            opacity: isInputDisabled ? 0.3 : 1,
          }}
        >
          {formState && showPreview && (
            <ItemList title={title} value={formState} />
          )}
        </Box>
      )}
    </Box>
  );
}

export default TimeInput;
