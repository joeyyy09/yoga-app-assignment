// AdmissionForm.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdmissionForm.css"; // Import your CSS file

// Mock function simulating a payment process
const CompletePayment = async () => {
  // Simulate a successful payment
  return { success: true, message: "Payment successful!" };
};

const AdmissionForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  var response;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Handling form submission...");

    // Perform basic client-side validations
    if (name.trim() === "") {
      setPaymentStatus("Please enter your name.");
      return;
    }

    if (age < 18 || age > 65) {
      setPaymentStatus("Age must be between 18 and 65.");
      return;
    }

    try {
      console.log("Before Axios POST request");
      response = await axios.post("http://localhost:3001/api/enroll", {
        name,
        age,
        selectedBatch,
      });
      console.log("After Axios POST request");
      console.log(response);
      setPaymentStatus(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setPaymentStatus("Error submitting form. Please try again.");
    }
    if (response.data.message === "Payment successful") {
      // Payment successful
      setPaymentStatus(response.data.message);
      // Display toast notification for success
      toast.success("Payment completed!");
    } else {
      // Payment failed
      setPaymentStatus("Payment failed. Please try again.");
      // Display toast notification for failure
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="admission-form-container">
      <h2>Yoga Class Admission Form</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min={18}
            max={65}
          />
        </div>

        <p className="fee-info">Monthly Fee: 500 INR</p>

        <div className="form-group">
          <label htmlFor="selectedBatch">Selected Batch:</label>
          <select
            id="selectedBatch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            required
          >
            <option value="">Select a batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Enroll
        </button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
      <ToastContainer /> {/* Toast container component */}
    </div>
  );
};

export default AdmissionForm;
