
import { useState } from "react";
import GenerateImage from "assets/Generate.svg"
interface ModalProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal : React.FC<ModalProps>  = ({isOpen,setIsOpen}) => {
  const SAMPLE_RESPONSE="Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  const [isGenerated, setIsGenerated] = useState(false);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const handleQuery = (e : any) => {
    e.preventDefault();
    setQuery(input);
    setInput("");
  };

 const closeModal=()=>{
  setIsOpen(false)

 }
 const handleInsert=()=>{
  closeModal()
  const textarea = document.querySelector(".msg-form__contenteditable");
  textarea.children[0].ariaLabel=""
  console.log(textarea)
  console.log(textarea.children[0])
  textarea.children[0].innerHTML=SAMPLE_RESPONSE
  
  setInput("")
    setIsGenerated(false)
  
 }
 const handleIsOpenCheck=()=>{
  isOpen?closeModal():null
 }
  return (
    <>
  {isOpen && ( <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="p-3 bg-white w-[350px] rounded-md">
      {query && (
        <>
           <div className="flex justify-end">
           <div className="p-2 bg-gray-200 w-[300px] flex justify-end items-start rounded-md mb-3">
             <p className="text-[#666D80]">{query}</p>
           </div>

           </div>
           <div className="flex justify-start">
           <div className="p-2 bg-blue-100 w-[400px] flex justify-start items-start rounded-md mb-3">
             <p className="text-[#666D80]">{SAMPLE_RESPONSE}</p>
           </div>

           </div></>
        ) }
       
          <input
            placeholder="Your prompt"
            type="text"
            className="rounded-md p-2 border-2 border-gray-300 w-full mb-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex justify-end">
            {isGenerated ? (
              <div className="flex gap-2">
                <button className="h-8 w-24  rounded text-gray-500 text-semibold border-2 border-gray-400" onClick={()=>handleInsert()}>
                  Insert
                </button>
                <button className="h-8 w-24 bg-blue-500 rounded text-white">
                  Regenerate
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {setIsGenerated(!isGenerated) 
                    handleQuery(e)
                 }}

                className=" h-8 w-24 bg-blue-500 rounded text-white flex tracking-wide"
              >
                <span><img src={GenerateImage} alt="image" className="h-5 w-5"/></span>Generate
              </button>
            )}
          </div>
        
       
      </div>
    </div>)}
    </>
  );
};

export default Modal;
