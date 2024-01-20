import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";
import QRCode from "react-qr-code";

interface ItemListOption {
  value: string;
  title: string;
}

interface LocationProps {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  link?: string;
}

function ItemList({ title, value }: ItemListOption) {
  const { t } = useTranslation();
  return (
    <p style={{ margin: "5px" }}>
      {t(`${title}`)}: <span style={{ fontWeight: 400 }}>{value}</span>
    </p>
  );
}

function Location() {
  const { showPreview } = usePreview();
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { t } = useTranslation();
  const [formState, setFormState] = useState<LocationProps>({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (field: keyof LocationProps, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleEnableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  function isEmpty() {
    if (
      formState.link ||
      formState.address ||
      formState.city ||
      formState.country ||
      formState.name ||
      formState.state
    )
      return false;
    return true;
  }

  if (showPreview && isInputDisabled) return <></>;

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
          {t("Localização")}
        </FormLabel>
        {!showPreview && (
          <Button h="1.75rem" size="sm" onClick={handleEnableInput}>
            {isInputDisabled ? t("Exibir") : t("Esconder")}
          </Button>
        )}
      </Stack>
      {!showPreview && (
        <FormControl>
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("Nome")}
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("Link QR Code")}
            value={formState.link}
            onChange={(e) => {
              handleChange("link", e.target.value);
            }}
          />
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("Endereço")}
            value={formState.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("Cidade")}
            value={formState.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("Estado")}
            value={formState.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
          <Input
            disabled={isInputDisabled}
            sx={{ marginY: "5px" }}
            placeholder={t("País")}
            value={formState.country}
            onChange={(e) => handleChange("country", e.target.value)}
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
            {t("Nenhuma localização encontrada")}
          </Box>
        )
      ) : (
        <Box
          mt={4}
          style={{ fontWeight: 500, opacity: isInputDisabled ? 0.3 : 1 }}
        >
          {formState.name && <ItemList title="Nome" value={formState.name} />}
          {formState.address && (
            <ItemList title="Endereço" value={formState.address} />
          )}
          {formState.city && <ItemList title="Cidade" value={formState.city} />}
          {formState.state && (
            <ItemList title="Estado" value={formState.state} />
          )}
          {formState.country && (
            <ItemList title="País" value={formState.country} />
          )}
          {formState.link && (
            <QRCode
              size={300}
              style={{ paddingTop: "20px" }}
              value={formState.link}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default Location;
