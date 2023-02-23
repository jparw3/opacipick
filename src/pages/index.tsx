import useKeyboard, { KeyCode, KeyMod } from "@/libs/use-keyboard";
import { VscDebugRestart } from "react-icons/vsc";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Kbd,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import clipboard from "clipboardy";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { DebounceInput } from "react-debounce-input";
import { toast } from "react-hot-toast";

export default function Home() {
  const randomColor = require("randomcolor");
  const closestColor = require("closest-css-color");

  const [color, setColor] = useState("#fff");

  const [sliderValue, setSliderValue] = useState(50);
  const [showColourName, setShowColourName] = useState(false);
  const [showRandomColourButton, setShowRandomColourButton] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: shortCutsIsOpen,
    onOpen: shortCutsOnOpen,
    onClose: shortCutsOnClose,
  } = useDisclosure();

  const {
    isOpen: onBoardingsIsOpen,
    onOpen: onBoardingOnOpen,
    onClose: onBoardingOnClose,
  } = useDisclosure();

  if (color.length <= 1) {
    setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    setSliderValue(50);
  }

  const getOppositeColor = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff";
  };

  const oppositeColor = getOppositeColor(color);

  const handleClick = () => {
    clipboard.write(newColor);
    const generatedColors = JSON.parse(
      localStorage.getItem("generatedColors") || "[]"
    );
    generatedColors.push(newColor);
    localStorage.setItem("generatedColors", JSON.stringify(generatedColors));
    toast(`Copied ${newColor} to clipboard!`, {
      icon: "📋",
    });
  };

  const handleGetStarted = () => {
    onBoardingOnClose();
    localStorage.setItem("showOnboarding", "false");
  };

  const handleShowColourName = () => {
    setShowColourName(!showColourName);
    localStorage.setItem("showColourName", showColourName ? "false" : "true");
  };

  const handleShowRandomColourButton = () => {
    setShowRandomColourButton(!showRandomColourButton);
    localStorage.setItem(
      "showRandomColourButton",
      showRandomColourButton ? "false" : "true"
    );
  };

  const newColor =
    color +
    Math.round(sliderValue * 2.55)
      .toString(16)
      .padStart(2, "0");

  useEffect(() => {
    setColor(randomColor());
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("showOnboarding")) {
        onBoardingOnOpen();
        localStorage.setItem("showOnboarding", "true");
      }

      if (!localStorage.getItem("showColourName")) {
        localStorage.setItem("showColourName", "false");
      }

      if (!localStorage.getItem("showRandomColourButton")) {
        localStorage.setItem("showRandomColourButton", "true");
      }

      if (localStorage.getItem("showOnboarding") === "true") {
        onBoardingOnOpen();
      }

      if (localStorage.getItem("showColourName") === "true") {
        setShowColourName(true);
      }

      if (localStorage.getItem("showRandomColourButton") === "true") {
        setShowRandomColourButton(true);
      }
    }
  }, []);

  useKeyboard(() => shortCutsOnOpen(), [KeyCode.KEY_S, KeyMod.Shift]);
  useKeyboard(() => handleClick(), [KeyCode.KEY_C, KeyMod.Shift]);

  useKeyboard(() => onBoardingOnOpen(), [KeyCode.KEY_O, KeyMod.Shift]);
  useKeyboard(() => onOpen(), [KeyCode.KEY_P, KeyMod.Shift]);
  useKeyboard(() => setColor(randomColor()), [KeyCode.KEY_R, KeyMod.Shift]);

  useKeyboard(() => setSliderValue(10), [KeyCode.KEY_1, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(20), [KeyCode.KEY_2, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(30), [KeyCode.KEY_3, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(40), [KeyCode.KEY_4, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(50), [KeyCode.KEY_5, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(60), [KeyCode.KEY_6, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(70), [KeyCode.KEY_7, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(80), [KeyCode.KEY_8, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(90), [KeyCode.KEY_9, KeyMod.Shift]);
  useKeyboard(() => setSliderValue(100), [KeyCode.KEY_0, KeyMod.Shift]);

  return (
    <>
      <NextSeo
        title="Opacipick"
        description="Hexadecimal color picker for transparency"
      />

      <Modal isCentered isOpen={onBoardingsIsOpen} onClose={onBoardingOnClose}>
        <ModalOverlay backdropFilter="blur(10px)" bg="none" />
        <ModalContent bg="#FCFCFF">
          <ModalHeader>How to use Opacipick</ModalHeader>
          <ModalBody>
            <Center>
              <Image alt="onboarding" maxW="300" src="/onboarding_gif.gif" />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleGetStarted} variant="ghost">
              Get Started
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={shortCutsIsOpen} onClose={shortCutsOnClose}>
        <ModalOverlay backdropFilter="blur(10px)" bg="none" />
        <ModalContent>
          <ModalHeader>Shortcuts</ModalHeader>
          <ModalBody>
            <Kbd>shift</Kbd> + <Kbd>C</Kbd> - Copy to clipboard
            <br />
            <Kbd>shift</Kbd> + <Kbd>S</Kbd> - Show this modal
            <br />
            <Kbd>shift</Kbd> + <Kbd>O</Kbd> - Show onboarding
            <br />
            <Kbd>shift</Kbd> + <Kbd>P</Kbd> - Toggle Colour Picker
            <br />
            <Kbd>shift</Kbd> + <Kbd>R</Kbd> - Set Random Colour
            <br />
            <Text mt="4">
              Set opacity by pressing <Kbd>shift</Kbd> + <Kbd>0</Kbd> -
              <Kbd>9</Kbd>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={shortCutsOnClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" bg="none" />
        <ModalContent
          w="fit-content"
          bg="transparent"
          justifyContent="center"
          alignItems="center"
          display="flex"
          shadow="none"
        >
          <VStack spacing={"6"}>
            <HexColorPicker color={color} onChange={setColor} />
            <Box bg={color} w="full" borderRadius="6" p="2">
              <DebounceInput
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  color: oppositeColor,
                }}
                debounceTimeout={500}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Box>
          </VStack>
        </ModalContent>
      </Modal>

      <HStack
        as="main"
        justifyContent="space-between"
        pos="absolute"
        w="full"
        top={0}
        p={5}
        color="#212121"
      >
        <Heading fontSize="2xl">Opacipick.</Heading>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="Settings"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <FormControl
                w="full"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormLabel htmlFor="email-alerts" mb="0">
                  Colour name
                </FormLabel>
                <Switch
                  sx={{
                    "span.chakra-switch__track": {
                      backgroundColor: color,
                    },
                  }}
                  isChecked={showColourName}
                  onChange={handleShowColourName}
                  id="email-alerts"
                />
              </FormControl>
            </MenuItem>
            <MenuItem>
              <FormControl
                w="full"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormLabel htmlFor="email-alerts" mb="0">
                  Random Colour Button
                </FormLabel>
                <Switch
                  sx={{
                    "span.chakra-switch__track": {
                      backgroundColor: color,
                    },
                  }}
                  isChecked={showRandomColourButton}
                  onChange={handleShowRandomColourButton}
                  id="email-alerts"
                />
              </FormControl>
            </MenuItem>
            <MenuItem onClick={shortCutsOnOpen} command="⇧S">
              Shortcuts
            </MenuItem>
            <MenuItem command="⇧O" onClick={onBoardingOnOpen}>
              Show onboarding
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Box minH="100vh" p="5" as="main">
        <Center minH="100vh">
          <VStack
            spacing={0}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
          >
            {showRandomColourButton && (
              <Tooltip label="Generate new colour" placement="top">
                <IconButton
                  pos="absolute"
                  top={0.5}
                  right={0.5}
                  onClick={() => {
                    setColor(randomColor());
                  }}
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  color={oppositeColor}
                  justifyContent="center"
                  _hover={{ bg: "#0000001a" }}
                  aria-label="random colour"
                  icon={<VscDebugRestart />}
                />
              </Tooltip>
            )}
            <Center
              cursor="pointer"
              height={"52"}
              onClick={onOpen}
              width={"52"}
              bg={color}
            >
              {showColourName && (
                <Text color={oppositeColor}>{closestColor(color)}</Text>
              )}
            </Center>
            <Center height={"32"} width={"52"} bg="white">
              <VStack w="full">
                <HStack w="75%" justifyContent="space-between">
                  <Text cursor="default">{sliderValue}%</Text>
                  <Tooltip label="Copy colour to clipboard">
                    <Button onClick={handleClick} variant="ghost">
                      {newColor}
                    </Button>
                  </Tooltip>
                </HStack>
                <Slider
                  value={sliderValue}
                  onChange={(val) => setSliderValue(val)}
                  aria-label="slider-ex-1"
                  defaultValue={50}
                  width="75%"
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={color} />
                  </SliderTrack>
                  <SliderThumb bg={color} />
                </Slider>
              </VStack>
            </Center>
          </VStack>
        </Center>
      </Box>
    </>
  );
}
