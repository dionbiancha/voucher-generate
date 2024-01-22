// ImageModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Image,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const { t } = useTranslation();
  const images = [
    "wallpapers/beach.jpg",
    "wallpapers/airport-background-5rv69xn920q4o28a.jpg",
    "wallpapers/airport-background-tr1yd8pky3jlr7xo.jpg",
    "wallpapers/airport-pictures-z5gy9bl8if1a6rw5.jpg",
    "wallpapers/colorful-disney-world-jwfi996c4sw2y0a5.jpg",
    "wallpapers/disney-world.jpg",
    "wallpapers/island-hopping-beach-vacation-rymqaql7w1jiwz81.jpg",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("Selecione uma imagem de fundo")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={3} spacing={4}>
            {images.map((imageUrl, index) => (
              <Button
                sx={{ width: "150px", height: "120px" }}
                key={index}
                onClick={() => onSelectImage(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt={`Imagem ${index + 1}`}
                  objectFit="cover"
                  sx={{ width: "150px", height: "100px" }}
                />
              </Button>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
