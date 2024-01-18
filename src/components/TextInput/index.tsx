import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { usePreview } from "../../context/PreviewContext";

interface TextInputProps {
  title: string;
  placeholder: string;
  emptyText: string;
  divider?: boolean;
}

function TextInput({ title, placeholder, emptyText, divider }: TextInputProps) {
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
        <FormControl>
          <InputGroup size="md">
            <Input
              type="text"
              pr="4.5rem"
              sx={{ marginY: "5px" }}
              placeholder={t(`${placeholder}`)}
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
              isDisabled={isInputDisabled}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                mt="2"
                mr="2"
                size="sm"
                onClick={handleEnableInput}
              >
                {isInputDisabled ? "Exibir" : "Esconder"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
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
        <Box sx={{ opacity: isInputDisabled ? 0.3 : 1 }} mt={4}>
          {formState}
        </Box>
      )}
      {divider && <Divider sx={{ marginY: "30px" }} />}
    </Box>
  );
}

export default TextInput;
