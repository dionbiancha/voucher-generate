import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  VStack,
  Text,
  Stack,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";
import { DeleteIcon } from "@chakra-ui/icons";

interface Person {
  name: string;
  ageGroup: "adult" | "child";
}

const Information: React.FC = () => {
  const { t } = useTranslation();
  const { showPreview } = usePreview();
  const [name, setName] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<"adult" | "child">("adult");
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  const handleAddPerson = () => {
    if (name.trim() === "") {
      // Verifique se o nome não está vazio
      return;
    }

    const newPerson: Person = { name, ageGroup };
    setPeopleList([...peopleList, newPerson]);

    // Limpar o formulário
    setName("");
    setAgeGroup("adult");
  };

  const handleDeletePerson = (index: number) => {
    const updatedPeopleList = [...peopleList];
    updatedPeopleList.splice(index, 1);
    setPeopleList(updatedPeopleList);
  };

  return (
    <Stack direction={"column"}>
      <FormLabel sx={{ marginTop: "10px" }}>{t("Informações")}</FormLabel>
      {!showPreview && (
        <Stack direction={"row"}>
          <Input
            placeholder={t("Nome completo")}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select
            width="200px"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as "adult" | "child")}
          >
            <option value="adult">Adulto</option>
            <option value="child">Criança</option>
          </Select>

          <Button width="330px" onClick={handleAddPerson}>
            Adicionar Pessoa
          </Button>
        </Stack>
      )}

      {peopleList.length > 0 && (
        <Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginY={"10px"}
          >
            <Text fontWeight="500">{t("Passageiros")}</Text>
            <Text fontWeight="500">
              {t("Adultos")}:{" "}
              {peopleList.filter((p) => p.ageGroup === "adult").length}
            </Text>
            <Text fontWeight="500">
              {t("CHD")}:{" "}
              {peopleList.filter((p) => p.ageGroup === "child").length}
            </Text>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <VStack align="start" spacing={2} width="100%">
              {peopleList.map((person, index) => (
                <Stack
                  key={index}
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Text>{`${person.name}`}</Text>
                  {!showPreview && (
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => handleDeletePerson(index)}
                    />
                  )}
                </Stack>
              ))}
            </VStack>
          </Stack>
        </Box>
      )}
      <Divider sx={{ marginY: "30px" }} />
    </Stack>
  );
};

export default Information;
