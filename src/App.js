import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Heading } from '@chakra-ui/react';
import Create from './Create';

function App() {
  return (
    <Router>
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
              <Switch>
                <Route exact path="/">
                  This is home page body
                </Route>
                <Route path="/create">
                  <Create />
                </Route>
              </Switch>
            </Box>
          </Flex>
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;
