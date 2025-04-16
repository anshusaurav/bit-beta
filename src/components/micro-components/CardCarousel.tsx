import React, { useRef, useState } from 'react'
// import type { ImageCarouselData } from '@pageGenesis/types/Widget/data'
import Image from 'next/image'
import CarouselScroll from '@/components/micro-components/CarouselScroll'
type ImageCarouselData = {
  cards: Array<{
    image_data: ImageData
  }>
  image_data: ImageData
  label: string
  title: string
}
type Props = {
  data: ImageCarouselData
}

const ImageCarousel = ({ data }: Props) => {
  const { label = '', title = '', cards = [], image_data: imageData } = data
  const cardContainerRef = useRef<HTMLDivElement>(null)

  const [continueScroll, setContinueScroll] = useState<boolean>(true)

  const cardElements = cards?.map((card: any, index: number) => {
    const { image_data } = card
    const { url, alt_text } = image_data || {}
    return (
      <div
        className={`min-w-full snap-center`}
        key={index}
        id={`imagecarousel-card-${index}`}
        data-testid='imagecarousel'
        onMouseEnter={() => {
          setContinueScroll(false)
        }}
        onMouseLeave={() => {
          setContinueScroll(true)
        }}
      >
        <div className='md:px-8 md:pb-8 px-4 pb-4 flex flex-col justify-between h-full'>
          <Image src={url} alt={alt_text} className='min-w-full h-full' width={200} height={200} />
        </div>
      </div>
    )
  })

  return (
    <div className='container flex md:flex-row flex-col shadow-imagecarouselHeaderSection shrink-0'>
      {/*<div className={`md:flex md:w-4/12 items-center hidden`}>*/}
      {/*  <div className='flex flex-col'>*/}
      {/*    <div className='shrink-0 text-positive text-base non-italic font-extrabold tracking-8 pb-6'>*/}
      {/*      {label}*/}
      {/*    </div>*/}
      {/*    <div className=' shrink-0 text-primary max-sm:text-base text-xxl non-italic font-bold pb-14'>*/}
      {/*      {title}*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <ScrollIndicator*/}
      {/*      target={cardContainerRef}*/}
      {/*      render={(scrollProgress: number) => (*/}
      {/*        <DotsForCarousel*/}
      {/*          scrollProgress={scrollProgress}*/}
      {/*          numberOfCards={cardElements?.length || 0}*/}
      {/*          cardIdPrefix={'imagecarousel-card-'}*/}
      {/*          customClass={'justify-start'}*/}
      {/*          ref={cardContainerRef}*/}
      {/*          setContinueScroll={setContinueScroll}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*      addAutoScroll={true}*/}
      {/*      continueScroll={continueScroll}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className='shrink-0 text-positive text-base non-italic font-extrabold tracking-8 md:hidden block pb-2'>
        {label}
      </div>
      <div className='text-secondary text-xl non-italic font-bold md:hidden block'>{title}</div>
      <div className='gradient_background bg-cover flex justify-between items-center mt-7'>
        <CarouselScroll
          cardElements={cardElements}
          ref={cardContainerRef}
          id='imageCarouselContainer'
          className='snap-mandatory snap-x'
        />
      </div>
      {/*<div className='md:hidden flex justify-center items-center pt-4'>*/}
      {/*  <ScrollIndicator*/}
      {/*    target={cardContainerRef}*/}
      {/*    render={(scrollProgress: number) => (*/}
      {/*      <DotsForCarousel*/}
      {/*        scrollProgress={scrollProgress}*/}
      {/*        numberOfCards={cardElements?.length || 0}*/}
      {/*        cardIdPrefix={'imagecarousel-card-'}*/}
      {/*        customClass={'justify-start'}*/}
      {/*        ref={cardContainerRef}*/}
      {/*        setContinueScroll={setContinueScroll}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  )
}

export default ImageCarousel
