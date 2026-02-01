import { createContext, useState, useEffect, useContext } from "react";

// Create the context
const ContactsContext = createContext();

// Create a custom hook to use the context
export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error("useContacts must be used within a ContactsProvider");
    }
    return context;
};

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("default");
    const [editingContact, setEditingContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    const getAllContacts = async () => {
        try {
            let value = "";
            if (filter === "default") {
                value = "";
            } else if (filter === "1") {
                value = "firstName";
            } else if (filter === "2") {
                value = "lastName";
            } else if (filter === "3") {
                value = "createdAt";
            }
            // console.log("Fetching contacts with filter:", filter, "and searchTerm:", searchTerm);
            const searchQuery = searchTerm ? `q=${searchTerm}` : "";
            const sortQuery = value ? `_sort=${value}` : "";
            const queries = [searchQuery, sortQuery].filter(Boolean).join("&");
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/contacts${queries ? `?${queries}` : ""}`;
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    // Fetch contacts when filter changes
    useEffect(() => {
        getAllContacts();
    }, [filter, searchTerm]);

    // Function to add a new contact
    const addContact = async (contactData) => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...contactData,
                    createdAt: new Date().toISOString(),
                }),
            });
            if (response.ok) {
                await getAllContacts();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error adding contact:", error);
            return false;
        }
    };

    // Function to update a contact
    const updateContact = async (id, contactData) => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData),
            });
            if (response.ok) {
                await getAllContacts(); 
                setEditingContact(null);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating contact:", error);
            return false;
        }
    };

    // Function to delete a contact
    const deleteContact = async (id) => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                await getAllContacts();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting contact:", error);
            return false;
        }
    };

    const value = {
        contacts,
        filter,
        setFilter,
        getAllContacts,
        addContact,
        updateContact,
        deleteContact,
        editingContact,
        setEditingContact,
        searchTerm,
        setSearchTerm,
    };

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};
