import { useState } from "react";
import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

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

interface Props {
  setLinkQRCode: (value: string) => void;
}

function ItemList({ title, value }: ItemListOption) {
  const { t } = useTranslation();
  return (
    <p style={{ marginBottom: "5px" }}>
      {t(`${title}`)}: <span style={{ fontWeight: 400 }}>{value}</span>
    </p>
  );
}

function Location({ setLinkQRCode }: Props) {
  const { showPreview } = usePreview();
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

  function isEmpty() {
    if (
      formState.address ||
      formState.city ||
      formState.country ||
      formState.name ||
      formState.state
    )
      return false;
    return true;
  }

  if (showPreview && isEmpty()) return <></>;

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <FormLabel>{t("Localização")}</FormLabel>
      </Stack>
      {!showPreview && (
        <FormControl>
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("Nome")}
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("Link QR Code")}
            value={formState.link}
            onChange={(e) => {
              handleChange("link", e.target.value);
              setLinkQRCode(e.target.value);
            }}
          />
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("Endereço")}
            value={formState.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("Cidade")}
            value={formState.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("Estado")}
            value={formState.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
          <Input
            sx={{ marginY: "5px" }}
            placeholder={t("País")}
            value={formState.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </FormControl>
      )}

      {isEmpty() && (
        <Box mt={4} style={{ fontWeight: 500 }}>
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
        </Box>
      )}
    </Box>
  );
}

export default Location;
