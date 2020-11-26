import { ChakraProvider, Box, Flex, Heading } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Box height="100vh" className="App">
        <Box as="header" className="App-header" boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px">
          <Heading m={0} p={2}>
            Youtube Manager
          </Heading>
        </Box>
        <Flex height="100%" as="section" className="App-body">
          <Box width={280} height="100%" borderRight="1px solid #ccc" p={3} as="aside">
            This is sidebar
          </Box>
          <Box width="100%" height="100%" p={3} textAlign="center" as="section">
            This is body
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
