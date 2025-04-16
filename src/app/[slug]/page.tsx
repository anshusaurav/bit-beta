'use client';

import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';
import '@/lib/env'; 
import { RiCloseLine} from "react-icons/ri";
import '@/styles/Home.module.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Mentors.module.css'
import {
  FaUsers,
  FaBitcoin,
  FaQuestionCircle,
  FaHeadphones,
  FaLinkedin,
  FaTwitter, FaFacebookF, FaYoutube
} from "react-icons/fa";
import { useRouter } from 'next/navigation';

import NextImage from '@/components/NextImage';
// import Image from 'next/image';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import { set } from 'zod';
import { MENTORS_DATA } from '../constants/MentorsConstants';
import { JsonLd } from '../components/JsonLD';
// @ts-ignore firebase efficiently
// import {db} from '@/firebase'
// import {collection, getDocs, addDoc} from "firebase/firestore";
// const mentorData = {
//   cards: [
//     {
//       id: 1,
//       title: 'Influencer Collaboration',
//       description: 'Strategies and Insights for Success',
//       ratings: 5,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//       tags: ['Popular']
//     },
//     {
//       id: 2,
//       title: '30 mins call',
//       description: 'Elevate Your bitcoin investment journey, One Strategy at a Time',
//       ratings: 5,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//       tags: ['Best Deal', 'Popular']
//     },
//     {
//       id: 3,
//       title: 'Quick Introductory Call',
//       ratings: 4,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//     }
//   ],
//   reviews: {
//     averageRating: 5,
//     cards: [{
//       rating: 5,
//       content: "This info session was really great.  I loved the way she approached and helped me with my resume, and the job hints were really helpful.",
//       author: 'Shriya Padhi',
//       reviewDate: '29th May, 2023',
//     },
//     {
//       rating: 5,
//       content: "I found your advice on interview preparation, tips on networking, resume enhancement and upskilling were very much helpful. I appreciate your support and look forward to applying what I've learned!",
//       author: 'Subhranshu Ghosh',
//       reviewDate: '23rd Nov, 2024',
//     },
//     {
//       rating: 5,
//       content: "Had a great session. Very helpful in providing career insight. Thank you!!",
//       author: 'Shriya Padhi',
//       reviewDate: '5th Dec , 2024',
//     }]
//   }
// }

const SIDEBAR_DATA = [
  {
    title: 'Opportunity',
    image_data: {
      uri: <FaBitcoin className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Opportunity',
      width: 30,
      height: 30
    },
    uri: '/#about-section'
  },
  {
    title: 'Why Us',
    image_data: {
      uri: <FaQuestionCircle className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Why us',
      width: 30,
      height: 30
    },
    uri: '/#whyus-section'
  },
  {
    title: 'Clients',
    image_data: {
      uri: <FaUsers className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'clients',
      width: 30,
      height: 30
    },
    uri: '/#client-section'
  },
  {
    title: 'Book a call',
    image_data: {
      uri: <FaHeadphones className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Book a call',
      width: 30,
      height: 30
    },
    uri: '/#mentor-section'
  },
  // {
  //   title: 'Podcast',
  //   image_data: {
  //     uri: '/images/podcast.svg',
  //     alt_text: 'Podcast',
  //     width: 30,
  //     height: 30
  //   },
  //   uri: '#podcast-section'
  // }
]
const SIDEBAR_SOCIAL_DATA = [
  {
    uri: 'https://www.youtube.com/@Bitcoincierge/',
    image_data: {
      uri: <FaYoutube className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Youtube',
      width: 30,
      height: 30
    },
    identifier: 'youtube'
  },
  {
    uri: 'https://www.facebook.com/groups/Bitcoincierge/',
    image_data: {
      uri: <FaFacebookF className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Facebook',
      width: 30,
      height: 30
    },
    identifier: 'facebook'

  },
  {
    uri: 'https://www.linkedin.com/company/bitcoincierge/',
    image_data: {
      uri: <FaLinkedin className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Linkedin',
      width: 30,
      height: 30
    },
    identifier: 'linkedin'
  },
  {
    uri: 'https://www.x.com/bitcoinciergein/',
    image_data: {
      uri: <FaTwitter className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Twitter',
      width: 30,
      height: 30
    },
    identifier: 'twitter'
  },
]

const MENTOR_SOCIAL_LINKS = [
  {
    identifier: 'youtube'
  },
  { 
    identifier: 'facebook'
  },
  {
    identifier: 'linkedin'
  },
  {
    identifier: 'twitter'
  },
]
export default function HomePage() {

  
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const [moved, setMoved] = useState(false);
  // const [serviceFilter, setServiceFilter] = useState<string | null>('All');
  const [mentorData, setMentorData] = useState(null);
  const router = useRouter()

  const toggleSidebar = () => {
    setSidebarOpen(bool => !bool)
    // window.scrollBy( 0, -96 );
  }
  
  const listenScrollEvent = (event : any) => {
    if (window.scrollY < 1) {
      return setMoved(false)
    } else if (window.scrollY > 1) {
      return setMoved(true);
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', listenScrollEvent);
    
    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  },[])
  
  useEffect(() => {
    const tempMentorData = MENTORS_DATA?.find((item) => item?.uri === window.location.pathname) || null;
    setMentorData(tempMentorData);
  },[])


  const renderServiceCard = (item: any) => {

    return (
      <div key={item?.id} onClick= {()=> {window.open(mentorData?.calenderUrl, '_blank');}}className='group rounded-[32px] bg-[hsla(0,0%,100%,.95)] mb-5 relative cursor-pointer grid items-start text-dark hover:shadow-[12px_12px_32px_0_rgba(0, 0, 0, .1)]' style={{transition: 'all .25s linear'}}>
        <div className='pt-5 pl-6 flex justify-between items-center'>
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='rounded-[24px] font-bold text-sm h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7]'>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
              <div className='ml-2 '>{item?.ratings}</div>
            </div>
            {
              item?.tags?.map((tag, index) => {
                return (
                  <div key={index} className='rounded-[24px] font-bold text-sm  h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7] ml-4'>
                    {tag}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='pt-4 flex flex-col items-stretch gap-2'>
          <h3 className='text-xl font-bold px-6 py-0'>{item?.title}</h3>
          <div className='text-md px-6 py-0 font-light text-[#5c5c5c]'>{item?.description}</div>
        </div>
        <div className='pt-4 flex flex-col items-stretch gap-2'>
          <div className='flex rounded-[24px] m-4 py-3 px-4 relative overflow-hidden justify-between items-center bg-[#efeff0] group-hover:bg-[#e2e2e4]'>
            <div className='flex gap-2 items-center'>
              <NextImage alt='HAmburger' src={item?.card?.iconUrl} width={32} height={32} />
              <div className='flex flex-col items-start '>
                <div className='flex flex-col item-stretch'>
                  <div className='text-sm font-bold'>
                    {item?.card?.title}
                  </div>
                  <div className='text-sm font-light' style={{color: '#ADADAF'}}>
                  {item?.card?.description}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-start items-center'>
              <div className='flex justify-center items-center bg-tranparent group-hover:bg-dark px-3 py-0 text-md font-semibold h-10 border border-[#141414] rounded-[24px]'>
                <div className='flex justify-center items-center gap-1'>
                  {item?.card?.price?.actual !== 0 && <div className=' text-xs font-medium text-grey-600 line-through group-hover:text-white'>
                    ₹{item?.card?.price?.maximum}
                  </div>}
                  <div className=' text-sm font-medium text-grey-900 group-hover:text-white'>
                    {item?.card?.price?.actual === 0?'Free': `₹${item?.card?.price?.actual}`}
                  </div>
                </div>
                <svg stroke="currentColor" fill="white" className='hidden group-hover:block' strokeWidth="0" viewBox="0 0 448 512" fontSize="12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 8}}><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
              
                <svg stroke="currentColor" fill="black" className='block group-hover:hidden' strokeWidth="0" viewBox="0 0 448 512" fontSize="12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 8}}><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
              </div>
              {/* {item?.card?.brokerage && <div className='flex justify-center items-center gap-1'>
                  {item?.card?.brokerage?.actual !== 0 && <div className=' text-xs font-medium text-grey-600 line-through group-hover:text-white'>
                    {item?.card?.brokerage?.maximum}% brokerage
                  </div>}
                  <div className=' text-sm font-medium text-grey-900 group-hover:text-white'>
                    {`${item?.card?.brokerage?.actual}% brokerage`}
                  </div>
                </div>} */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderReviewCard = (item: any) => {

    return (
      <div className='rounded-[32px] bg-[hsla(0,0%,100%,.95)] mb-5 p-5 relative cursor-pointer grid items-start text-dark'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='font-bold text-sm h-8 inline-flex items-center justify-center'>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
              <div className='ml-2 '>{item?.rating}/5</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-stretch gap-2'>
          <h3 className='text-lg font-light leading-7'>{item?.content}</h3>
        </div>
        <div className='mt-8 flex justify-between'>
          <div className=''>
          <div className='text-md font-semibold text-black'>{item?.author || 'Anonymous'}</div>
          <div className='text-xs font-normal text-[#797979]'>{item?.reviewDate}</div>
          </div>
        </div>
      </div>
    )
  }
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <></>,
    prevArrow: <></>
  };
  console.log('rendering mentor page')
  return (
    <>
    <JsonLd person={mentorData} baseUrl={process.env.NEXT_PUBLIC_BASE_URL}/>
    <div className='container'>
      <main className='relative'>
        
        <div className='absolute w-full'>
         </div>
        <div className={`sticky top-0 inset-x-0 p-4 z-10 ${moved?'bg-black md:bg-opacity-[0.8]': 'bg-transparent'}`}>
          <div className='sticky top-0'>
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 justify-start items-center bg-opacity-1' onClick={() => router.push('/')}>
                <NextImage alt='Logo' src={moved?'/images/logo-light.webp': '/images/logo-dark.webp'} width={54} height={54} className='rounded-md'/>
                {!moved && <div
                  className='font-trakya text-dark font-light text-xl md:text-4xl tracking-wide cursor-default'>Bitcoincierge
                </div>}
              </div>
              <div className={`h-16 w-16 rounded-lg flex justify-center items-center ${moved?'bg-black':''} cursor-pointer`} onClick={toggleSidebar}>
                <NextImage alt='Hamburger' src='/images/hamburger.svg' width={32} height={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-[#f5f5f5] min-h-[100vh]">
            <aside className="relative font-sm justify-stretch w-full md:w-1/3 " style={{backgroundImage: `url("/images/background-light.png")`}}>
                <div className='h-full -mt-1 -mb-1'>
                    <div className='sticky top-[120px] pb-12 md:pb-[120px]  ml-[8%]'>
                      <div className='flex justify-center pt-0 md:pt-[8%]' >
                        <div className='flex flex-wrap pt-5 md:pt-0'>
                            <div className='block relative' style={{flex: '0 0 41.66666666666667%',maxWidth: '41.66666666666667%'}}>
                              <div className='relative inline-flex break-words'>
                                <div className='bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url("${mentorData?.image_data?.uri}")`, width: '200px', height: '200px', borderRadius: '50%'}}>

                                </div>
                                {/* <NextImage alt={mentorData?.title} src={mentorData?.image_data?.uri} classNames={{image: 'rounded-[50%]'}} width={200} height={200}/> */}
                              </div>
                            </div>
                            <div className='block' style={{flex: '0 0 50%', maxWidth: '50%'}}>
                              {/* <div className='flex justify-end align-end mb-1'>
                                <div className="slider-container">
                                  <Slider {...settings}>
                                    <NextImage alt='' src='/images/slide-1.svg' width={74} height={74}/>
                                    <NextImage alt='' src='/images/slide-2.svg' width={74} height={74}/>
                                    <NextImage alt='' src='/images/slide-3.svg' width={74} height={74}/>
                                    </Slider>
                                </div>
                              </div> */}
                            </div>
                            <div className='mt-8' style={{flex: '0 0 91.66666666666666%',maxWidth: '91.66666666666666%'}}>
                              <h1 className='text-2xl font-extrabold mb-4'>
                                {mentorData?.title || ''}
                              </h1>
                              <p className='text-lg font-medium'>
                              {mentorData?.description}
                              </p>
                              <div className='flex flex-row flex-wrap gap-4 mt-4'>
                                {
                                  mentorData?.tags?.map((tag, index) => {
                                    return (
                                      <div key={index} className='rounded-[24px] font-bold text-xs md:text-sm h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7]'>
                                        {tag}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </aside>
            <div className='pt-8 pb-16 min-h-[100vh] flex flex-1 flex-column w-full md:w-2/3 ' style={{backgroundColor: '#efece3'}}>
              <div className='flex justify-center flex-wrap flex-1'>
                <div style={{flex: '0 0 82%', maxWidth: '82%'}}>
                  {/* <div className='overflow-auto' >
                    <div className='bg-[#efece3] z-1 overflow-hidden w-full'>
                      <div className='flex items-center gap-3 pt-3'>
                      <div className={`${serviceFilter === "All" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>All</div>
                      <div className={`${serviceFilter === "1:1 Call" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>1:1 Call</div>
                      <div className={`${serviceFilter === "Priority DM" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Priority DM</div>
                      <div className={`${serviceFilter === "Digital Product" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Digital Product</div>
                      <div className={`${serviceFilter === "Package" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Package</div>
                      </div>
                    </div>
                  </div> */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-3 md:gap-5 mt-8'>
                    <div className='flex-1'>
                      {
                        mentorData?.cards?.filter((item, index) => index%2===0)?.map(item => {
                          return renderServiceCard(item);
                        })
                      } 
                    </div>
                    <div className='flex-1'>
                    {
                        mentorData?.cards?.filter((item, index) => index%2!==0)?.map(item => {
                          return renderServiceCard(item);
                        })
                      }
                    </div>
                  </div>
                   <div className='my-10 flex flex-col flex-wrap w-full'>
                    <div className='text-2xl font-bold'>
                      <div className='flex items-center justify-start'>
                        <h2 className='mb-2'>Ratings and feedback</h2>
                      </div>
                    </div>
                    <div className='flex row-wrap'>
                      <div className='pr-1 md:pr-3 w-1/3 lg:w-1/2'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex justify-center items-center bg-[#fdfbf9]' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                          <NextImage alt='reviews animation' src='/images/reviews_animation.gif' classNames={{image: 'rounded-[50%] aspect-square'}} width={160} height={160} />
                        </div>
                      </div>
                      <div className='px-1 md:px-3 w-1/3 lg:w-1/4'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex flex-col justify-center items-center bg-[#fdfbf9] gap-3' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                            <div className='text-xl lg:text-3xl tracking-wider font-bold'>5/5</div>
                            <div className='text-sm lg:text-md font-normal tracking-wide text-[#666b60] uppercase'>1 rating</div>
                        </div>
                      </div>
                      <div className='px-1 md:px-3 w-1/3 lg:w-1/4'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex flex-col justify-center items-center bg-[#fdfbf9] gap-3' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                            <div className='text-xl lg:text-3xl tracking-wider font-bold'>0</div>
                            <div className='text-sm lg:text-md font-normal tracking-wide text-[#666b60] uppercase'>Testimonial</div>
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-8'>
                      <div className='flex-1'>
                      {
                        mentorData?.reviews?.cards?.filter((item, index) => index%2===0).map(item => {
                          return renderReviewCard(item);
                        })
                      } 
                      </div>
                      <div className='flex-1'>
                      {
                        mentorData?.reviews?.cards?.filter((item, index) => index%2!==0).map(item => {
                          return renderReviewCard(item);
                        })
                      }
                      </div>
                    </div>
                    {/* <button className='py-3 px-5 rounded-[6px] h-12 inline-flex bg-[#fdfbf9] border border-[#ebeaeb] mx-auto mt-10' style={{boxShadow: '-.5px -.5px 4px rgba(0, 0, 0, .03), .5px .5px 4px rgba(0, 0, 0, .03)'}}>
                      <span>Show all reviews</span>
                    </button> */}
                  </div>
                  <div className='my-10 flex flex-wrap w-full'>
                    <div className='text-2xl font-bold'>
                      <div className='flex flex-col items-start justify-start'>
                        <h2 className='mb-2'>About me</h2>
                        <div className='flex gap-4 items-center flex-wrap mt-4'>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.linkedin) window.open(mentorData?.socialLinks?.linkedin, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }} className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path></svg>
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.twitter) window.open(mentorData?.socialLinks?.twitter, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }} className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"></path></svg>  
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.youtube) window.open(mentorData?.socialLinks?.youtube, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"></path></svg>
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.instagram) window.open(mentorData?.socialLinks?.instagram, '_blank');
                                else 
                                toast('🚧 Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path></svg>
                          </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.nostr) window.open(mentorData?.socialLinks?.nostr, '_blank');
                                else 
                                toast('🚧 Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173 167" role="img" height="40" width="40"><path d="M86.5 0.990601C40.9622 0.990601 4.04053 37.9531 4.04053 83.5413C4.04053 129.129 40.9622 166.092 86.5 166.092C132.038 166.092 168.96 129.129 168.96 83.5413C168.96 37.9531 132.038 0.990601 86.5 0.990601ZM133.855 64.5883C130.372 70.3837 123.27 74.3259 122.614 74.6629C121.284 75.3704 120.796 76.3981 120.881 77.9312C120.965 79.4643 120.594 87.0623 115.967 90.4149C113.594 92.1333 104.018 94.3571 99.6262 95.0984C97.3712 95.4858 96.8495 96.1766 95.6042 96.9178C93.9214 97.9624 87.9473 106.251 86.9376 108.087C87.0722 108.071 105.769 102.258 106.61 102.124C108.831 101.787 110.514 102.427 111.608 104.044C112.651 105.594 113.678 107.161 114.705 108.728C115.075 109.284 115.428 109.856 115.782 110.429L116.152 111.019C116.286 111.238 116.472 111.491 116.556 111.828C116.623 112.063 116.774 112.855 116.32 113.327C115.899 113.765 115.176 113.765 114.789 113.664C114.418 113.563 113.863 113.344 113.409 112.973L112.786 112.451C112.298 112.03 111.372 111.827 110.649 111.861C109.807 111.895 108.697 111.625 108.158 111.288C107.115 110.615 106.846 108.93 106.846 108.913C106.711 108.357 106.307 108.205 105.937 108.205C105.264 108.189 104.742 108.391 104.204 108.542C101.747 109.284 99.3065 110.042 96.8495 110.817L93.3324 111.912C91.599 112.451 89.8657 112.99 88.1492 113.563C87.678 113.714 87.2236 113.95 86.7356 114.203C86.5337 114.304 86.3317 114.405 86.1298 114.506C85.9278 114.607 85.7091 114.725 85.5071 114.843C85.0528 115.096 84.5647 115.365 84.0262 115.517C82.2761 116.039 80.7447 115.281 80.0211 113.529C79.5499 112.4 79.9706 110.16 80.223 109.503C81.8049 105.392 86.9544 97.6423 86.9544 97.5917C86.8702 97.558 81.2495 99.8155 80.324 100.523C77.7829 102.461 71.8256 107.043 71.7415 107.481C71.3544 109.519 70.0923 111.053 68.157 111.811C66.7602 112.35 65.9188 113.462 65.0942 114.54C65.0942 114.54 50.1674 135.127 49.1576 136.239C48.8547 136.576 46.0612 139.507 45.3208 140.872C45.1525 141.209 44.513 142.557 44.3447 142.894C44.2101 143.163 43.9072 143.887 42.7628 143.837C41.6185 143.786 41.5848 142.186 41.5344 141.495C41.4166 139.794 41.7868 138.126 42.6787 136.374C42.7628 136.205 43.7725 134.672 43.4023 133.442C43.0657 132.364 42.746 130.696 43.2509 129.854C44.0418 128.523 45.4386 128.472 47.3065 128.169C48.6023 127.95 49.5447 127.31 50.4534 125.979C52.3719 123.182 59.5913 112.923 61.2237 110.547C61.6612 109.924 61.9978 109.115 62.1492 108.323C62.6204 105.931 64.0677 104.263 66.5919 103.235C67.1304 103.016 77.177 94.6098 77.177 93.5316C77.177 92.7566 76.0832 92.3354 75.2418 92.0996C75.124 92.0659 68.8133 90.4317 65.9356 89.1176C64.3706 88.4101 63.1926 87.7867 61.7958 86.7759C59.8942 85.3776 56.091 86.0515 55.5356 86.1357C52.8431 86.5232 50.8405 87.7362 48.5687 89.2693C48.1648 89.5557 46.0949 90.2969 45.0515 89.7073C43.0153 88.5448 38.5389 86.4558 36.8897 83.9456C36.1324 82.7832 36.2334 80.8963 36.7719 78.8072C38.5052 73.9553 41.0632 71.782 45.792 70.4679C49.1576 69.3055 55.9395 69.0528 59.2042 68.8001C59.423 68.7327 66.6593 68.5642 71.7415 65.9529C75.124 64.2177 85.1706 57.5294 99.6262 57.9843C105.466 58.1696 116.505 63.8807 120.763 64.0492C125.105 64.2345 127.275 63.746 129.783 61.1515C130.49 60.4102 133.502 53.9073 130.658 50.3525C129.598 49.0385 128.504 47.8592 127.242 46.781C125.542 45.3321 123.775 43.9506 122.244 42.3165C118.861 38.728 117.818 33.8255 119.416 30.0013C120.443 27.3226 122.597 26.1601 125.71 26.7666C127.898 27.1878 129.497 29.1589 131.062 30.2034C131.937 30.7931 133.401 31.13 134.36 31.3659C135.572 31.6523 136.481 32.5789 136.43 33.2022C136.38 33.8256 134.781 34.3647 133.25 34.2467C131.432 34.1288 128.319 34.112 126.451 34.7353C125.205 35.1902 124.65 36.5716 125.02 37.9362C125.323 39.0481 127.696 41.0361 128.588 41.7774C130.372 43.2431 132.273 44.574 133.754 46.4103C135.42 48.4994 136.295 50.8748 136.565 53.5029C136.969 57.5294 135.908 61.1515 133.855 64.5883Z" fill="hsl(var(--muted))"></path></svg>
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.watsapp) window.open(mentorData?.socialLinks?.watsapp, '_blank');
                                else 
                                toast('🚧 Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" viewBox="0 0 308 308">
<g id="XMLID_468_">
	<path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156   c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687   c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887   c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153   c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348   c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802   c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922   c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0   c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458   C233.168,179.508,230.845,178.393,227.904,176.981z"/>
	<path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716   c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396   c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z    M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188   l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677   c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867   C276.546,215.678,222.799,268.994,156.734,268.994z"/>
</g>
</svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex row-wrap mt-8 text-lg'>
                      {mentorData?.longDescription}
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>          
        </div>
        {
          sidebarOpen && <div style={{backgroundImage: `url("/images/noise-bg.png")`}}
                              className='bg-contain bg-center bg-repeat-y fixed inset-0 w-full z-50 transition-all duration-300 ease-in-out delay-1000'>
            <div className='relative'>
              <div className='absolute inset-y-0 right-0 max-w-[465px] w-full min-h-screen bg-jet overflow-auto'>
                <div className='flex-1 flex-col'>
                  <div className='border-b border-b-bone border-opacity-20'>
                    <div className='flex justify-end px-8 py-6 text-bone hover:text-pumpkin cursor-pointer' onClick={toggleSidebar}>
                      <RiCloseLine size={48} className=''/>
                    </div>
                  </div>
                  <div className='flex flex-col flex-1 self-stretch'>
                    <div className='flex-1 px-10 pt-14 pb-10 '>
                      <div className='flex flex-col gap-6'>
                        {
                          SIDEBAR_DATA?.map((item, index) => {
                            return (
                              <Link key={index} href={item?.uri} className='group flex justify-start items-center gap-3 py-3 px-4 border border-transparent hover:border-pumpkin rounded-md'
                                    onClick={toggleSidebar}>
                                {item?.image_data?.uri}
                                <div className='text-4xl text-bone font-semibold group-hover:text-pumpkin'>{item?.title}</div>
                              </Link>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className='px-14 py-6'>
                      <div className='text-bone font-xs font-light'>We are available here</div>
                      <div className='flex justify-start items-center gap-6 mt-1'>
                        {
                          SIDEBAR_SOCIAL_DATA?.map((item, index) => {
                            return (
                              <button key={index} onClick = {() => {
                                  window.open('www.yourdomain.com', '_blank')
                                }}>
                                {item?.image_data?.uri}
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    </>
  );
}
