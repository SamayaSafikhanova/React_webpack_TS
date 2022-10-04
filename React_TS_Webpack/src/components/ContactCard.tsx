import * as React from "react"; 
import { IState as Props } from "./App";
import {EditContact} from './EditContact'
import { DeleteIcon } from '@chakra-ui/icons'
import { 
    ListItem, 
    OrderedList,
    Divider,
  } from '@chakra-ui/react' 

    interface IProps {
        text:string, 
        contacts:Props["contact"][],
        searchResults:Props["contact"][],
        deleteContact: (id: string) => Promise<void>, 
        updateContact: (contact: Props["contact"]) => Promise<void>
    }

export const ContactCard:React.FC<IProps> = ({contacts, deleteContact,searchResults, text, updateContact}) => {

   const renderList=():JSX.Element[]=>{
     return (text.length < 1 ? contacts : searchResults).map((contact)=>{ 
        return(
        <ListItem key={contact.email}>
            <div  style={{float:'left'}}> {contact.name}<br/>{contact.email} </div>
            <div style={{float:'right'}}>
            <EditContact contact={contact} updateContact={updateContact}/>
            <button onClick={()=>{deleteContact(contact.id)}}><DeleteIcon ml={3}/></button>
            </div>
            <div style={{clear:'both'}}></div>
            <Divider mt={2} mb={2} orientation='horizontal' />
        </ListItem>
        )
      })
   }

    return (
      <> 
      <OrderedList textAlign={'left'}> 
        {renderList()}
       </OrderedList>
      </>
    )
};