import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContacts } from '../contexts/ContactsContext';

export default function IndividualContact({ contact, index }) {
    const navigate = useNavigate();
    const { deleteContact, setEditingContact } = useContacts();

    const handleEdit = () => {
        setEditingContact(contact);
        navigate('/create');
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            await deleteContact(contact.id);
        }
    };

    return (
        <tr>
            <td>{index}</td>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td width="150">
                <Link
                    to={`/contacts/${contact.id}`}
                    className="btn btn-sm btn-circle btn-outline-info"
                    title="Show"
                >
                    <i className="fa fa-eye"></i>
                </Link>
                <button
                    className="btn btn-sm btn-circle btn-outline-secondary"
                    title="Edit"
                    onClick={handleEdit}
                >
                    <i className="fa fa-edit"></i>
                </button>
                <button
                    className="btn btn-sm btn-circle btn-outline-danger"
                    title="Delete"
                    onClick={handleDelete}
                >
                    <i className="fa fa-times"></i>
                </button>
            </td>
        </tr>
    );
}
