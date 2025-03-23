import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore();

  const addProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({name:"", image:"", price:""})
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading size={["xl", "2xl"]}>Create New Product</Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Button
              disabled={
                !newProduct.name || !newProduct.image || !newProduct.price
              }
              onClick={addProduct}
              w={"full"}
              colorScheme="teal"
            >
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Create;
