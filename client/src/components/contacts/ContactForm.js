import React,{useContext, useState,useEffect} from 'react' 
import ContactContext from '../../context/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const [contact,setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type : 'personal'
    });

    const {AddContact,current,UpdateContact,ClearContact} = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current)
        }
        else{
            setContact({
            name:'',
            email:'',
            phone:'',
            type : 'personal'
            })
        }
    },[current])
    
    const {name,email,phone,type} = contact;

    const onSubmit = (e) =>{
        e.preventDefault();
        if(current ===  null){
            AddContact(contact); 
              setContact({name:'',email:'',phone:'',type:'personal'})
        }
        else{
            UpdateContact(contact);
        }
    }

    const onChange = (e) => {
        setContact({...contact,[e.target.name] : e.target.value})
    }

    const clearAll = () => { 
        ClearContact({name:'',email:'',phone:'',type:'personal'});
    }
    return (
    <div>
            <form action='post' onSubmit={onSubmit}>
    <h1>{current===null?'Add Contacts':'Edit Contacts'}</h1>
            <input type='text' name='name' value={name} placeholder='Name' onChange={onChange} />
            <input type='text' name='email' value={email} placeholder='Email' onChange={onChange} />
            <input type='text' name='phone' value={phone} placeholder='Phone' onChange={onChange} /> 
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='professional' checked={type==='professional'}
             onChange={onChange}/> professional {' '}
            <input type='radio' name='type' value='personal' checked={type==='personal'}
             onChange={onChange}/> personal 
                <input className='btn btn-dark btn-block' type='submit' 
                value={current===null?'Add Contacts':'Edit Contacts'} /> 
                {current !== null && (
                    <div>
                         <input className='btn btn-light btn-block' type='button' 
                            value='Clear' onClick={clearAll} /> 
                    </div>
                )}
        </form>
    </div>
    )
}
 

export default ContactForm
