import * as React from "react";
import { App } from "./App";
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; 
const container =   document.getElementById("output")
const root = createRoot(container);
root.render( 
    <ChakraProvider>
         <App />
    </ChakraProvider>
);