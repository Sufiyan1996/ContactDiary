import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contactContext'


export const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext); 
    const {_id,name,email,phone,type} = contact;
    const {onDelete,CurrenContact,ClearContact} = contactContext
 

    const ondelete = () => {
        onDelete(_id);
        ClearContact();
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{''}
                <span style={{float:"right"}} 
                className={
                    'badge ' + 
                    (type === 'professional'
                     ? 'badge-success' 
                     : 'badge-primary'
                    )}>{
                    type
                    }</span>
            </h3>
            <ul>
                    {email && (
                        <li>
                            <i  className='fas fa-envelope-open'></i> {email}
                        </li>
                    )}
                    {phone && (
                        <li>
                            <i  className='fas fa-phone'></i> {phone}
                        </li>
                    )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => CurrenContact(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={ondelete}>Delete</button>
            </p>
        </div>
    )
}
ContactItem.propTypes = {
    contact:PropTypes.object.isRequired,
}
export default ContactItem
