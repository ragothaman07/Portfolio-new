// Contact.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "./Alert";
import { Particles } from "./Particles";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: "Ragothaman",
          from_email: formData.email,
          to_email: "tvragothaman7@gmail.com",
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  return (
    <div className="page-wrapper">
      <Particles className="particles-bg" quantity={80} ease={80} color="#000000" refresh />

      <header className="page-header">
        <h1 className="title">Contact</h1>
      </header>

      <div className="card">
        {/* Banner inside the card */}
        <div className="banner inside-banner">
          <span className="banner-text">SUBSCRIBE</span>
          <span className="banner-text">JOIN US</span>
        </div>

        {showAlert && <Alert type={alertType} text={alertMessage} />}

        <span className="card__title">Let's Talk</span>
        <p className="card__subtitle">
          If you want to contact me, you can fill out the form below or send an email.
        </p>

        <form className="card__form" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Share your thoughts..."
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button className="sign-up" type="submit">
            {!isLoading ? "Send Message" : "Sending..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
