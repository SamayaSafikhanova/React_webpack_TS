import * as React from "react"; 
import { useState } from "react";
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
    contacts:Props["contact"][],
    setContacts: React.Dispatch<React.SetStateAction<Props["contact"][]>>
    addContact: (contact: Props["contact"]) => Promise<void>
}
  export const AddContact:React.FC<IProps> = ({contacts, setContacts, addContact}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput]=useState({ 
        'name':'',
        'email':''
    })

    const onChange=(e: React.ChangeEvent<HTMLInputElement>):void=>{
       setInput({
        ...input,
        [e.target.name]:e.target.value
       }) 
    }

    const onAdd=()=>{

        if(!input.name||!input.name){
            return
        } 
        addContact({...input})
        setInput({
            name:'',
            email:''
        }
        )
      
    } 
    return (
      <>
        <Button colorScheme='green' onClick={onOpen}>Add Contact</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
                <div>
                    <label>Name</label>
                <Input
                 onChange={onChange}
                 name='name'
                 value={input.name}
                 />
                </div>
                <div>
                <label>Email</label>
                <Input 
                  onChange={onChange}
                  name='email'
                  value={input.email}
                />
                </div>
            
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{onAdd(); onClose()}}>
                Add
              </Button>
              <Button   colorScheme='red' onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
};