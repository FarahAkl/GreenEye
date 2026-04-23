import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  name?: string;
}

const SEO = ({ 
  title = "GreenEye", 
  description = "A sustainable marketplace for eco-friendly products and agricultural expertise.", 
  keywords = "agriculture, sustainable, organic, eco-friendly, products, marketplace",
  type = "website",
  name = "GreenEye"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title === "GreenEye" ? title : `${title} | GreenEye`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
