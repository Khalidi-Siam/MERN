import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContacts } from "../contexts/ContactsContext";

export default function ContactDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setEditingContact, deleteContact } = useContacts();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
                const response = await fetch(`${baseUrl}/contacts/${id}`);
                const data = await response.json();
                setContact(data);
            } catch (error) {
                console.error("Error fetching contact details:", error);
            }
        };
        fetchContact();
    }, [id]);

    const handleEdit = () => {
        setEditingContact(contact);
        navigate("/create");
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            const success = await deleteContact(id);
            if (success) {
                navigate("/");
            }
        }
    };

    if (!contact) {
        return (
            <main className="py-5">
                <div className="container">
                    <div className="text-center">Loading...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="py-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-title">
                                <strong>Contact Details</strong>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group row">
                                            <label for="first_name" className="col-md-3 col-form-label">First Name</label>
                                            <div className="col-md-9">
                                                <p className="form-control-plaintext text-muted">{contact.firstName}</p>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label for="last_name" className="col-md-3 col-form-label">Last Name</label>
                                            <div className="col-md-9">
                                                <p className="form-control-plaintext text-muted">{contact.lastName}</p>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label for="email" className="col-md-3 col-form-label">Email</label>
                                            <div className="col-md-9">
                                                <p className="form-control-plaintext text-muted">{contact.email}</p>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label for="phone" className="col-md-3 col-form-label">Phone</label>
                                            <div className="col-md-9">
                                                <p className="form-control-plaintext text-muted">{contact.phone}</p>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label for="name" className="col-md-3 col-form-label">Address</label>
                                            <div className="col-md-9">
                                                <p className="form-control-plaintext text-muted">{contact.address || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row mb-0">
                                            <div className="col-md-9 offset-md-3">
                                                <button onClick={handleEdit} className="btn btn-info">Edit</button>
                                                <button onClick={handleDelete} className="btn btn-outline-danger">Delete</button>
                                                <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
