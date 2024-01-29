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
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TourIcon from "@mui/icons-material/Tour";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

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
  if (value === "Hotel") return <HotelIcon />;
  if (value === "Transfer") return <DirectionsCarIcon />;
  if (value === "Passeio") return <TourIcon />;
  if (value === "Ticket") return <ConfirmationNumberIcon />;
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
    <Box sx={{ maxWidth: "800px", width: "100%" }}>
      <Information />
      <FormControl>
        {!showPreview && (
          <>
            <FormLabel>{t("Serviço")}</FormLabel>
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
          </>
        )}
      </FormControl>

      {formData.type === "Hotel" && (
        <>
          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Tipo de quarto"
              placeholder="Preencha o tipo do quarto"
            />
          </FormControl>
          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Regime da hospedagem"
              placeholder="Preencha o regime da hospedagem"
            />
          </FormControl>

          <FormControl mt={10}>
            <TextInput
              isTextArea
              title="Detalhes da hospedagem"
              placeholder="Preencha os detalhes da hospedagem"
            />
          </FormControl>
        </>
      )}
      <Box sx={{ marginY: "30px" }} />
      <TextInput
        isTextArea
        title="Política de cancelamento"
        placeholder="Digite sua política de cancelamento"
      />
      <Box sx={{ marginY: "30px" }} />
      <TextInput
        isTextArea
        title="Observações"
        placeholder="Digite suas observações"
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {selectType && (
          <Box sx={{ fontSize: "20px" }}>{`${t(`${selectType}`)}`}</Box>
        )}
        {IconSelect(selectType)}
      </Stack>

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
                <Box sx={{ fontSize: "20px" }}>{`${t(`Quarto`)}`}</Box>
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
