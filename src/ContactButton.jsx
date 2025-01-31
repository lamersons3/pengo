// import { useState } from "react";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function ContactButton() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    // Function to handle click outside the modal
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("modal-overlay")) {
            setShowModal(false);
        }
    };

    // Function to close modal on right-click
    const handleRightClick = (event) => {
        event.preventDefault(); // Prevent the default right-click menu
        setShowModal(false);
    };

    // Add/remove event listener when modal is open
    useEffect(() => {
        if (showModal) {
            document.addEventListener("contextmenu", handleRightClick);
        } else {
            document.removeEventListener("contextmenu", handleRightClick);
        }
        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
        };
    }, [showModal]);

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                "service_9xu697e", // Replace with your EmailJS Service ID
                "template_hl6tzib", // Replace with your EmailJS Template ID
                formData,
                "_zpCCfTYo04A6FIXr" // Replace with your EmailJS Public Key
            )
            .then(
                (response) => {
                    console.log("Email sent successfully!", response);
                    alert("Сообщение отправлено!");
                    setShowModal(false);
                    setFormData({ name: "", email: "", message: "" }); // Reset form
                },
                (error) => {
                    console.error("Failed to send email", error);
                    alert("Ошибка отправки сообщения.");
                }
            );
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="contact-btn">
                Order Now
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Find us online:</h3>
                        <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" className="contact-option">💬 Telegram</a>
                        <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer" className="contact-option">📷 Instagram</a>
                        <h3>Or leave a message:</h3>
                        <form onSubmit={handleSubmit} method="post" className="contact-form">
                            <input type="text" name="name" placeholder="Your Name" required />
                            <input type="email" name="email" placeholder="Your e-mail" required />
                            <textarea name="message" placeholder="Comments"></textarea>
                            <button type="submit" className="close-btn">Send</button>
                        </form>

                        {/* <button onClick={() => setShowModal(false)} className="close-btn">Close</button> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactButton;
