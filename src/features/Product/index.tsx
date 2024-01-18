import React, { useState } from "react";
import { Box, Divider, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";
import TextInput from "../../components/TextInput";

// Interface for form data
interface FormData {
  type: string;
  roomType: string;
  accommodationRegime: string;
  accommodationDetails: string;
  serviceType: string;
  serviceRegime: string;
  serviceDetails: string;
}

function Product() {
  const { t } = useTranslation();
  const { showPreview } = usePreview();
  const [formData, setFormData] = useState<FormData>({
    type: "",
    roomType: "",
    accommodationRegime: "",
    accommodationDetails: "",
    serviceType: "",
    serviceRegime: "",
    serviceDetails: "",
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      type: event.target.value,
    });
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>{t("Serviço")}</FormLabel>
        {!showPreview && (
          <Select
            placeholder={t("Selecione o serviço")}
            onChange={handleTypeChange}
            value={formData.type}
          >
            <option value="hotel">{t("Hotel")}</option>
            <option value="service">{t("Serviço")}</option>
          </Select>
        )}
      </FormControl>

      {formData.type === "hotel" && (
        <>
          <FormControl mt={10}>
            <TextInput
              title="Tipo de quarto"
              placeholder="Preencha o tipo do quarto"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>
          <FormControl mt={10}>
            <TextInput
              title="Regime da hospedagem"
              placeholder="Preencha o regime da hospedagem"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>

          <FormControl mt={10}>
            <TextInput
              title="Detalhes da hospedagem"
              placeholder="Preencha os detalhes da hospedagem"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>
        </>
      )}

      {formData.type === "service" && (
        <>
          <FormControl mt={10}>
            <TextInput
              title="Tipo de serviço"
              placeholder="Preencha seu tipo de serviço"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>

          <FormControl mt={10}>
            <TextInput
              title="Regime de serviço"
              placeholder="Preencha seu regime de serviço"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>

          <FormControl mt={10}>
            <TextInput
              title="Detalhes do serviço"
              placeholder="Preencha os detalhes do serviço"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>
        </>
      )}
      <Divider sx={{ marginY: "30px" }} />
    </Box>
  );
}

export default Product;
