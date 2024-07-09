import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { CountButton } from "~features/CountButton"

import AiIcon from "../assets/AI.svg"
import Modal from "~features/Modal"

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
  const[isOpen,setIsOpen]=useState(false)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const textarea = document.querySelector(
        ".msg-form__contenteditable"
      ) as HTMLTextAreaElement
      if (textarea) {
        textarea.addEventListener("focus", (e) => {
          setIsFocus(true)
          const container = document.createElement("div")
          container.className = "ai-icon"
          container.setAttribute(
            "style",
            "position:absolute; bottom:0; right:0rem;"
          )
          const imgElement = document.createElement("img")
          imgElement.src = AiIcon
          imgElement.alt = "ai-icon"
          imgElement.setAttribute(
            "style",
            "width: 32px; height: 32px; cursor:pointer;"
          )
          container.appendChild(imgElement)
          textarea?.appendChild(container)
          container.addEventListener("click",()=>{
            setIsOpen(true)
          })
        })
        observer.disconnect()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return isFocus ? <div className="w-full"><Modal /></div> : null
}

export default PlasmoOverlay
