import { useState, useEffect } from "react";
import "./TrustedContacts.css";

function TrustedContacts() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // Fetch contacts on page load
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch("http://https://safespot-backend-ltud.onrender.com/api/trusted-contacts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setContacts(data);
            }
        } catch (err) {
            console.error("Error fetching contacts:", err);
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim()) {
            setError("Please enter both name and phone number.");
            return;
        }

        if (contacts.length >= 5) {
            setError("You can add a maximum of 5 trusted contacts.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        try {
            const response = await fetch("http://https://safespot-backend-ltud.onrender.com/api/trusted-contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setContacts([data, ...contacts]);
                setName("");
                setPhone("");
                setError("");
            } else {
                setError(data.message || "Failed to add contact.");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }
    };

    const handleRemoveContact = async (id) => {
        try {
            const response = await fetch(`http://https://safespot-backend-ltud.onrender.com/api/trusted-contacts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setContacts(contacts.filter((contact) => contact._id !== id));
                setError("");
            }
        } catch (err) {
            console.error("Error deleting contact:", err);
        }
    };

    return (
        <div className="contacts-page">

            <div className="contacts-header">
                <p className="contacts-tag">SAFETY CIRCLE</p>

                <h1>Your Trusted Contacts</h1>

                <p>
                    Add people you trust so they can be contacted quickly during
                    an emergency.
                </p>
            </div>

            <div className="contacts-container">

                <div className="add-contact-card">

                    <h2>Add Trusted Contact</h2>

                    <form onSubmit={handleAddContact}>

                        <div className="contact-field">
                            <label>Contact Name</label>

                            <input
                                type="text"
                                placeholder="Enter contact name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError("");
                                }}
                            />
                        </div>

                        <div className="contact-field">
                            <label>Phone Number</label>

                            <input
                                type="tel"
                                placeholder="Enter 10-digit phone number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value.replace(/\D/g, ""));
                                    setError("");
                                }}
                                maxLength="10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="add-contact-button"
                        >
                            Add Contact
                        </button>

                    </form>

                    {error && (
                        <div className="contact-error">
                            {error}
                        </div>
                    )}

                </div>

                <div className="contacts-list-card">

                    <div className="contacts-list-header">
                        <div>
                            <h2>Trusted Contacts</h2>
                            <p>People who can be contacted during an emergency.</p>
                        </div>

                        <span className="contact-count">
                            {contacts.length}/5
                        </span>
                    </div>

                    {contacts.length === 0 ? (

                        <div className="no-contacts">
                            <h3>No trusted contacts yet</h3>

                            <p>
                                Add at least one person you trust for emergency situations.
                            </p>
                        </div>

                    ) : (

                        <div className="contact-list">

                            {contacts.map((contact) => (

                                <div
                                    className="contact-card"
                                    key={contact._id}
                                >

                                    <div className="contact-avatar">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="contact-details">
                                        <h3>{contact.name}</h3>
                                        <p>{contact.phone}</p>
                                    </div>

                                    <button
                                        className="remove-contact"
                                        onClick={() => handleRemoveContact(contact._id)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default TrustedContacts;