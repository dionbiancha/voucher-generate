import React, { useState } from "react";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

type Option = {
  value: string;
  label: string;
  phone: string;
  agency: string;
};

const optionsLogo: Option[] = [
  {
    value: "Melisa Laura Rojo",
    label: "Melisa Laura Rojo",
    phone:
      "+55 45 3521-8585 ( APENAS LIGAÇÕES) +55 43 3032-2855 ( WHATSAPP - ATENDIMENTO ELETRÔNICO)",
    agency: "ARKBEDS",
  },
  {
    value: "Joao da Silva",
    label: "Joao da Silva",
    phone: "+55 45 3521-8585",
    agency: "ARKBEDS",
  },
  {
    value: "Maria Rojo",
    label: "Maria Rojo",
    phone: "+55 45 3521-8578",
    agency: "ARKBEDS",
  },
];

interface ItemListOption {
  value: string;
  title: string;
}

function ItemList({ title, value }: ItemListOption) {
  const { t } = useTranslation();
  return (
    <p style={{ margin: "5px" }}>
      {t(`${title}`)}: <span style={{ fontWeight: 400 }}>{value}</span>
    </p>
  );
}

function ContactArea() {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [selectedOptionContact, setSelectedOptionContact] =
    useState<Option | null>(null);

  const handleSelectContact = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected =
      optionsLogo.find((option) => option.value === selectedValue) || null;
    setSelectedOptionContact(selected);
  };

  if (showPreview && !selectedOptionContact) return <></>;

  return (
    <Box sx={{ maxWidth: "500px" }}>
      {!showPreview && (
        <FormControl>
          <FormLabel>{t("Selecione um contato")}</FormLabel>
          <Select
            placeholder={t("Nenhum contato selecionado")}
            width="300px"
            onChange={handleSelectContact}
            value={selectedOptionContact?.value || ""}
          >
            {optionsLogo.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedOptionContact && (
        <Box mt={4} style={{ fontWeight: 500 }}>
          <ItemList title="Agência" value={selectedOptionContact.agency} />
          <ItemList title="Operador" value={selectedOptionContact.value} />

          <ItemList title="Emergências" value={selectedOptionContact.phone} />
        </Box>
      )}
    </Box>
  );
}

export default ContactArea;
