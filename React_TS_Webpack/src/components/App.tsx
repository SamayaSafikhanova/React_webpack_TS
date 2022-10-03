import * as React from "react";
import { useState,useEffect } from "react";
import {AddContact} from './AddContact';
import {ContactCard} from './ContactCard'
import { Box ,Input } from "@chakra-ui/react" 
 
export interface IState{
  contacts:{
  id?:string;
  name:string,
  email:string
}[],
  contact:{
  id?:string;
  name:string,
  email:string
}
}
 
export const App = () => { 
 
const [contacts, setContacts]=useState<IState["contacts"]>([]);
const [text, setText] = useState<string>("");
const [searchResults, setSearchResults] = useState<IState["contacts"]>(contacts);

useEffect(() => {
  const getContacts = async () => {
    const contactsFromServer = await fetchContacts()
    setContacts(contactsFromServer)
  } 
  getContacts()
}, [])

// Fetch Contacts
const fetchContacts = async () => {
  const res = await fetch('http://localhost:3000/contacts')
  const data = await res.json()
  return data
}

// Add Contacts
const addContact = async (contact:IState["contact"]) => {
  const res = await fetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(contact),
  })
  const data = await res.json()
  setContacts([...contacts, data])
}

 // Delete Contact
 const deleteContact = async (id:string) => {
  const res = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: 'DELETE',
  }) 
  res.status === 200
    ? setContacts(contacts.filter((contact) => contact.id!== id))
    : alert('Error Deleting This Contact')
}


const updateContact = async (contact:IState["contact"] ) => { 
  const res:any = await fetch(`http://localhost:3000/contacts/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  const data = await res.json() 
  const { id } = data; 
  setContacts(
    contacts.map((contact) => {
      return contact.id === id ? { ...data } : contact;
    })
  );
};

// Search contact
const searchHandler = (searchTerm:string) => { 
  setText(searchTerm);
  if (searchTerm !== "") {
    const newContactList = contacts.filter((contact) => {
   
      return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setSearchResults(newContactList);
  }else {
    setSearchResults(contacts);
  }
};

  return (
    <> 
    <Box  className='box' textAlign={'center'} maxWidth='500px' mt={10} mr={'auto'} ml={'auto'} p={5} borderWidth='1px' borderRadius='lg' overflow='hidden'>
  
      <AddContact contacts={contacts} setContacts={setContacts} addContact={addContact}/>
      <Input onChange={(e)=>{searchHandler(e.target.value);}} mt={5} mb={5} placeholder='Axtar' />
      <ContactCard  text={text} searchResults={searchResults} contacts={contacts} deleteContact={deleteContact} updateContact={updateContact}/>
      </Box>
    </>
  )
};

 

 