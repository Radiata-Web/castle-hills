import Image from "@/components/ui/optimized-image";

export default function Suppliers() {
  return (
    <div className="flex flex-row items-center max-h-16 gap-6 my-16 sm:gap-10 md:gap-12">
      <span className="hidden bg-zinc-200 w-full h-[1px] sm:block"></span>
      <Image
        src="/logos/wood-defender.png"
        alt="Wood Defender logo"
        width={220}
        height={113}
        className="w-220 ml-auto"
      />
      <Image
        src="/logos/afa.png"
        alt="American Fence Associate logo"
        width={180}
        height={113}
        className="w-180 mr-auto"
      />
      <span className="hidden bg-zinc-200 w-full h-[1px] sm:block"></span>
    </div>
  );
}
