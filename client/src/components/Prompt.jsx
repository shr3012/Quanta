import React, { useContext, Suspense } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { VscRunAbove } from "react-icons/vsc";
import Output from "./Output";
import { GeminiContext } from "../context/ResponseContext";

const Prompt = () => {
  const { handleOutput, handleQuery, isLoading, query } =
    useContext(GeminiContext);

  return (
    <Box position="relative">
      <FormControl
        position="fixed"
        bottom="2"
        bg="gray.50"
        zIndex={999}
        w={["93%", "94%", "79%"]}
      >
        <InputGroup size={"md"} bg={useColorModeValue("white", "gray.700")}>
          <Textarea
            required
            placeholder="enter your question"
            name="query"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            readOnly={isLoading}
            size='sm'
            w={["87%",'90%','95%']}
            rows={{md:4 ,lg:4 }}
          />
          <InputRightElement width="3rem" >
            <Button
              bg="gray.500"
              color="white"
              size="md"
              _hover={{
                bg: "blue.400",
                color: "white",
              }}
              isLoading={isLoading}
              onClick={() => handleOutput(query)}
               mt={4}
               h={'55px'}
            >
              <VscRunAbove />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Suspense fallback={<div></div>}>
        <Output />
      </Suspense>
    </Box>
  );
};

export default Prompt;
