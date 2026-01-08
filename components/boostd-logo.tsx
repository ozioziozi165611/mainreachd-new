import Image from "next/image"

const BoostdLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/Boost_d Logo Transparent.png"
      alt="Boost'd Marketing - Boost your brand."
      width={280}
      height={70}
      className={`object-contain ${className}`}
      priority
    />
  )
}

export default BoostdLogo
