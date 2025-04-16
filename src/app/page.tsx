'use client';
import Link from 'next/link'
import * as React from 'react';
import '@/lib/env';
// import { PopupWidget } from "react-calendly";
import {RiArrowRightLine, RiCloseLine} from "react-icons/ri";
import {RiArrowRightUpLine} from "react-icons/ri";
import '@/styles/Home.module.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";
import { RiFilter2Fill } from "react-icons/ri";
import {
  FaUsers,
  FaBitcoin,
  FaQuestionCircle,
  FaHeadphones,
  FaLinkedin,
  FaTwitter, FaFacebookF, FaYoutube
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { MENTORS_DATA } from './constants/MentorsConstants';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Logo from '~/svg/Logo.svg';
import NextImage from '@/components/NextImage';
// import Image from 'next/image';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
// @ts-ignore firebase efficiently
import {db} from '@/firebase'
import {collection, getDocs, addDoc} from "firebase/firestore";


const FIN_DATA = [
  {
    title: 'Equity',
    icon: {
      uri: '/images/equity-icon.png',
      alt_text: 'Equity'
    },
    constituents: [
      {
        title: `Apple   `,
        prices: {
          '15': [7.64, 56.63, 158, 314],
          '10': [56.63, 158, 314],
          '5': [158, 314]
        },
        startingPrice: {
          '15': 7.64,
          '10': 56.63,
          '5': 158
        },
        endPrice: 314
      },
      {
        title: 'Alphabet',
        prices: {
          '15': [263, 554, 1128, 2182],
          '10': [554, 1128, 2182],
          '5': [1128, 2182]
        },
        startingPrice: {
          '15': 263,
          '10': 554,
          '5': 1128
        },
        endPrice: 2182
      }
    ],
    index: {
      title: 'S&P 500',
      prices: {
        '15': [903, 1848, 2888, 4500],
        '10': [1848, 2888, 4500],
        '5': [2888, 4500]
      },
      startingPrice: {
        '15': 903,
        '10': 1848,
        '5': 2888
      },
      endPrice: 4500
    }
  },
  {
    title: 'Precious metals',
    icon: {
      uri: '/images/metals-icon.png',
      alt_text: 'Metals'
    },
    constituents: [
      {
        title: `Gold  `,
        subTitle: '(per oz)',
        prices: {
          '15': [1087, 1205, 1290, 2000],
          '10': [1205, 1290, 2000],
          '5': [1290, 2000]
        },
        startingPrice: {
          '15': 1087,
          '10': 1205,
          '5': 1290
        },
        endPrice: 2000
      },
      {
        title: 'Silver',
        subTitle: '(per oz)',
        prices: {
          '15': [15, 17, 16, 25],
          '10': [17, 16, 25],
          '5': [16, 25]
        },
        startingPrice: {
          '15': 15,
          '10': 17,
          '5': 16
        },
        endPrice: 25
      }
    ],
    index: {
      title: 'S&P GSCI Precious Metals Index',
      prices: {
        '15': [1230, 1450, 1600, 2100],
        '10': [1450, 1600, 2100],
        '5': [1600, 2100]
      },
      startingPrice: {
        '15': 1230,
        '10': 1450,
        '5': 1600
      },
      endPrice: 2100
    }
  },
  {
    title: 'Real estate',
    icon: {
      uri: '/images/real-estate-icon.png',
      alt_text: 'Real estate'
    },
    constituents: [
      {
        title: 'NY',
        subTitle: '(per sq. ft.)',
        prices: {
          '15': [800, 1200, 1500, 2000],
          '10': [1200, 1500, 2000],
          '5': [1500, 2000]
        },
        startingPrice: {
          '15': 800,
          '10': 1200,
          '5': 1500
        },
        endPrice: 2000
      },
      {
        title: 'Mumbai',
        subTitle: '(per sq. ft.)',
        prices: {
          '15': [200, 400, 800, 1200],
          '10': [400, 800, 1200],
          '5': [800, 1200]
        },
        startingPrice: {
          '15': 200,
          '10': 400,
          '5': 800
        },
        endPrice: 12000
      }
    ],
    index: {
      title: 'MSCI World Real Estate Index',
      prices: {
        '15': [180, 240, 310, 380],
        '10': [240, 310, 380],
        '5': [310, 380]
      },
      startingPrice: {
        '15': 200,
        '10': 400,
        '5': 800
      },
      endPrice: 12000
    }
  }
]

const BIT_DATA = {
  title: 'Bitcoin',
  icon: {
    uri: '/images/bitcoin-icon.png',
    alt_text: 'Bitcoin'
  },
  prices: {
    '15': [0.01, 361, 7208, 100000],
    '10': [361, 7208, 100000],
    '5': [7208, 100000]
  },
  startingPrice: {
    '15': 0.01,
    '10': 361,
    '5': 7208
  },
  endPrice: 100000
}
const COMPARISON_DATA = [
  {
    cards: [
      {
        title: 'Equity',
        icon: {
          uri: '/images/equity-icon.png',
          alt_text: 'Equity'
        },
        image_data: {
          uri: '/images/equity.png',
          alt_text: 'Equity'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed S&P 500 by ',
    gain: 20
  },
  {
    cards: [
      {
        title: 'Metals',
        icon: {
          uri: '/images/metals-icon.png',
          alt_text: 'Metals'
        },
        image_data: {
          uri: '/images/metals.png',
          alt_text: 'Metals'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed precious metals by ',
    gain: 400
  },
  {
    cards: [
      {
        title: 'Real estate',
        icon: {
          uri: '/images/real-estate-icon.png',
          alt_text: 'Real estate'
        },
        image_data: {
          uri: '/images/real-estate.png',
          alt_text: 'Equity'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed real estate by ',
    gain: 500
  }
]
const CAPTION_DATA = [
  {
    title: 'Bitcoin is best performing asset, ever!',
    description: 'Buying Bitcoin can be a daunting experience. We will be your partner in building Bitcoin stash with ease!',
    image_data: {
      uri: '/images/caption-3.png',
      alt_text: ''
    }
  },
  {
    title: 'Not your keys, not your coins!',
    description: 'Exchanges make it difficult to withdraw coins. We will be your partner from helping select the right hardware wallet to exporting it.',
    image_data: {
      uri: '/images/caption-1.png',
      alt_text: ''
    }
  },
  {
    title: '100X your security with backup',
    description: 'Multi-sig custody is the ultimate security. We will be your partner in future-proofing your Bitcoin against a single point of failure!',
    image_data: {
      uri: '/images/caption-2.png',
      alt_text: ''
    }
  }]
const PARTNER_DATA = [
  {
    title: 'Getbit',
    image_data: {
      alt_text: 'getbit',
      uri: '/images/getbit.png'
    },
    description: 'Exchange'
  },
  {
    title: 'Unocoin',
    image_data: {
      alt_text: 'unocoin',
      uri: '/images/unocoin.png'
    },
    description: 'Exchange'
  },
  {
    title: 'Zebpay',
    image_data: {
      alt_text: 'zebpay',
      uri: '/images/ZebPay.png'
    },
    description: 'Exchange'
  },
  {
    title: 'Theya',
    image_data: {
      alt_text: 'theya',
      uri: '/images/theya.png'
    },
    description: 'Hardware Wallet'
  }
]

const COMMUNITY_DATA = [
  {
    icon: {
      uri: '/images/users.png',
      alt_text: 'user count'
    },
    title: 'Clients',
    cta: {
      title: 'Join our community',
      action: {
        type: 'NAVIGATION',
        data: {
          uri: 'https://calendar.app.google/5Q8NaBfxKPFaSitj9'
        }
      }
    },
    countString: '100+'
  },

]
const FOOTER_LINKS = [

  {
    title: 'Terms',
    uri: '/terms'
  }
]
const SOCIAL_MEDIA_DATA = [
  {
    title: 'Youtube',
    image_data: {
      uri: '/images/youtube.png',
      alt_text: 'Youtube',
      width: 110,
      height: 30
    },
    uri: 'https://www.youtube.com/@Bitcoincierge'
  },
  {
    title: 'Twitter',
    image_data: {
      uri: '/images/twitter.png',
      alt_text: 'Twitter',
      width: 30,
      height: 30
    },
    uri: 'https://www.x.com/bitcoinciergein/'
  },
  {
    title: 'Facebook',
    image_data: {
      uri: '/images/facebook.png',
      alt_text: 'Facebook',
      width: 30,
      height: 30
    },
    uri: 'https://www.facebook.com/groups/Bitcoincierge/'
  },
  {
    title: 'LinkedIn',
    image_data: {
      uri: '/images/linkedin.png',
      alt_text: 'LinkedIn',
      width: 30,
      height: 30
    },
    uri: 'https://www.linkedin.com/company/bitcoincierge/'
  }
]
const SIDEBAR_DATA = [
  {
    title: 'Opportunity',
    image_data: {
      uri: <FaBitcoin className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Opportunity',
      width: 30,
      height: 30
    },
    uri: '#about-section'
  },
  {
    title: 'Why Us',
    image_data: {
      uri: <FaQuestionCircle className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Why us',
      width: 30,
      height: 30
    },
    uri: '#whyus-section'
  },
  {
    title: 'Clients',
    image_data: {
      uri: <FaUsers className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'clients',
      width: 30,
      height: 30
    },
    uri: '#client-section'
  },
  {
    title: 'Book a call',
    image_data: {
      uri: <FaHeadphones className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Book a call',
      width: 30,
      height: 30
    },
    uri: '#mentor-section'
  },
]
const SIDEBAR_SOCIAL_DATA = [
  {
    uri: 'https://www.youtube.com/@Bitcoincierge/',
    image_data: {
      uri: <FaYoutube className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Youtube',
      width: 30,
      height: 30
    }
  },
  {
    uri: 'https://www.facebook.com/groups/Bitcoincierge/',
    image_data: {
      uri: <FaFacebookF className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Facebook',
      width: 30,
      height: 30
    }
  },
  {
    uri: 'https://www.linkedin.com/company/bitcoincierge/',
    image_data: {
      uri: <FaLinkedin className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Linkedin',
      width: 30,
      height: 30
    }
  },
  {
    uri: 'https://www.x.com/bitcoinciergein/',
    image_data: {
      uri: <FaTwitter className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Twitter',
      width: 30,
      height: 30
    }
  },
]

const HOW_IT_WORKS_DATA = [
  {
    uri: '/images/how_it_works_1.png',
    title: 'Choose a Mentor',
  },
  {
    uri: '/images/how_it_works_2.png',
    title: 'Pick a Time Slot',
  },
  {
    uri: '/images/how_it_works_3.png',
    title: 'Connect via Call or in-person',
  },
  {
    uri: '/images/how_it_works_4.png',
    title: 'Leave a Review',
  },
]

const USER_FEEDBACKS = [
  {
    user: {
      fullName: 'Floyd Miles',
      image_data: {
        uri: '/images/feedback_user_1.png',
        alt_text: 'Floyd Miles'
      }
    },
    rating: 1,
    feedback: 'I had a great experience with Bitcoincierge. The mentor was very knowledgeable and helped me understand Bitcoin better.'
  },
  {
    user: {
      fullName: 'Floyd Miles',
      image_data: {
        uri: '/images/feedback_user_1.png',
        alt_text: 'Floyd Miles'
      }
    },
    rating: 5,
    feedback: 'I had a great experience with Bitcoincierge. The mentor was very knowledgeable and helped me understand Bitcoin better.'
  },
  {
    user: {
      fullName: 'Floyd Miles',
      image_data: {
        uri: '/images/feedback_user_1.png',
        alt_text: 'Floyd Miles'
      }
    },
    rating: 10,
    feedback: 'I had a great experience with Bitcoincierge. The mentor was very knowledgeable and helped me understand Bitcoin better.'
  }
]
const USER_FEEDBACK_HELPER_ARR = [1,1,1,1,1];
const CATEGORIES = ['Bitcoin Mining', 'Bitcoin Wallets & Custody', 'Bitcoin Payments & Merchant Services', 'Bitcoin Exchange','Bitcoin Infrastructure & Development', 'Bitcoin Financial Services', 'Bitcoin Education & Advocacy', 'Bitcoin Job Boards & Talent Services', 'Bitcoin Consultancy Services', 'Nostr', 'Bitcoin Merchandise', 'Bitcoin Stocks'];
  
export default function MentorPage() {

  const emailsRef = collection(db, "emails")
  const [selectedDuration, setSelectedDuration] = useState('5');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [moved, setMoved] = useState(false);
  const [startTeamIndex, setStartTeamIndex] = useState(0);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES);
  // console.log(MENTORS_DATA + 'HERE@')
  const toggleSidebar = () => {
    setSidebarOpen(bool => !bool)
    // window.scrollBy( 0, -96 );
  }
  const getOutperformance = (item : any) => {
    const itemPerformance = (item?.index?.endPrice - item?.index?.startingPrice?.[selectedDuration]) * 100 / item?.index?.startingPrice?.[selectedDuration];
    const bitPerformance = (BIT_DATA?.endPrice - BIT_DATA?.startingPrice?.[selectedDuration]) * 100 / BIT_DATA?.startingPrice?.[selectedDuration];
    return Math.round((bitPerformance / itemPerformance)*100);

  }
  const listenScrollEvent = (event : any) => {
    if (window.scrollY < 1) {
      return setMoved(false)
    } else if (window.scrollY > 1) {
      return setMoved(true);
    }
  }

  const onRightNavClick = () => {
    setStartTeamIndex(s => (s+1)%MENTORS_DATA.length);
  }

  const onLeftNavClick = () => {
    setStartTeamIndex(s => (s+MENTORS_DATA.length-1)%MENTORS_DATA.length);
  }
  useEffect(() => {
    console.log('HERE', MENTORS_DATA)
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  },[])
  const addEmail = async () => {
    const dt = new Date();
    setIsLoading(true);
    const newDocRef = await addDoc(emailsRef, {email: email, createdOn: dt.toDateString()})
    setEmail('');
    // const data = await getDocs(emailsRef)
    setIsLoading(false);
    toast('🦄 Wow so easy!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    const init = async () => {
      const data = await getDocs(emailsRef)
      console.log(data);
    }
    init();
  }, [])


  const renderTeamItems = () => {
    const itemOne = MENTORS_DATA?.[startTeamIndex];
    const itemTwo = MENTORS_DATA?.[(startTeamIndex + 1)%MENTORS_DATA.length]
    const itemThree = MENTORS_DATA?.[(startTeamIndex + 2)%MENTORS_DATA.length]
    const itemFour = MENTORS_DATA?.[(startTeamIndex + 3)%MENTORS_DATA.length]
    const itemFive = MENTORS_DATA?.[(startTeamIndex + 4)%MENTORS_DATA.length]
    const itemSix = MENTORS_DATA?.[(startTeamIndex + 5)%MENTORS_DATA.length]
    
    return (
      <>
        <button onClick={() => {
          if(itemOne?.uri) {
            router.push(itemOne?.uri);
          }
          else {
            window.open(itemOne?.calenderUrl, '_blank');
          }
        }} key={itemOne?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemOne?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lgp-2">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemOne?.description || ''}</div>
            </div>
        </button>
        <button onClick={() => {
          if(itemTwo?.uri) {
            router.push(itemTwo?.uri);
          }
          else {
            window.open(itemTwo?.calenderUrl, '_blank');
          }
        }} key={itemTwo?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemTwo?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lg">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemTwo?.description || ''}</div>
            </div>
        </button>
        <button onClick={() => {
          if(itemThree?.uri) {
            router.push(itemThree?.uri);
          }
          else {
            window.open(itemThree?.calenderUrl, '_blank');
          }
        }} key={itemThree?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemThree?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lg">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemThree?.description || ''}</div>
            </div>
        </button>
        <button onClick={() => {
          if(itemFour?.uri) {
            router.push(itemFour?.uri);
          }
          else {
            window.open(itemFour?.calenderUrl, '_blank');
          }
        }} key={itemFour?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md hidden lg:block`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemFour?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lg">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemFour?.description || ''}</div>
            </div>
        </button>
        <button onClick={() => {
          if(itemFive?.uri) {
            router.push(itemFive?.uri);
          }
          else {
            window.open(itemFive?.calenderUrl, '_blank');
          }
        }} key={itemFive?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md hidden lg:block`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemFive?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lg">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemFive?.description || ''}</div>
            </div>
        </button>
        <button onClick={() => {
          if(itemSix?.uri) {
            router.push(itemSix?.uri);
          }
          else {
            window.open(itemSix?.calenderUrl, '_blank');
          }
        }} key={itemSix?.id}  className={`cursor-pointer p-1 md:p-4 text-left rounded-md hidden lg:block`}>
          <div
            className='flex flex-col gap-4 justify-start p-1 md:p-4 rounded-md bg-gradient-to-b from-mentorCardBgStart to-mentorCardBgEnd hover:from-mentorCardBgStart hover:to-mentorCardBgStart' >
              <div style={{backgroundImage: `url(${itemSix?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] border border-3 border-white rounded-lg">
              </div>
              <div className={'text-slate-800 font-normal text-xs line-clamp-3 tracking-wide'}>{itemSix?.description || ''}</div>
            </div>
        </button>
      </>
    )
  }
  return (
    <>
      <div style={{backgroundImage: `url("/images/background-light.png")`}}
           className={`bg-cover bg-center bg-repeat-y bg-repeat-x top-0 inset-x-0 p-4 z-10 ${moved?'bg-black md:bg-opacity-[0.8]': 'bg-transparent'}`}>
          <div className='sticky top-0'>
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 justify-start items-center bg-opacity-1'>
                <NextImage alt='Logo' src={moved?'/images/logo-light.webp': '/images/logo-dark.webp'} width={54} height={54} className='rounded-md'/>
                <div
                  className='font-trakya text-dark font-light text-xl md:text-4xl tracking-wide cursor-default'>Bitcoincierge
                </div>
              </div>
              <div className={`h-16 w-16 rounded-lg flex justify-center items-center cursor-pointer`} onClick={toggleSidebar}>
                <NextImage alt='HAmburger' src='/images/hamburger.svg' width={32} height={16} />
              </div>
            </div>
          </div>
      </div>
      <div className='w-full flex my-0 mx-auto flex-col'>
        <div style={{backgroundImage: `url("/images/background-light.png")`}}
            className='bg-cover bg-center bg-repeat-y bg-repeat-x'>
          <div className='my-0 pb-24 ml-[9%] mr-[9%] w-[82%] mt-20'>
          <div className='flex items-center gap-4 justify-between text-kobicha'>
            <div className='flex-1 min-w-[50%]'>
              <div className='font-semibold text-[80px] leading-none'>Bitcoin education made simple.</div>
              <ul className='mt-6 text-2xl'>
                <li className='hero_li'>Buying</li>
                <li className='hero_li'>Custody</li>
                <li className='hero_li'>Inheritance & taxes</li>
              </ul>
            </div>
            <div className='flex-1 min-w-[50%]'>
              <NextImage alt='Hero' src='/images/new_hero.png' width={580} height={480} />
            </div>
          </div>
        </div>
        </div>
        <div className='w-full flex mx-auto my-0 flex-col bg-white py-10'>
          <div className='py-[10px] flex items-center justify-center'>
            <div className='ml-[9%] max-w-[91%]'>
              <div className='flex m-0 p-0 items-center gap-5 font-semibold'>
                  <div className='flex items-center gap-[10px] m-0 p-0 text-nowrap'>
                    <button className='rounded-md h-12 text-md border py-1 px-2 border-kobicha text-kobicha flex justify-start items-center gap-1'>
                      <RiFilter2Fill color={'#66381F'}/>
                      Filters
                    </button>
                    <button className='rounded-md h-12 text-md border py-1 px-2 border-kobicha text-kobicha flex justify-start items-center gap-1'>
                      Sort by <IoIosArrowDown  color={'#66381F'}/>
                    </button>
                  </div>
                  <div className='flex items-center gap-3 py-0 px-4 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    <button className='bg-kobicha text-white rounded-md text-md py-2 px-3'>
                      All
                    </button>
                    {
                      CATEGORIES?.map((item, index) => {
                        return (
                          <button key={index} className='bg-white text-kobicha border border-kobicha rounded-md text-md py-2 px-3'>
                            {item}
                          </button>
                        )
                      })
                    }
                  </div>
              </div>
            </div>
          </div>          
        </div>
        {
          CATEGORIES?.map((category, index) => {
            return (
              <>
              <div className='w-full flex mx-auto my-0 flex-col bg-white mb-5'>
                <div>
                  <div>
                    <div className='mb-4'>
                      <div className='flex items-center m-0 p-0 gap-1 justify-between pr-[30px]'>
                        <div className='text-2xl font-semibold pl-[9%] text-[ #1A1A1A] '>
                          {category}
                        </div>
                        <button className='flex justify-start items-center gap-1 underline text-kobicha text-[20px] tracking-wide'>
                          See All
                          <IoArrowForward color={'#66381F'}/>
                        </button>
                      </div>
                      <div className='flex flex-wrap justify-start pt-5'>
                        <div className='flex overflow-x-auto p-0 pl-[9%] pr-[30px] gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                          {
                            MENTORS_DATA?.map((item, index) => {
                              return (
                                <button onClick={() => {
                                  if(item?.uri) {
                                    router.push(item?.uri);
                                  }
                                  else {
                                    window.open(item?.calenderUrl, '_blank');
                                  }
                                }} key={index} className='cursor-pointer text-left rounded-[20px]  relative' style={{boxShadow: '0px 0px 6px 0px #0000001F',border: '1px solid #0000001F'}}>
                                    <div
                                      className='flex-1 flex flex-col gap-4 items-center py-2 px-1 md:py-3 md:px-2 w-[240px]' >
                                        <div style={{backgroundImage: `url(${item?.image_data?.uri})`}} className="bg-cover bg-no-repeat bg-center h-[86px] w-[86px] outline outline-[#1A1A1A1F] rounded-full relative overflow-hidden z-6 box-content">
                                          <div className='absolute bottom-0 text-gold left-0 right-0 text-xs flex justify-center items-center gap-[2px] bg-white border-2 border-white'>
                                          4.2 <NextImage alt='Hamburger' src='/svg/star.svg' width={16} height={20} />
                                          </div>
                                        </div>
                                        <div className={'text-slate-800 font-semibold text-md tracking-wide'}>{item?.title || ''}</div>                 
                                        <div className={'text-slate-800 font-normal text-xs tracking-wide line-clamp-[2] text-center w-full px-2 text-center'}>{item?.description || ''}</div>
                                        <div className='flex flex-wrap gap-2 mt-4 justify-center pb-10'>
                                        {
                                          item?.tags?.map((tag, index) => {
                                            return (
                                              <div key={index} className='rounded-[6px] font-normal leading-[16px] text-[9px] py-[3px] px-2 bg-[#1A1A1A0A]'>
                                                {tag}
                                              </div>
                                            )
                                          })
                                        }
                                        </div>
                                    </div>
                                    <div className='absolute -bottom-[1px] left-0 right-0 bg-kobicha text-white text-center py-2 rounded-b-md text-sm flex justify-center items-center gap-2 rounded-b-[20px]'>
                                    <NextImage alt='Hamburger' src='/svg/phone.svg' width={16} height={20} /> Book a Call
                                    </div>
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
              {
                index == 1 && (
                  <div className='my-0 pb-24 ml-[9%] mr-[9%] w-[82%] mt-20'>
                    <div style={{backgroundImage: `url("/images/background-light.png")`}}
                      className='bg-cover bg-center bg-repeat-y bg-repeat-x relative p-5 rounded-xl border border-[#0000001F] px-10'>
                        <div className='flex flex-col'>
                          <div className='text-center text-2xl font-bold text-kobicha'>How it works</div>
                          <div className='text-center text-md font-semibold text-[#1A1A1A99] mt-3'>Simple 4-steps Process to connect with Mentors</div>
                          <div className='relative flex items-center justify-between gap-4 mt-6'>
                            {
                              HOW_IT_WORKS_DATA?.map((item, index) => {
                                return (
                                  <div key={index} className='flex flex-col items-center justify-center gap-2'>
                                    <div style={{backgroundImage: `url(${item?.uri})`}} className='bg-contain bg-center bg-no-repeat h-[232px] w-[227px]'>
                                    </div>
                                  </div>
                                )
                              })
                            }
                            <div style={{backgroundImage: `url("/images/how_it_works_bg.png")`}}
                            className='bg-contain bg-center bg-repeat-x absolute top-[50%] left-0 right-0 h-[2px] -z-10 mx-4'>

                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                )
              }
              </>
            )
          })
        }
        <div style={{backgroundImage:`url("/images/feedback_bg.png")`}}
            className='bg-cover bg-center bg-repeat-y bg-repeat-x'>
          <div className='my-0 pb-24 ml-[9%] mr-[9%] w-[82%] mt-20'>
            <div className='flex flex-col justify-between items-start gap-6'>
              <div className='flex justify-between items-center gap-4 w-full'>
                <div>
                  <div className='text-2xl font-bold text-kobicha'>Our Customer Feedback</div>
                  <div className='text-md font-semibold text-[#1A1A1A99] mt-1'>Don’t take our word for it. Trust our customers</div>
                </div>
                <div>
                  <div className='flex items-center justify-between gap-4'>
                    <button className='text-kobicha border border-[#66381F] rounded-md py-1 px-2 font-semibold flex items-center justify-center'><IoIosArrowBack color={'#66381F'}/> Previous</button>
                    <button className='text-kobichaLight border border-[#85604C] rounded-md py-1 px-2 font-semibold flex items-center justify-center'>Next <IoIosArrowForward color={'#85604C'}/></button>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between gap-4'>
                  {
                    USER_FEEDBACKS?.map((item, index) => {
                      return (
                        <div className='border border-[ #E7EAEC] rounded-md p-6 bg-white' key={index}>
                          <div className='flex items-start justify-between gap-2'>
                            <div>
                              <NextImage className='rounded-md' alt='Hamburger' src={item?.user?.image_data?.uri} width={60} height={60} />
                              <div className='text-lg font-semibold mt-1'>{item?.user?.fullName}</div>
                            </div>
                            <div>
                              <div className='flex items-center gap-1'>
                                {
                                  
                                  USER_FEEDBACK_HELPER_ARR?.map((helperItem, index) => {
                                      console.log(item?.rating, (index+1)*2, (index+1)*2 <= item?.rating)
                                      if((index+1)*2 <= item?.rating) {
                                        return (<NextImage alt='Hamburger' src='/images/full_star.png' width={20} height={20} />)
                                      }
                                      else if((index+1)*2 > item?.rating+1) {
                                        return (<NextImage alt='Hamburger' src='/images/empty_star.png' width={20} height={20} />)
                                      }
                                      else {
                                        return (<NextImage alt='Hamburger' src='/images/half_star.png' width={20} height={20} />)
                                      }
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          <div className='text-md font-light text-[#133240] mt-1'>{item?.feedback}</div>
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
    </>
  );
  return ( 
    <div className='container'>
      
      <main style={{backgroundImage: `url("/images/background-light.png")`}}
            className='bg-contain bg-center bg-repeat-y relative'>
        {/*<Head>*/}
        {/*  <title>Hi</title>*/}
        {/*</Head>*/}  
        <div className={`sticky top-0 inset-x-0 p-4 z-10 ${moved?'bg-black md:bg-opacity-[0.8]': 'bg-transparent'}`}>
          <div className='sticky top-0'>
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 justify-start items-center bg-opacity-1'>
                <NextImage alt='Logo' src={moved?'/images/logo-light.webp': '/images/logo-dark.webp'} width={54} height={54} className='rounded-md'/>
                {!moved && <div
                  className='font-trakya text-dark font-light text-xl md:text-4xl tracking-wide cursor-default'>Bitcoincierge
                </div>}
              </div>
              <div className={`h-16 w-16 rounded-lg flex justify-center items-center ${moved?'bg-black':''} cursor-pointer`} onClick={toggleSidebar}>
                <NextImage alt='HAmburger' src='/images/hamburger.svg' width={32} height={16} />
              </div>
            </div>
          </div>
        </div>
        <section className='pt-0 mx-auto'>
          <div className='mx-6 md:mx-8'>
            <div
              className='layout relative flex flex-col items-center justify-center py-6 text-center leading-loose px-3 md:px-auto'
              style={{minHeight: 'calc(100vh - 96px)'}}>
              <div
                className='flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between w-full gap-4'>
                <div
                  className='flex-1 text-4xl mlg:text-[42px] mgl:text-[44px] lxl:text-[48px] xl:text-6xl font-polysans font-bold text-yellow-900 tracking-wide text-center md:text-left w-full md:w-auto'>Bitcoin education made simple
                </div>
                <div style={{backgroundImage: `url("/images/new_hero.png")`}}
                     className='flex-1 bg-contain bg-center bg-no-repeat h-[180px] lg:h-[390px] w-[200px] md:w-[180px] lg:w-[220px] lxl:w-[240px] rounded-lg'>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-white px-6 md:px-16 py-16 md:py-[10rem]  font-content mx-auto' id='client-section'>
          <div className='px-0 md:px-16'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-4'>
              <div className='text-kobicha text-2xl font-semibold w-full md:w-auto text-center md:text-left'>Powered
                by
              </div>
              {
                PARTNER_DATA?.map((item, index) => {
                  return (
                    <div key={index}
                         className='flex flex-col justify-between items-center'>
                      <NextImage
                        className='flex-1 flex justify-center items-center min-h-[60px]'
                        alt={item?.image_data?.alt_text}
                        src={item?.image_data?.uri}
                        width={166}
                        height={60}/>
                      {/*<div className='text-xs text-grabniteGrey font-light text-center mt-1'>{item?.description}</div>*/}
                    </div>
                  )
                })
              }
              <div className='text-md text-kobicha font-normal'>and more...</div>
            </div>
          </div>
        </section>
        <section className='bg-opacity-99 px-6 md:px-16 py-16 font-content mx-auto' id='mentor-section' style={{background: "#f8f7f2"}}>
          <div className='px-0 md:px-8 lg:px-10'>
            <div className=" mt-2 mb-8 md:mb-12">
              <div className="text-xl sm:text-2xl lg:text-4xl xl:text-[42px] font-bold text-slate-900 text-center">Meet The Mentors</div>
              <div className="text-md md:text-xl lg:text-2xl font-normal text-slate-900 mt-4 text-center">Bitcoiners, trusted by savvy investors for their Bitcoin needs</div>
            </div>
              {/* <div className="w-6 h-6 md:w-12 md:h-12 flex justify-center items-center bg-neutral-600 bg-opacity-25 rounded-full cursor-pointer" onClick={onLeftNavClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128" id="arrow-left">
                  <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M74.3335 42.3334L58.657 58.0098C55.5328 61.134 55.5328 66.1994 58.657 69.3236L74.3335 85"></path>
                </svg>
              </div> */}
              <div className='grid auto-cols-[200px] overflow-auto justify-between items-center' >
                {
                  renderTeamItems()
                }
              </div>
              {/* <div className="w-6 h-6 md:w-12 md:h-12 flex justify-center items-center bg-neutral-600 bg-opacity-25 rounded-full cursor-pointer" onClick={onRightNavClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128" id="arrow-right">
                  <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M53 42.3334L68.6765 58.0098C71.8007 61.134 71.8007 66.1994 68.6765 69.3236L53 85"></path>
                </svg>
              </div> */}
            {/*<div className='text-xs text-grabniteGrey font-light text-center mt-1 p-4 hidden lg:block w-full'>{selectedDescription}</div>*/}
          </div>
        </section>
        <section className='font-content mx-auto px-6 md:px-16'>
          <div className='px-6 md:px-16'>
            <div
              className='relative flex flex-col md:flex-row min-h-screen items-center justify-center py-12 text-center leading-loose gap-8'>
              <div className='flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-between'>
                <div
                  className='text-lg sm:xl md:text-2xl lg:text-4xl font-normal text-kobicha text-center md:text-left max-w-full md:max-w-md'>Be
                  a part of our thriving
                </div>
                <div
                  className='text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-bold text-kobicha text-center md:text-left max-w-full md:max-w-md mt-2'>Bitcoiners
                  community
                </div>
                <div
                  className='text-md md:text-lg lg:text-xl font-normal text-kobichaLight text-left max-w-full md:max-w-md mt-6 tracking-wide '>Become
                  part of a growing community of individuals who invest in the markets to grow theirwealth over time.
                </div>
              </div>
              <div className='flex flex-col flex-wrap items-center justify-between w-full px-0 md:px-6 gap-12 '>
                {
                  COMMUNITY_DATA?.map((item, index) => {
                    return (
                      <Link href={item?.cta?.action?.data?.uri} target="_blank" key={index}
                            className='bg-kobicha rounded-2xl p-8 flex-1 w-full'>
                        <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
                          <div>
                            <div
                              className='h-10 w-10 rounded-full bg-bone flex justify-center items-center bg-opacity-30 p-2'>
                              <NextImage alt={item?.icon?.alt_text} src={item?.icon?.uri} width={40} height={40}/>
                            </div>
                            <div className='text-bone text-xs font-light mt-2'>{item?.title}</div>
                          </div>
                          <div className=''>
                            <div className='text-bone text-5xl font-bold'>{item?.countString}</div>
                            <div
                              className='mt-12 text-bone text-sm border-b border-b-bone flex justify-start items-center gap-1'>
                              {item?.cta?.title}
                              <RiArrowRightUpLine/>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </section>
        <section className='bg-black font-content mx-auto' id='feature-section'>
          <div className='py-16 mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between'>
            <div className='flex-1 flex items-center justify-center p-6'>
              <div>
                <div
                  className='text-xl sm:text-2xl lg:text-4xl xl:text-[42px] leading-loose font-normal text-white max-w-lg tracking-wide'>To
                  start preserving &
                  multiplying your wealth
                  now!
                </div>
                {/*<div className='text-md md:text-xl lg:text-2xl font-normal text-grabniteGrey max-w-md mt-4'>{card?.description}</div>*/}

                {/*<div className='text-white text-2xl md:text-4xl font-normal max-w-sm md:max-w-md tracking-wide leading-relaxed'>*/}
                {/*</div>*/}
                <div className='flex justify-start items-center mt-4'>
                  <div
                    className='inline-flex justify-start items-center gap-4 text-white rounded-3xl border border-white p-2 tracking-wider mt-4 cursor-pointer'>
                    <div className='font-light text-md md:text-lg text-white '>
                      <Link href={'#mentor-section'}>
                        Contact Mentors Now
                      </Link>
                    </div>
                    <div className='w-6 h-6 bg-white rounded-full flex items-center justify-center'>
                      <RiArrowRightLine className='text-black'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 flex justify-center items-center relative'>
              <NextImage
                alt='Contact us'
                src='/images/contact-us.png'
                width={282}
                height={380}/>
            </div>
          </div>
        </section>
        <section className='bg-pumpkin py-8 md:py-10 mx-auto'></section>
        <section className='bg-black font-content mx-auto' id='feature-section'>
          <div className='py-16 mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between'>
            <div className='flex-1 flex items-center justify-center p-6'>
              <div className=''>
                {/*<NextImage alt={} src={}/>*/}
                <div className='flex gap-2 justify-start items-center'>
                  <NextImage alt='Logo' src='/images/logo-light.webp' width={54} height={54} className='rounded-md'/>
                  <div className='font-trakya text-white font-light text-xl md:text-4xl tracking-wide'>Bitcoincierge</div>
                </div>
                <div className='text-white text-opacity-70 text-md md:text-lg font-normal max-w-sm md:max-w-md pr-12 mt-2'>
                  Join the rank of Savvy Investor who trust us for their Bitcoins needs.
                </div>
                <div className="relative mt-6 max-w-sm">
                  <div className="absolute top-4 left-3">
                    <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    className="block min-w-full pr-20 rounded-lg z-0 focus:shadow focus:outline-none bg-transparent text-white"
                    placeholder="Email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}/>
                  <div className="absolute top-2 right-2">
                    <button
                      disabled={email?.trim().length === 0}
                      className="p-[6px] text-eerieBlack text-xs font-semibold rounded-lg bg-white disabled:cursor-not-allowed"
                      onClick={()=>{console.log('Clicked'); addEmail();}}
                    >Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 flex justify-center items-center relative'>
              <div className=''>
                {/*<div className='flex-1'>*/}
                <div>
                  <div className='flex flex-col md:flex-row justify-start items-center gap-6 mt-8 md:mt-0'>
                    {
                      FOOTER_LINKS.map((item, index) => {
                        return (
                          <Link className='text-white' key={index} href={item?.uri} target="_blank">{item?.title}</Link>
                        )
                      })
                    }
                  </div>
                  <div
                    className='flex flex-col md:flex-row flex-nowrap md:flex-wrap justify-start items-center gap-4 mt-10'>
                    <div className='text-white text-opacity-60 text-sm tracking-wide'>Follow us on:</div>
                    <div className='flex justify-start items-center gap-4'>
                      {SOCIAL_MEDIA_DATA?.map((item, index) => {
                        return (
                          <Link key={index} href={item?.uri} target="_blank">
                            <NextImage
                              key={index}
                              alt={item?.image_data?.alt_text}
                              src={item?.image_data?.uri}
                              height={item?.image_data?.height}
                              width={item?.image_data?.width}/>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/*</div>*/}
              </div>
            </div>
          </div>
        </section>
        <section className='bg-black font-content mx-auto'>
          <div className='py-16 mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between'>
            <div className='mx-auto flex flex-col md:flex-row items-center justify-between mt-4'>
            </div>
          </div>
        </section>
        {/* <section className='bg-black border-t border-opacity-20 border-t-amber-50 py-6 font-content'
                 id='podcast-section'>
          <div className='text-white font-normal text-sm tracking-wide flex justify-center items-center'>
            © 2024 Bitcoincierge. All rights reserved
          </div>
        </section> */}
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
                              <Link key={index} href={item?.uri} target="_blank">
                                {item?.image_data?.uri}
                              </Link>
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
  );
}
