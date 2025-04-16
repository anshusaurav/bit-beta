/* eslint-disable react/display-name */
import React from 'react'

interface Props {
  cardElements: any
  id?: string
  className: string
}

type Ref = HTMLDivElement

const CarouselScroll = React.forwardRef<Ref, Props>(
  ({ cardElements, id, className }, ref): JSX.Element => {
    return (
      <div
        className={`no-scrollbar flex ${className} overflow-x-auto w-full scroll-smooth`}
        ref={ref}
        id={id}
      >
        {cardElements}
      </div>
    )
  },
)

export default CarouselScroll
