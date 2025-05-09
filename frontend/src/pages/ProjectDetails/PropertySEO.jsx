import React from "react";
import { Helmet } from "react-helmet-async";

const PropertySEO = ({ property }) => {
  if (!property) return null;

  return (
    <Helmet>
      <meta charset="UTF-8" />
      <title>{property.seoTitle || property.name || "Default Title"}</title>
      <meta
        name="description"
        content={
          property.seoDescription ||
          (property.description?.slice(0, 150) ?? "Default description")
        }
      />
      {property.shouldIndex === false && (
        <meta name="robots" content="noindex, nofollow" />
      )}
      {property.headCode && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: property.headCode }}
        />
      )}
    </Helmet>
  );
};

export default PropertySEO;
