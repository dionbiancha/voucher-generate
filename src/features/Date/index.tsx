import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { addDays, format } from "date-fns"; // Importa a função format do date-fns

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
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { t } = useTranslation();
  const [formState, setFormState] = useState<DateProps>({
    from: "",
    to: "",
  });

  const handleEnableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  };

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

  if (showPreview && isInputDisabled) return <></>;

  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
          {t("Data")}
        </FormLabel>
        {!showPreview && (
          <Button h="1.75rem" size="sm" onClick={handleEnableInput}>
            {isInputDisabled ? "Exibir" : "Esconder"}
          </Button>
        )}
      </Stack>
      {!showPreview && (
        <FormControl>
          <Input
            disabled={isInputDisabled}
            type="date"
            sx={{ marginY: "5px" }}
            value={formState.from}
            onChange={(e) => handleChange("from", e.target.value)}
          />
          <Input
            disabled={isInputDisabled}
            type="date"
            sx={{ marginY: "5px" }}
            value={formState.to}
            onChange={(e) => handleChange("to", e.target.value)}
          />
        </FormControl>
      )}

      {isEmpty() ? (
        isInputDisabled ? (
          <></>
        ) : (
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
            {t("Nenhuma data encontrada")}
          </Box>
        )
      ) : (
        <Box
          mt={4}
          style={{ fontWeight: 500, opacity: isInputDisabled ? 0.3 : 1 }}
        >
          {formState.from && (
            <ItemList
              title="De"
              value={format(addDays(new Date(formState.from), 1), "dd/MM/yyyy")}
            />
          )}
          {formState.to && (
            <ItemList
              title="Até"
              value={format(addDays(new Date(formState.to), 1), "dd/MM/yyyy")}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default DateSelect;
