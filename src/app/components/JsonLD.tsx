// components/JsonLd.tsx
import { FC } from 'react';
import Head from 'next/head';
import { json } from 'stream/consumers';

// interface PersonData {
//   id: number;
//   title: string;
//   calenderUrl: string;
//   image_data: {
//     alt_text: string;
//     uri: string;
//   };
//   uri: string;
//   designation: string;
//   description: string;
//   longDescription: string;
//   tags: string[];
//   cards: Array<{
//     id: number;
//     title: string;
//     description: string;
//     ratings: number;
//     card: {
//       title: string;
//       description: string;
//       iconUrl: string;
//       price: {
//         actual: number | string;
//         maximum: number | string;
//       };
//       brokerage?: {
//         actual: number;
//         maximum: number;
//       };
//     };
//   }>;
//   reviews: {
//     averageRating: number;
//     cards: any[];
//   };
// }

// interface JsonLdProps {
//   person: PersonData;
//   baseUrl: string;
// }

const generatePersonJsonLd = (person: any, baseUrl: string) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl||'https://bitcoincierge.com'}${person?.uri ||'/saurabh'}`,
    "name": person?.title || '',
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}${person?.image_data?.uri || ''}`,
      "alternateName": person?.image_data?.alt_text || ''
    },
    "jobTitle": person?.designation,
    "description": person?.longDescription,
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "IIM Ahmedabad"
    },
    "knowsAbout": person?.tags,
    "makesOffer": person?.cards.map(card => ({
      "@type": "Offer",
      "name": card?.title,
      "description": card?.description,
      "price": card?.card?.price?.actual?.toString() || '',
      "priceCurrency": "INR",
    })),
    "url": `${baseUrl}${person?.uri || '/saurabh'}`,
    "sameAs": [
      person?.calenderUrl
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": person?.reviews?.averageRating?.toString() || '',
      "ratingCount": "1"
    }
  };

  return jsonLd;
};

export const JsonLd: FC<any> = ({ person, baseUrl }) => {
    console.log(JSON.stringify(person));
  const jsonLd = generatePersonJsonLd(person, baseUrl);
    // console.log(jsonLd)
  return (
    <Head>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="person-jsonld"
      /> */}
      <script
        type="application/ld+json">
            {
                JSON.stringify(jsonLd)
            }
        </script>
    </Head>
  );
};