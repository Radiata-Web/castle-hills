import Image from "next/image"

export default function Suppliers() {
  return (
    <div className="flex flex-row items-center max-h-16 gap-6 my-8 sm:gap-10 md:gap-12">
      <span className="hidden bg-zinc-200 w-full h-[1px] sm:block"></span>
      <Image
        src="/logos/wood-defender.png"
        alt="Wood Defender logo"
        width={200}
        height={113}
        className="w-auto ml-auto max-w-250"
      />
      <Image
        src="/logos/afa.png"
        alt="American Fence Associate logo"
        width={345}
        height={113}
        className="w-52 mr-auto"
      />
      <span className="hidden bg-zinc-200 w-full h-[1px] sm:block"></span>
    </div>
  )
}
