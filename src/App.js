import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Heading } from '@chakra-ui/react';
import { VideosProvider } from './hooks/useVideos';
import Sidebar from './Sidebar';
import Create from './Create';
import Show from './Show';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <VideosProvider>
          <Box height="100vh" className="App">
            <Box as="header" className="App-header" boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px">
              <Heading m={0} p={2}>
                <Link to="/">Youtube Manager</Link>
              </Heading>
            </Box>
            <Flex height="100%" as="section" className="App-body">
              <Sidebar />
              <Box width="100%" height="100%" p={3} textAlign="center" as="section">
                <Switch>
                  <Route exact path="/">
                    <Link to="/create">新增影片</Link>
                  </Route>
                  <Route path="/create">
                    <Create />
                  </Route>
                  <Route path="/show/:id">
                    <Show />
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
