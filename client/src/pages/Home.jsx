import {
  Container,
  SimpleGrid,
  Text,
  VStack,
 
} from "@chakra-ui/react";

import ProductCard from "../components/ProductCard.jsx";
import { useProductStore } from "../store/product.js";
import { useEffect } from "react";

const Home = () => {
  
 const { fetchProducts, products} = useProductStore();


    useEffect(() => {
         fetchProducts();
       }, [fetchProducts]);
       

 
  return (
    <Container maxW={"container.lg"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} textAlign={"center"}>
          Current Products
        </Text>
        {products.length < 0 && (
          <Text fontSize={"30"} textAlign={"center"}>
            No Products Found!
          </Text>
        )}
        <SimpleGrid columns={[1, 3]} spacing="40px">
          {products.map((product) => (
           <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
      </VStack>

    
    </Container>
  );
};

export default Home;
