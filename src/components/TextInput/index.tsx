import { useState } from "react";
import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/DataContext";

interface TextInputProps {
  title: string;
  placeholder: string;
  emptyText: string;
  divider?: boolean;
  bold?: boolean;
  isTextArea?: boolean;
}

function TextInput({
  title,
  placeholder,
  emptyText,
  divider,
  bold,
  isTextArea,
}: TextInputProps) {
  const { showPreview } = usePreview();
  const { t } = useTranslation();
  const [formState, setFormState] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleEnableInput = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  if (showPreview && isInputDisabled) return <></>;

  return (
    <Box>
      <FormLabel sx={{ opacity: isInputDisabled ? 0.3 : 1 }}>
        {t(`${title}`)}
      </FormLabel>

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
              isDisabled={isInputDisabled}
            />
          ) : (
            <Input
              type="text"
              sx={{ marginY: "5px" }}
              placeholder={t(`${placeholder}`)}
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
              isDisabled={isInputDisabled}
            />
          )}

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              mt="2"
              mr="2"
              size="sm"
              onClick={handleEnableInput}
            >
              {isInputDisabled ? t("Exibir") : t("Esconder")}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}

      {!formState ? (
        isInputDisabled ? (
          <></>
        ) : (
          <Box
            sx={{
              marginTop: "20px",
              border: "1px dashed",
              width: "100%",
              padding: "5px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            {t(`${emptyText}`)}
          </Box>
        )
      ) : (
        <Box
          sx={{
            fontSize: bold ? "30px" : "",
            fontWeight: bold ? "600" : "",
            opacity: isInputDisabled ? 0.3 : 1,
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
