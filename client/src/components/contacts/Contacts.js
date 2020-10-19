import React,{Fragment,useContext,useEffect} from 'react'
import ContactContext from '../../context/contactContext'
import ContactItem from './ContactItem'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
export const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts,filter,GetContact} = contactContext;

    useEffect(()=> {
        GetContact();
    },[])
    if(contacts !== null && contacts.length === 0){
        return <h4>Please add a contact.</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {
               filter !== null ? filter.map(contact => (
               <CSSTransition key={contact._id} timeout={500}  classNames='item'>
                    <ContactItem contact={contact} />
                </CSSTransition>
            )) :  contacts.map(contact => (
                <CSSTransition key={contact._id} timeout={500}  classNames='item'>
                    <ContactItem contact={contact} />
                </CSSTransition>
            ))
            }
             </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
