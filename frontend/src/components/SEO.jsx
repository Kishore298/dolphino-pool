import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, isArticle, structuredData }) => {
    const siteName = 'Dolphino Swimming Pool Construction';
    const siteUrl = 'https://dolphino.in'; // Replace with actual domain
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = 'Professional swimming pool construction and water-feature solutions across Tamil Nadu. We build luxury pools, fountains, and custom water features designed for your space.';
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || 'Swimming Pools, Water Features, Fountains, Waterfalls, Tamil Nadu, Construction, Dolphino';
    const currentUrl = url ? `${siteUrl}${url}` : (typeof window !== 'undefined' ? window.location.href : siteUrl);

    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": siteName,
        "image": `${siteUrl}/logo.png`,
        "url": siteUrl,
        "telephone": "+91 63793 88498", 
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN"
        }
    };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={isArticle ? 'article' : 'website'} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={`${siteUrl}/logo.png`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={`${siteUrl}/logo.png`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData || defaultStructuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
