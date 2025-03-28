import React, { useState } from "react";
import { Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EnquiryHome = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Phone Number Validation (Indian Numbers: 10-digit starting with 6-9)
  const validatePhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Required Fields
    if (!formData.firstName || !formData.phone) {
      setError("Name and Phone are required.");
      toast.error("Name and Phone are required.");
      return;
    }

    // Validate Phone Number
    if (!validatePhoneNumber(formData.phone)) {
      setError("Invalid phone number. Enter a 10-digit number starting with 6-9.");
      toast.error("Invalid phone number.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/contact`,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );

      if (response.data.success) {
        toast.success("Enquiry submitted successfully!", {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => setIsOpen(false), 2000);
      } else {
        setError("There was an issue. Please try again.");
        toast.error("There was an issue. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Try again.");
      setError("Network error. Try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Floating Button to Open Modal */}
      <div
        className={`hidden lg:block fixed right-0 top-[35%] z-[9999] rounded-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0]" : "translate-x-[0]"
        }`}
      >
        <div className="flex justify-center items-center cursor-pointer">
          <div
            className="bg-white rounded-s-lg shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p
              className="font-bold uppercase text-[16px] text-[#1d2a3b] py-1 pb-2"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {isOpen ? "Close" : "Enquiry Form"}
            </p>
            {isOpen ? (
              <Cancel color="error" sx={{ fontSize: "35px" }} />
            ) : (
              <span
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(270deg)",
                }}
              >
                <EmailIcon sx={{ fontSize: "20px", color: "red" }} />
              </span>
            )}
          </div>
        </div>

        {/* Sliding Enquiry Form */}
        {isOpen && (
          <div className="fixed right-0 top-[-50%] bg-white shadow-lg w-[450px] p-4 z-50 rounded-3xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="text-xl px-32 font-bold">Enquiry Form</h2>
                <h2 className="px-20">We will get back to you asap!</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-600 hover:text-red-800"
              >
                <Cancel sx={{ fontSize: 35 }} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="mt-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form className="mx-3 lg:mx-8 mt-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <div className="flex border rounded-lg items-center bg-white">
                      <PersonIcon sx={{ color: "gray", margin: 1 }} />
                      <input
                        type="text"
                        name="firstName"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex border rounded-lg items-center bg-white">
                      <PhoneIcon sx={{ color: "gray", margin: 1 }} />
                      <input
                        type="text"
                        name="phone"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          setFormData({ ...formData, phone: value });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex border rounded-lg items-center bg-white">
                      <MarkunreadIcon sx={{ color: "gray", margin: 1 }} />
                      <input
                        type="email"
                        name="email"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex border rounded-lg items-center bg-white">
                      <MessageIcon sx={{ color: "gray", margin: 1 }} />
                      <textarea
                        name="message"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#1d2a3b" }}
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EnquiryHome;
