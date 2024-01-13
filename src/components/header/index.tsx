import React, { useEffect } from "react";
import { Button, Select, Stack, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  function isLight() {
    return colorMode === "light";
  }

  return (
    <Stack width="100%" direction={["row", "row"]} justifyContent={"end"}>
      <Select width="100px">
        <option value="option1">PT</option>
        <option value="option2">EN</option>
        <option value="option3">ES</option>
      </Select>
      <Button onClick={toggleColorMode}>
        {isLight() ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Stack>
  );
}

export default Header;
