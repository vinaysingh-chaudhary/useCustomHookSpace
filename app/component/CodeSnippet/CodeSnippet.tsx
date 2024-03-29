import SyntaxHighlighter  from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"; 
import Copytoclipboard from "./Buttons/Copytoclipboard";

interface CodeSnippetProps {
  primaryLang: string;
  hookname: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ primaryLang, hookname }) => {
  return (
    <div className="w-[95%] lg:w-full bg-black rounded-xl">
      <div className="flex justify-between items-center bg-code-dark rounded-lg text-white mb-1 p-2">
        <p>▸ {hookname}</p>

        <div className=" flex justify-between items-center gap-1 text-sm ">
          <Copytoclipboard primaryLang={primaryLang} />
        </div>
      </div>

      <SyntaxHighlighter
        language={"javascript"}
        style={atomOneDark}
        customStyle={{ backgroundColor: "#0E0E0E", borderRadius: 8 }}
        showLineNumbers
      >
        {primaryLang}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
