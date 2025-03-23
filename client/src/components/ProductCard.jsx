import {  
    Text,
 
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Image,
    Stack,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    Input,
    ModalFooter,
    ModalHeader,
    FormControl,
     } from "@chakra-ui/react";
import {  useRef, useState } from "react";
import { useProductStore } from "../store/product.js";



const ProductCard = ({key, product}) => {
    const {  deleteProduct, updateProduct } = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
      const initialRef = useRef(null);
      const finalRef = useRef(null);
      
   
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdate =async (id,updatedProduct) => {
 updateProduct(id,updatedProduct)

onClose()
    }

    const handleDelete = (id) => {
        deleteProduct(id);
      };
  return (
    <div>
       <Box key={key}>
                    <Card maxW="sm">
                      <CardBody>
                        <Image
                          src={product.image}
                          alt={product.name}
                          borderRadius="lg"
                          maxH={"200px"}
                          overflow={"hidden"}
                        />
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{product.name}</Heading>
      
                          <Text color="blue.600" fontSize="2xl">
                            ${product.price}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button onClick={onOpen} variant="solid" colorScheme="blue">
                            EDIT
                          </Button>
                          <Button
                            onClick={() => handleDelete(product._id)}
                            variant="ghost"
                            colorScheme="blue"
                          >
                            DELETE
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  </Box>
                   <Modal
                          initialFocusRef={initialRef}
                          finalFocusRef={finalRef}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Update Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} value={updatedProduct.name} onChange={(e)=>setUpdatedProduct({...updatedProduct, name:e.target.value})}  />
                              </FormControl>
                  
                              <FormControl mt={4}>
                                <FormLabel>Image</FormLabel>
                                <Input value={updatedProduct.image}
                                onChange={(e)=>setUpdatedProduct({...updatedProduct, image:e.target.value})} />
                              </FormControl>
                  
                              <FormControl mt={4}>
                                <FormLabel>Price</FormLabel>
                                <Input value={updatedProduct.price} onChange={(e)=>setUpdatedProduct({...updatedProduct, price:e.target.value})} />
                              </FormControl>
                            </ModalBody>
                  
                            <ModalFooter>
                              <Button onClick={()=>handleUpdate(product._id,updatedProduct)} colorScheme="blue" mr={3}>
                                UPDATE
                              </Button>
                              <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
    </div>
  )
}

export default ProductCard
