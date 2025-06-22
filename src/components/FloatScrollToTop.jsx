import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function FloatScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!mounted || !isVisible) return null

  return createPortal(
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 rounded-full p-3 shadow-lg bg-white hover:bg-gray-100 border-1 border-yellow-700 cursor-pointer"
    >
      <ArrowUp className="size-5" />
    </button>,
    document.body
  )
}
