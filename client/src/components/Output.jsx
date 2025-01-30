import { Box, Flex, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import { GeminiContext } from "../context/ResponseContext";
import { AuthContext } from "../context/AuthContext";
import { Text, Image } from "@chakra-ui/react";
import logo from "../assets/jarvis-gemini.jpg";
import ReactMarkdown from "react-markdown";

const Output = () => {
  const { isLoading, error, output } = useContext(GeminiContext);
  const { user } = useContext(AuthContext);
  const removeMarkdown = (text) =>
    text?.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, "$1");
  const plainText = removeMarkdown(output?.answer);

  return (
    <Box m="auto" mt="1rem" w={["99%","97%","95%"]}>
      {error && (
        <Text color="red" fontSize="md">
          {error}
        </Text>
      )}
      {isLoading && (
        <Stack position={"relative"}>
           <Flex justifyContent={"center"} mt={150}>
            <Spinner />
            &nbsp;
            <Text>Thinking...</Text>
          </Flex>
        </Stack>
      )}
      {output && (
        <Box>
          {output?.question && (
            <Stack py={1} borderRadius={10} direction="row" spacing={4}>
              <Image
                borderRadius="full"
                boxSize="30px"
                src={user?.picture}
                alt={user?.name}
              />
              <Text fontSize={["sm",'md','lg']} as="b"  >
                {output?.question}
              </Text>
            </Stack>
          )}
          <Stack direction="row" mt="1rem" spacing={4}>
            <Image display={['none','block','block']} borderRadius="full" boxSize="40px" src={logo} alt="jarvis" />
            <Box
              h={["72vh",'58vh','59vh']}
              overflow="auto"
              w={"full"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "1px",
                },
              }}
              bg={useColorModeValue("white", "gray.800")}
              px={6}
              py={3}
              fontSize={["xs",'md','md']}
              ml={[0,-3,-3]}
            >
              <ReactMarkdown>{plainText}</ReactMarkdown>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Output;
