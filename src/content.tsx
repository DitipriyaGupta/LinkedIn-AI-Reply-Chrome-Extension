import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { CountButton } from "~features/CountButton"
import Modal from "~features/Modal"

import AiIcon from "../assets/AI.svg"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isFocus, setIsFocus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleFocus = () => {
    const textarea = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLTextAreaElement
    setIsFocus(true)
    const container = document.createElement("div")
    container.className = "ai-icon"
    container.setAttribute("style", "position:absolute; bottom:0; right:0rem;")
    const imgElement = document.createElement("img")
    imgElement.src = AiIcon
    imgElement.alt = "ai-icon"
    imgElement.setAttribute(
      "style",
      "width: 32px; height: 32px; cursor:pointer;"
    )
    container.addEventListener("click", () => {
      setIsOpen(true)
    })
    container.appendChild(imgElement)
    textarea?.appendChild(container)
  }

  const handleBlur = () => {
    const textarea = document.querySelector(".msg-form__contenteditable")
    const container = textarea?.querySelector(".ai-icon")
    container?.remove()
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const textarea = document.querySelector(".msg-form__contenteditable")
      if (textarea) {
        textarea.addEventListener("focus", handleFocus)
        textarea.addEventListener("blur", handleBlur)
        clearInterval(intervalId)
      }
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return isFocus ? (
    <div className="w-full">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  ) : null
}

export default PlasmoOverlay
