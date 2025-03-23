import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Box>
  );
};

export default App;
