import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Layout } from "../../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button } from "@mui/material";
import { NavigationBar } from "../../components/NavigationBar";
import { Helmet } from "react-helmet-async";

export const Contact = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // To manage loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // dynamically update the state
    });
  };

  // Validate form data
  const validateForm = () => {
    const { name, email, phone, message } = formData;

    if (!name || !phone) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!validateForm()) {
      return; // If validation fails, don't submit
    }

    setLoading(true); // Set loading state to true when submitting

    try {
      // Post formData to the backend API
      const response = await axios.post(apiUrl, formData);

      if (response.data.success) {
        toast.success(response.data.success.message); // Show success toast
        // Optionally, clear the form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      toast.success("Message sent successfully!");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout>
        <Helmet>
          <title>Grow Infinity Realtors | Contact Us</title>
          <meta
            name="description"
            content="Get in touch with Grow Infinity Realtors for all your real estate needs. Contact us today!"
          />
          <meta name="robots" content="index, follow" />
          <link
            rel="canonical"
            href={`${process.env.BASE_URL}/contact`}
          />
        </Helmet> 
        {/* Contact Hero */}
        <div className="contactbanner flex items-center justify-center">
          <div className="grid sm:grid-cols-12 w-full">
            <div className="col-span-12 text-center mt-10 flex justify-center items-center">
              <h1 className="font-sans text-3xl lg:text-4xl font-bold text-white">
                Contact Us
              </h1>
            </div>
          </div>
        </div>

        <NavigationBar />

        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-12 gap-5 my-10 mx-5 px-4 sm:px-8 bg-gray-100 p-6 rounded-[24px] shadow-lg">
            <div className="col-span-12 lg:col-span-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14016.248411720519!2d77.3950231!3d28.5678978!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f7b6f8aa4bbbca1%3A0xcd4a6a4f021202d4!2sGrow%20Infinity%20Realtors!5e0!3m2!1sen!2sin!4v1730825249194!5m2!1sen!2sin"
                height="400"
                style={{ border: "0", width: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[16px]"
              ></iframe>
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center bg-white rounded-[16px] shadow-sm px-8 py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1d2a3b] mb-4">
                Noida Sector 116 Office
              </h2>
              <div className="flex items-start gap-3 text-base lg:text-lg text-gray-600 leading-relaxed tracking-wide">
                <LocationOnIcon sx={{ fontSize: 28, color: '#1d2a3b', mt: '4px' }} />
                <p className="text-base">
                  BL-34, 2nd Floor,
                  Near Bhavya Sainik Canteen,
                  Sector 116, Noida,
                  Uttar Pradesh 201305.
                </p>
              </div>
            </div>
          </div>

          {/* Office 2 */}
          <div className="grid sm:grid-cols-12 gap-5 my-10 mx-5 px-4 sm:px-8 bg-gray-100 p-6 rounded-[24px] shadow-lg">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center bg-white rounded-[16px] shadow-sm px-8 py-6 order-2 lg:order-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1d2a3b] mb-4">
                Noida Sector 153 Office
              </h2>
              <div className="flex items-start gap-3 text-base lg:text-lg text-gray-600 leading-relaxed tracking-wide">
                <LocationOnIcon sx={{ fontSize: 28, color: '#1d2a3b', mt: '4px' }} />
                <p className="text-base">
                  6th Floor, Urbtech NPX, S-102,
                  Sector 153, Noida,<br />
                  Uttar Pradesh 201310.
                </p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0377267822855!2d77.4725869!3d28.448279099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1451a406103%3A0x2e38985a544a9860!2sGrow%20Infinity%20Realtors!5e0!3m2!1sen!2sin!4v1746294001136!5m2!1sen!2sin"
                height="400"
                style={{ border: "0", width: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[16px]"
              ></iframe>
            </div>
          </div>

          {/* Third Div: Contact Form with Heading */}
          <div className="my-10 mx-5 px-4 sm:px-8 bg-gray-100 p-6 rounded-[24px] shadow-lg">
            <div className="text-center ">
              <h1 className="text-2xl lg:text-4xl font-medium font-sans text-[#1d2a3b]">
                Have Any Query?
              </h1>
            </div>
            <div className="grid sm:grid-cols-12 gap-5 my-5 lg:my-10">
              {/* Left Column for Full Name, Email, and Phone Number */}
              <div className="col-span-12 sm:col-span-6">
                <div>
                  <form>
                    <div className="grid gap-5">
                      {/* Full Name */}
                      <div className="col-span-12">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="ps-2">*Full Name</label>
                          <div className="flex items-center bg-white border rounded-[24px]">
                            <PersonOutlineOutlinedIcon sx={{ marginLeft: "15px" }} />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Enter your full name..."
                              className="p-3 outline-none w-full rounded-[24px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="col-span-12">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="phone" className="ps-2">*Phone Number</label>
                          <div className="flex items-center bg-white border rounded-[24px]">
                            <LocalPhoneOutlinedIcon sx={{ marginLeft: "15px" }} />
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              maxLength={10}
                              minLength={10}
                              placeholder="Enter your phone number..."
                              className="p-3 outline-none w-full rounded-[24px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="col-span-12">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="ps-2">Email Address</label>
                          <div className="flex items-center bg-white border rounded-[24px]">
                            <MailOutlinedIcon sx={{ marginLeft: "15px" }} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="Enter your email address..."
                              className="p-3 outline-none w-full rounded-[24px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column for Message */}
              <div className="col-span-12 sm:col-span-6">
                <div>
                  <div className="flex flex-col gap-5">
                    {/* Message */}
                    <div className="col-span-12">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="ps-2">Message</label>
                        <textarea
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Enter your message here..."
                          className="p-3 outline-none border rounded-[24px] w-full min-h-64"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button Centered */}
              <div className="col-span-12 flex justify-center">
                <Button
                  className="bg-gradient-to-r from-gray-600 to-gray-800"
                  type="submit"
                  onClick={handleSubmit}
                  endIcon={<EastOutlinedIcon />}
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "24px",
                    textTransform: "none",
                  }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Form"}
                </Button>
              </div>
            </div>
          </div>


          {/* Rest of the content */}
          <div className="my-10 mx-5 bg-gray-100 p-6 rounded-[24px] shadow-lg">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid sm:grid-cols-12 py-10 px-5">
                <div className="col-span-12 md:col-span-6 lg:col-span-4 flex justify-center bg-white m-5 px-3 lg:px-4 py-4 lg:py-6 rounded-[24px] shadow-lg">
                  <div className="flex flex-col gap-3 lg:gap-5 justify-center items-center">
                    <div className="flex items-center justify-center p-5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-[50%] h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]">
                      <EmailIcon
                        sx={{
                          fontSize: { sm: "20px", lg: "40px" },
                          color: "white",
                        }}
                        onClick={() => {
                          window.location.href = "mailto:info@growinfinityrealtors.in";
                        }}
                      />
                    </div>

                    <p className="font-sans text-[#1d2b3a] font-semibold text-lg">
                      Chat to us
                    </p>
                    <p className="font-sans text-lg text-gray-600 font-bold">
                      Our friendly team is here to help.
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 flex justify-center bg-white m-5 px-3 lg:px-4 py-4 lg:py-6 rounded-[24px] shadow-lg">
                  <div className="flex flex-col gap-3 lg:gap-5 justify-center items-center">
                    <div className="flex items-center justify-center p-5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-[50%] h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]">
                      <LocationOnIcon
                        sx={{
                          fontSize: { sm: "20px", lg: "40px" },
                          color: "white",
                        }}
                        onClick={() => {
                          window.open(
                            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14016.248411720519!2d77.3950231!3d28.5678978!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f7b6f8aa4bbbca1%3A0xcd4a6a4f021202d4!2sGrow%20Infinity%20Realtors!5e0!3m2!1sen!2sin!4v1730825249194!5m2!1sen!2sin",
                            "_blank"
                          );
                        }}
                      />
                    </div>

                    <p className="font-sans font-semibold text-[#1d2b3a] text-lg">
                      Office
                    </p>
                    <p className="font-sans text-lg text-gray-600 font-bold">
                      Come say hello at our office HQ.
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 flex justify-center bg-white m-5 px-3 lg:px-4 py-4 lg:py-6 rounded-[24px] shadow-lg">
                  <div className="flex flex-col gap-3 lg:gap-5 justify-center items-center">
                    <div className="flex items-center justify-center p-5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-[50%] h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]">
                      <LocalPhoneIcon
                        sx={{
                          fontSize: { sm: "20px", lg: "40px" },
                          color: "white",
                        }}
                        onClick={() => {
                          window.location.href = "tel:+911234567890";
                        }}
                      />
                    </div>

                    <p className="font-sans font-semibold text-[#1d2b3a] text-lg">
                      Call Us
                    </p>
                    <p className="font-sans text-lg text-gray-600 font-bold">
                      Have questions? Let’s talk!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
