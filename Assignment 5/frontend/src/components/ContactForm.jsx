import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContacts } from '../contexts/ContactsContext'

export default function ContactForm() {
    const navigate = useNavigate();
    const { addContact, updateContact, editingContact, setEditingContact } = useContacts();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (editingContact) {
            setFormData({
                firstName: editingContact.firstName || '',
                lastName: editingContact.lastName || '',
                email: editingContact.email || '',
                phone: editingContact.phone || '',
                address: editingContact.address || ''
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
            });
        }
    }, [editingContact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        
        if (editingContact) {
            success = await updateContact(editingContact.id, formData);
        } else {
            success = await addContact(formData);
        }
        
        if (success) {
            setEditingContact(null);
            navigate("/");
        } else {
            console.error('Failed to save contact');
        }
    };

    const handleCancel = () => {
        setEditingContact(null);
        navigate("/");
    };
    return (
        <main className="py-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-title">
                                <strong>{editingContact ? 'Edit Contact' : 'Add New Contact'}</strong>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label for="first_name" className="col-md-3 col-form-label">First Name</label>
                                                <div className="col-md-9">
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        id="first_name"
                                                        className="form-control"
                                                        value={formData.firstName}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, "firstName": e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="lastName" className="col-md-3 col-form-label">Last Name</label>
                                                <div className="col-md-9">
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        id="lastName"
                                                        className="form-control"
                                                        value={formData.lastName}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, "lastName": e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="email" className="col-md-3 col-form-label">Email</label>
                                                <div className="col-md-9">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, "email": e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="phone" className="col-md-3 col-form-label">Phone</label>
                                                <div className="col-md-9">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        className="form-control"
                                                        value={formData.phone}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, "phone": e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="name" className="col-md-3 col-form-label">Address</label>
                                                <div className="col-md-9">
                                                    <textarea
                                                        name="address"
                                                        id="address"
                                                        rows="3"
                                                        className="form-control"
                                                        value={formData.address}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, "address": e.target.value })
                                                        }
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row mb-0">
                                                <div className="col-md-9 offset-md-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >Save</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
