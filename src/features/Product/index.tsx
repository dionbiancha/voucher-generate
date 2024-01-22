import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";
import TextInput from "../../components/TextInput";
import Information from "../Information";
import HotelIcon from "@mui/icons-material/Hotel";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import RoomServiceIcon from "@mui/icons-material/RoomService";
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
      {value === "Serviço" && <RoomServiceIcon />}
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
    <Box>
      <Information />
      <FormControl>
        <FormLabel>{t("Tipo")}</FormLabel>
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
            <option value="Serviço">{t("Serviço")}</option>
          </Select>
        )}
        {IconSelect(formData.type)}
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
              title="Título"
              placeholder="Preencha seu titulo"
              emptyText="Nenhum titulo encontrado"
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
      <TextInput
        title="Política de cancelamento"
        placeholder="Digite sua política de cancelamento"
        emptyText="Nenhum dado encontrado"
        divider
      />

      <TextInput
        title="Observações"
        placeholder="Digite suas observações"
        emptyText="Nenhuma observação encontrada"
      />

      <Divider sx={{ marginY: "30px" }} />
    </Box>
  );
}

function Product() {
  const { t } = useTranslation();
  const { showPreview } = usePreview();
  const [additionalAreas, setAdditionalAreas] = useState<
    Record<string, unknown>[]
  >([]);

  const addAdditionalArea = () => {
    setAdditionalAreas((prevAreas) => [...prevAreas, {}]);
  };

  const removeAdditionalArea = (index: number) => {
    setAdditionalAreas((prevAreas) => prevAreas.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: "20px",
      }}
    >
      <Box sx={{ fontSize: "30px" }}>{`${t("Produto")} 1`}</Box>
      <ProductItem />
      {additionalAreas.map((_, index) => (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"30px"}
          >
            <Box sx={{ fontSize: "30px" }}>{`${t("Produto")} ${
              index + 2
            }`}</Box>
            {!showPreview && (
              <Button
                onClick={() => removeAdditionalArea(index)}
                colorScheme="red"
              >
                Excluir
              </Button>
            )}
          </Stack>
          <ProductItem />
        </>
      ))}

      {!showPreview && (
        <Button
          mt="15px"
          width="100%"
          size={"lg"}
          onClick={addAdditionalArea}
          paddingY="25px"
          colorScheme="gray"
        >
          {t("Adicionar produto")}
        </Button>
      )}
    </Box>
  );
}

export default Product;
