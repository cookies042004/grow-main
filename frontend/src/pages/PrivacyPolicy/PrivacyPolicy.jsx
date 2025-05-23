import React from "react";
import { Layout } from "../../components/Layout";
import './PrivacyPolicy.css'
import { Helmet } from "react-helmet-async";

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Grow Infinity Realtors | Privacy Policy</title>
        <meta
          name="description"
          content="Read our Privacy Policy to understand how we handle your personal information and ensure your privacy."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}/privacy-policy`}
        />
      </Helmet>
      {/* Banner Section */}
      <div className="privacybanner flex justify-center items-center bg-gray-800 py-12">
        <div className="text-center">
          <h1 className="font-dmsans font-semibold text-white text-4xl capitalize">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "600",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          Privacy Policy
        </h1>

        {/* Paragraphs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            fontSize: "1rem",
            lineHeight: "1.8",
            color: "#333",
          }}
        >
          <p>
            This Privacy policy is subject to the terms of this website's Site
            Policy (User Agreement). The personal information provided by the
            users to us will not be provided to third parties without previous
            consent of the concerned user. Information of a general nature may
            however be revealed to external parties.
          </p>

          <p>
            Every effort shall be made to keep the information provided by the
            users in a safe manner, the information will be displayed on the
            website will be done so only after obtaining consent from the
            users.
          </p>

          <p>
            You are solely responsible for maintaining the confidentiality of
            the User's password and user identification and all activities and
            transmission performed by the User through his user identification
            and shall be solely responsible for carrying out any online or
            offline transaction involving credit cards/debit cards or such
            other forms of instruments or documents for making such
            transactions and GROW INFINITY REALTORS assumes no responsibility
            or liability for their improper use of information relating to such
            usage of credit cards/debit cards used by the subscriber online /
            offline. A user always has the option of not providing the
            information which is not mandatory.
          </p>

          <p>
            In order to provide a personalized browsing experience, we may
            collect personal information from you. Also, we may require you to
            complete a registration form or ask for some information seeking
            your preferences regarding the property you are looking for. Based
            on your preferences, we will be able to deliver or allow you to
            access the most relevant information that meets your end.
          </p>

          <p>
            To extend this personalized experience we may track the IP address
            of a user’s computer/device and save certain information on your
            system in the form of cookies. A User has the option of accepting
            or declining the cookies of this website by changing the settings
            of your browser. Any User browsing this website is not required to
            disclose his identity or provide any of his information every time.
            It is only at the time of registration; that the User is required
            to furnish the details in the registration form. You agree that
            GROW INFINITY REALTORS may use personal information provided by you
            to improve its marketing and promotional efforts, to analyze site
            usage, improve the Site's content and product offerings, and
            customize the Site's content, layout, and services. This shall
            further improve the website content and help us to tailor it to
            meet your needs and to provide a smooth, efficient, safe, and
            customized experience while using this website.
          </p>

          <p>
            You agree that GROW INFINITY REALTORS may use your personal
            information to contact you and deliver information to you that is
            targeted to your interests, such as targeted banner advertisements,
            administrative notices, product offerings, forum comments, and
            reviews, your portfolio-related updates, and communications
            relevant to your use of this website. By accepting this Privacy
            Policy, you expressly agree to receive this information. If you do
            not wish to receive these communications, you may opt out of the
            receipt of certain communications in your profile. You may make
            changes to your profile at any time. GROW INFINITY REALTORS
            believes that a person's privacy can be best guaranteed by working
            in conjunction with the Law enforcement authorities.
          </p>

          <p>
            All GROW INFINITY REALTORS websites including this website fully
            comply with all Indian Laws applicable. GROW INFINITY REALTORS has
            always cooperated with all law enforcement inquiries. GROW INFINITY
            REALTORS may disclose all or part of your personal details in
            response to a request from the law enforcement authorities or in a
            case of bonafide requirement to prevent an imminent breach of the
            law.
          </p>

          <p>
            GROW INFINITY REALTORS has taken all reasonable steps to ensure
            that all the information on this website is authentic. Users are
            advised to research independently the credentials of the
            advertisers provided on this website. GROW INFINITY REALTORS shall
            not have any responsibility in this regard. We also recommend that
            you visit the link to the User Agreement for more comprehensive
            information on this aspect. GROW INFINITY REALTORS has implemented
            and uses Display Advertising. GROW INFINITY REALTORS is using
            Remarketing with Google Analytics to advertise online. You can opt
            out of Google Analytics for Display Advertising and customize
            Google Display Network ads using the Ads Preferences Manager.
            Third-party vendors, including Google, show our ads on sites across
            the Internet. We and third-party vendors, including Google, use
            first-party cookies (such as Google Analytics cookies) and
            third-party cookies (such as the DoubleClick cookie) together to
            inform, optimize, and serve ads based on someone's past visits to
            our website.
          </p>
        </div>
      </div>
    </Layout>
  );
};
