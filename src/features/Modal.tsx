import GenerateImage from "assets/Generate.svg"
import Insert from "assets/Insert.svg"
import RegenerateImage from "assets/Regenerate.svg"
import { useState } from "react"

interface ModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const SAMPLE_RESPONSE =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  const [isGenerated, setIsGenerated] = useState(false)
  const [input, setInput] = useState("")
  const [query, setQuery] = useState("")

  const handleQuery = (e: any) => {
    e.preventDefault()
    if (input.trim() !== "") {
      setQuery(input)
      setInput("")
      setIsGenerated(true)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const handleInsert = () => {
    closeModal()
    const placeholder = document.querySelector(".msg-form__placeholder")
    const textarea = document.querySelector(".msg-form__contenteditable")
    placeholder?.remove()
    textarea.children[0].innerHTML = SAMPLE_RESPONSE
    setInput("")
    setQuery("")
    setIsGenerated(false)
  }
  const handleIsOpenCheck = () => {
    closeModal()
  }
  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          onClick={handleIsOpenCheck}>
          <div
            className="p-3 bg-[#F9FAFB] w-[350px] rounded-xl"
            onClick={handleModal}>
            {query && (
              <>
                <div className="flex justify-end">
                  <div className="p-2 bg-gray-200 max-w-[200px] flex justify-end items-start rounded-md mb-3">
                    <p className="text-[#666D80] tracking-wider">{query}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="p-2 bg-blue-100 max-w-[300px] flex justify-start items-start rounded-md mb-3">
                    <p className="text-[#666D80] tracking-wider">
                      {SAMPLE_RESPONSE}
                    </p>
                  </div>
                </div>
              </>
            )}
            <input
              placeholder="Your prompt"
              type="text"
              className="rounded-md  border-2 border-gray-300 w-full mb-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex justify-end">
              {isGenerated ? (
                <div className="flex gap-2">
                  <button
                    className="h-10 w-24  rounded text-gray-500 text-semibold border-2 border-gray-400"
                    onClick={() => handleInsert()}>
                    <span className="flex justify-center items-center gap-2">
                      <img src={Insert} alt="image" className="h-3 w-3" />
                      <p className="tracking-wider font-semibold">Insert</p>
                    </span>
                  </button>
                  <button className="h-10 w-36 bg-blue-500 rounded text-white">
                    <span className="flex justify-center items-center gap-2">
                      <img
                        src={RegenerateImage}
                        alt="image"
                        className="h-5 w-5"
                      />
                      <p className="tracking-wider font-semibold">Regenerate</p>
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    setIsGenerated(!isGenerated)
                    handleQuery(e)
                  }}
                  className="h-10 w-32 bg-blue-500 rounded text-white "
                  disabled={!input}>
                  <span className="flex justify-center items-center gap-2">
                    <img src={GenerateImage} alt="image" className="h-5 w-5" />
                    <p className="tracking-wider font-semibold">Generate</p>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
