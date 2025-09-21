import Image from "next/image"

const ReachdLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/reachd-logo.png"
      alt="Reach'd Marketing & Ads - Ads Made Easy"
      width={200}
      height={80}
      className={className}
      priority
    />
  )
}

export default ReachdLogo
