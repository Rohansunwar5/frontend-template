import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Shalicon Infra LLP",
    description = "Premium real estate developments focused on quality, design, and long-term value.",
    image = "/og-image.jpg",
    url
}) => {
    const currentUrl = url || window.location.href;
    const siteTitle = title === "Shalicon Infra LLP" ? title : `${title} | Shalicon Infra LLP`;

    return (
        <Helmet>
            {/* Basic */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
