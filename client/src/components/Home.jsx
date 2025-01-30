import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  Spinner,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Image,
  Link,
  useToast,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spacer,
} from "@chakra-ui/react";
import { GoTrash } from "react-icons/go";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import Prompt from "./Prompt";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/jarvis-gemini.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/base.url";
import { GeminiContext } from "../context/ResponseContext";
import ReactMarkdown from "react-markdown";

const SidebarContent = ({ onClose, ...rest }) => {
  const toast = useToast();
  const { user, token } = useContext(AuthContext);
  const { output } = useContext(GeminiContext);
  const [questions, setQuestions] = useState([]);
  const [qloading, setQloading] = useState(false);

  const fetchdata = async () => {
    try {
      setQloading(true);
      const res = await axios.get(`${BASE_URL}/prompt/${user.id}`, {
        headers: { Authorization: token },
      });
      if (res.status == 200) {
        setQloading(false);
        setQuestions((prev) => res.data);
      }
    } catch (error) {
      setQloading(false);
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchdata();
  }, [output]);

  return (
    <Box
      position={"relative"}
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <Image borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color={"blue.400"}
          >
            Jarvis
          </Text>
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        height={["100vh", "75vh", "74vh"]}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "1px",
          },
        }}
      >
        {qloading && (
          <Flex justifyContent={"center"} mt={100}>
            <Spinner />
          </Flex>
        )}
        {!qloading &&
          questions?.reverse().map((el) => (
            <NavItem key={el._id} m="1" border="1px solid">
              <FaQuestionCircle />
              &nbsp;
              <BasicUsage props={el} fetchdata={fetchdata} />
            </NavItem>
          ))}
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        left={[140, 170, 30]}
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        zIndex={999}
      >
        <Text fontSize="sm" p={2} textAlign={"center"}>
          Designed & Developed by
          <br />
          <Link
            color={"blue.400"}
            isExternal
            href="https://www.linkedin.com/in/anirban-sharma1996/"
          >
            Anirban Sharma &copy; 2024
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: "blue.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { user, handleLogOut } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display={{ base: "flex", md: "none" }} gap={2}>
        <Image borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={"blue.400"}
        >
          Jarvis
        </Text>
      </Box>

      <HStack spacing={{ base: "2", md: "6" }}>
        <Button onClick={toggleColorMode} bg={"transparent"}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user?.picture} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Prompt />
      </Box>
    </Box>
  );
};

export default Home;

export function BasicUsage({ props, fetchdata }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token } = useContext(AuthContext);
  const { isLoading } = useContext(GeminiContext);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/prompt/${id}`, {
        headers: { Authorization: token },
      });

      if (res.status == 200) {
        toast({
          title: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        fetchdata();
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" w={"full"}>
        <Text fontSize={["xs", "sm", "xs"]} onClick={onOpen}>
          {props.question.slice(0, 25) + "..."}
        </Text>
        <Button
          fontSize={["", "", "10px"]}
          onClick={() => handleDelete(props._id)}
          isDisabled={isLoading}
        >
          <GoTrash />
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xs" fontWeight={700}>
            Q :&nbsp;{props.question}
          </ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody
            fontSize="xs"
            overflow={"auto"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "2px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1" 
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888"
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555" 
              },
            }}
          >
            <ReactMarkdown>{`ANS : ${props.answer}`}</ReactMarkdown>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
