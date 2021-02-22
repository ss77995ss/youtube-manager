import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Heading, HStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { VideosProvider } from './hooks/useVideos';
import { YoutubeProvider } from './hooks/useYouTube';
import Sidebar from './components/Sidebar';
import Create from './components/Create';
import Show from './components/Show';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Router>
      <ChakraProvider>
        <VideosProvider>
          <Box height="100vh" className="App">
            <HStack as="header" className="App-header" boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px">
              <HamburgerIcon ml={4} cursor="pointer" onClick={onOpen} display={{ base: 'block', xl: 'none' }} />
              <Heading m={0} p={2}>
                <Link to="/">YOUTUBE MANAGER</Link>
              </Heading>
            </HStack>
            <Flex height="100%" as="section" className="App-body">
              <Sidebar isOpen={isOpen} onClose={onClose} />
              <Box width="100%" height="100%" overflow="auto" p={3} textAlign="center" as="section">
                <Switch>
                  <Route exact path="/">
                    <Link to="/create">新增影片</Link>
                  </Route>
                  <Route path="/create">
                    <YoutubeProvider>
                      <Create />
                    </YoutubeProvider>
                  </Route>
                  <Route path="/show/:id">
                    <YoutubeProvider>
                      <Show />
                    </YoutubeProvider>
                  </Route>
                </Switch>
              </Box>
            </Flex>
          </Box>
        </VideosProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
