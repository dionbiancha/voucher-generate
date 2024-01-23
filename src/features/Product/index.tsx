import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";
import TextInput from "../../components/TextInput";
import Information from "../Information";
import HotelIcon from "@mui/icons-material/Hotel";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FestivalIcon from "@mui/icons-material/Festival";

interface FormData {
  type: string;
  roomType: string;
  accommodationRegime: string;
  accommodationDetails: string;
  serviceType: string;
  serviceRegime: string;
  serviceDetails: string;
}

function IconSelect(value?: string) {
  if (!value) return <></>;
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>{value}</Box>
      {value === "Hotel" && <HotelIcon />}
      {value === "Transfer" && <TransferWithinAStationIcon />}
      {value === "Passeio" && <FestivalIcon />}
      {value === "Ticket" && <ConfirmationNumberIcon />}
    </Stack>
  );
}

function ProductItem() {
  const { t } = useTranslation();
  const { showPreview, setSelectType } = usePreview();
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
    setSelectType(event.target.value);
    setFormData({
      ...formData,
      type: event.target.value,
    });
  };

  return (
    <Box sx={{ maxWidth: "700px", width: "100%" }}>
      <Information />
      <FormControl>
        <FormLabel>{t("Serviço")}</FormLabel>
        {!showPreview && (
          <Select
            marginBottom={"10px"}
            placeholder={t("Selecione o serviço")}
            onChange={handleTypeChange}
            value={formData.type}
          >
            <option value="Hotel">{t("Hotel")}</option>
            <option value="Transfer">{t("Transfer")}</option>
            <option value="Passeio">{t("Passeio")}</option>
            <option value="Ticket">{t("Ticket")}</option>
          </Select>
        )}
        {IconSelect(formData.type)}
      </FormControl>

      {formData.type === "Hotel" && (
        <>
          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Tipo de quarto"
              placeholder="Preencha o tipo do quarto"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>
          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Regime da hospedagem"
              placeholder="Preencha o regime da hospedagem"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>

          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Detalhes da hospedagem"
              placeholder="Preencha os detalhes da hospedagem"
              emptyText="Nenhum dado encontrado"
            />
          </FormControl>
        </>
      )}
      <Box sx={{ marginY: "30px" }} />
      <TextInput
        isTextArea
        title="Política de cancelamento"
        placeholder="Digite sua política de cancelamento"
        emptyText="Nenhum dado encontrado"
      />
      <Box sx={{ marginY: "30px" }} />
      <TextInput
        isTextArea
        title="Observações"
        placeholder="Digite suas observações"
        emptyText="Nenhuma observação encontrada"
      />

      <Divider sx={{ marginY: "30px", border: "1px dashed #EDF2F7" }} />
    </Box>
  );
}

function Product() {
  const { t } = useTranslation();
  const toast = useToast();
  const { showPreview, selectType } = usePreview();

  const [additionalAreas, setAdditionalAreas] = useState<
    Record<string, unknown>[]
  >([]);

  const addAdditionalArea = () => {
    setAdditionalAreas((prevAreas) => [...prevAreas, {}]);
  };

  const removeAdditionalArea = (index: number) => {
    setAdditionalAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
    toast({
      title: "Quarto deletado com sucesso!",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",

        paddingLeft: "20px",
      }}
    >
      {!showPreview && selectType && (
        <Box sx={{ fontSize: "25px" }}>{`${t(`${selectType}`)} ${
          additionalAreas.length > 0 ? "1" : ""
        }`}</Box>
      )}

      <ProductItem />
      {additionalAreas.map((_, index) => (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"30px"}
          >
            {!showPreview && selectType && (
              <>
                <Box sx={{ fontSize: "20px" }}>{`${t(`${selectType}`)} ${
                  index + 2
                }`}</Box>
                <Button
                  onClick={() => removeAdditionalArea(index)}
                  colorScheme="red"
                >
                  {t("Excluir")}
                </Button>
              </>
            )}
          </Stack>
          <ProductItem />
        </>
      ))}

      {!showPreview && selectType === "Hotel" && (
        <Button
          mt="15px"
          width="100%"
          size={"lg"}
          onClick={addAdditionalArea}
          paddingY="25px"
          colorScheme="gray"
        >
          {t("Adicionar Quarto")}
        </Button>
      )}
    </Box>
  );
}

export default Product;
