export default function FloatingParticles() {
  return (
    <div className="particles">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}
