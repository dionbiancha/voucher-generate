import { useState } from "react";
import { Box, FormLabel, Input, InputGroup, Divider } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

interface TextInputProps {
  title: string;
  placeholder: string;
  divider?: boolean;
  bold?: boolean;
  isTextArea?: boolean;
}

function TextInput({
  title,
  placeholder,
  divider,
  bold,
  isTextArea,
}: TextInputProps) {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState("");

  if (showPreview && !formState) return <></>;
  return (
    <Box>
      <FormLabel>{t(`${title}`)}</FormLabel>

      {!showPreview && (
        <InputGroup>
          {isTextArea ? (
            <Input
              as="textarea"
              resize="vertical"
              sx={{ marginY: "5px" }}
              placeholder={t(`${placeholder}`)}
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
            />
          ) : (
            <Input
              type="text"
              sx={{ marginY: "5px" }}
              placeholder={t(`${placeholder}`)}
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
            />
          )}
        </InputGroup>
      )}

      {showPreview && (
        <Box
          sx={{
            fontSize: bold ? "30px" : "",
            fontWeight: bold ? "600" : "",
            width: "100%",
          }}
        >
          {formState}
        </Box>
      )}

      {divider && <Divider sx={{ marginY: "30px" }} />}
    </Box>
  );
}

export default TextInput;
