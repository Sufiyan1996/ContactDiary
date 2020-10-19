import React,{useRef,useContext} from 'react' 
import ContactContext from '../../context/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {FilterContacts,ClearFilterContacts} = contactContext;
    const onChange = (e) => {
        if(text.current.value !== ''){
            FilterContacts(e.target.value)
        }
        else{
            ClearFilterContacts();
        }
    }

    return (
        <div>
            <form>
                <input type='text' ref={text} placeholder='Enter a text to Search....' onChange={onChange}/>
            </form>
        </div>
    )
}
 
export default ContactFilter
