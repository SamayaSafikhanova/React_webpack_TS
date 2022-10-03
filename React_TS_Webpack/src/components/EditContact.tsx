import * as React from "react"; 
 import { useState } from "react";
import { EditIcon  } from '@chakra-ui/icons'
import { IState as Props } from "./App";
import {
    Input,
    useDisclosure, 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
 
interface IProps {
    contact:Props["contact"],
    updateContact: (contact: Props["contact"]) => Promise<void>
}
  export const EditContact:React.FC<IProps>= ({contact, updateContact}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
   const{id, name, email}=contact
   const [newEmail, setNewEmail] = useState<string>(email);
   const [newName, setNewName] = useState<string>(name);
   const update = ():void=> {
    if (newName === "" || newEmail === "") {
        alert("ALl the fields are mandatory!");
        return;
      }
     
    updateContact({id, name: newName, email : newEmail});
   

  };

    return (
      <>
        <button onClick={onOpen}><EditIcon/></button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
                <div>
                    <label>Name</label>
                <Input
                 type="text"
                 name="name"
                 placeholder="Name"
                 value={newName}
                 onChange={(e) => setNewName(e.target.value)}
                />
                </div>
                <div>
                <label>Email</label>
                <Input
                   type="text"
                   name="email"
                   placeholder="Email"
                   value={newEmail}
                   onChange={(e) => setNewEmail(e.target.value)}
                />
                </div>
            
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{update(); onClose()}}>
                Edit
              </Button>
              <Button   colorScheme='red' onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
};