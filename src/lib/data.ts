export const PAGES: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
]

export const FENCING_SERVICES: {
  title: string
  href: string
  cardImg: string
}[] = [
  {
    title: "Wood Fences",
    href: "/wood-fences",
    cardImg: "/fences/wood/fence-1",
  },
  {
    title: "Metal Fences",
    href: "/metal-fences",
    cardImg: "/fences/metal/metal-1",
  },
  {
    title: "Automatic Gates",
    href: "/automatic-gates",
    cardImg: "/gates/gate-1",
  },
  {
    title: "Fence & Garage Door Staining",
    href: "/fence-and-garage-door-stain",
    cardImg: "/garages/garage-1",
  },
]

export const OUTDOOR_LIVING_SERVICES: {
  title: string
  href: string
  cardImg: string
}[] = [
  {
    title: "Arbors & Pergolas",
    href: "/arbors-and-pergolas",
    cardImg: "/pergolas/pergola-6",
  },
  {
    title: "Patio Covers",
    href: "/patio-covers",
    cardImg: "/patio-cover-1",
  },
]

export const PAINTING_SERVICES: {
  title: string
  href: string
  cardImg: string
}[] = [
  {
    title: "Interior Painting",
    href: "/interior-painting",
    cardImg: "/paint/ex-paint-5",
  },
  {
    title: "Exterior Painting",
    href: "/exterior-painting",
    cardImg: "/paint/ex-paint-2",
  },
]

export const ALL_SERVICES = FENCING_SERVICES.concat(
  OUTDOOR_LIVING_SERVICES,
  PAINTING_SERVICES
)

export const REVIEWS: {
  id: number
  text: string
  rating: number
  name: string
}[] = [
  {
    id: 1,
    rating: 5,
    name: "Broderick N.",
    text: "Highly recommend their service! Was responsive and professional and able to work with my busy schedule. Aj had great communication with me the whole time and made me feel appreciated and not like a number. Was able to make my older fence look like it was brand new!",
  },
  {
    id: 2,
    rating: 5,
    name: "Stephanie G.",
    text: "Castle Hills Stain & Restoration is a company that goes above and beyond for the customers. The professionalism is superb and the owner of the company listens to the client needs. The owner, Alexander, prioritizes the client and tries to make the job as customized as possible. I felt heard and taken care of! Highly recommend Castle Hills Stain & Restoration.",
  },
  {
    id: 3,
    rating: 5,
    name: "Bethany C.",
    text: "AJ went over and beyond to find the perfect stain for our new patio cover. He was very communicative and provided several stain samples and examples and made sure we felt comfortable with our choice. The project was started and completed promptly and we love how it turned out!",
  },
  {
    id: 4,
    rating: 5,
    name: "Alvah S.",
    text: "They just stained my fence and it looks absolutely amazing!!!!  The quality of stain was top tier and brought so much life back to my fence. What I appreciated the most was their attention to detail and care they took in my backyard. I had just remodeled my pool and decking so I was a little nervous about stain getting where it shouldn’t but they took all the necessary precautions. I would HIGHLY recommend Castle Hills Stain & Restoration!",
  },
  {
    id: 5,
    rating: 5,
    name: "Ryan S.",
    text: "Castle Hills Stain & Restoration did a great job repairing, power washing, and staining my fence. Quick and professional communication from start to finish. I highly recommend them to anyone looking to replace, repair, or stain their fences.",
  },
  {
    id: 6,
    rating: 5,
    name: "Ian F.",
    text: "AJ with Castle Hills Stain & Restoration has always executed our projects together at a high level. He has power washed and stained over 20,000 Square feet of fencing in the last few years for me. I have always received incredible compliments for our clients on the results of his service. I would highly recommend and encourage anyone in need of fence washing and  stain/paint to inquire about their services.",
  },
]
