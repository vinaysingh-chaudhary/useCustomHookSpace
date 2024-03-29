import React from "react";
import { CodeSnippet } from '@/app/component/index'
import parseAndSerialize from "@/Helpers/parseAndSerialize";
import { hooks } from "@/static/hooks";


interface HookData {
  hookname: string;
  primarylang: string;
  description: string;
  toUseDescription: string;
  toUse: string;
  toUseCode: string;
}

interface PageParams {
  params: {
    slug: string;
  };
}


export function generateStaticParams() {
 return hooks.map((slug : string) => {
    return{
      slug
    }
  })
}

const page = async({ params }: PageParams): Promise<JSX.Element> => {
  try {    
    const raw = await fetch("https://usecustomhookspace.vercel.app/api/hook", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hookname: params?.slug }),
      next: {revalidate: 7200}
    });

    if (!raw.ok) { 
      throw new Error(`Failed to fetch hook: ${raw.statusText}`);
    }

    const data = await raw.json();
    const hookData : HookData  | undefined = data?.hook;
    
    if (!hookData) {
      throw new Error(`Invalid data format`);
    }

    const { hookname, primarylang, description, toUseDescription, toUse, toUseCode } = hookData;

    const serializedDescriptionOne = parseAndSerialize(description);
    const serializedDescriptionTwo = parseAndSerialize(toUseDescription);

    return (
      <div className="w-full h-full  flex flex-col items-center gap-14 overflow-y-scroll scroll-smooth text-white  pb-14 pt-6 lg:pr-4 ">
        <div className="w-full flex flex-col gap-4 text-theme-green px-6 lg:px-0">
          <h1 className="text-4xl"> ▸{hookname}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: serializedDescriptionOne }}
            className="text-lg text-desc-gray"
          />
        </div>

        <CodeSnippet primaryLang={primarylang} hookname={hookname} />

        {toUseDescription &&
         <div className="w-full flex flex-col gap-4 text-  px-6 lg:px-0">
            <h1 className="text-4xl">▸Using <span className="text-theme-green"> {hookname} </span>customhook</h1>
            <div
              dangerouslySetInnerHTML={{ __html: serializedDescriptionTwo }}
              className="text-lg text-desc-gray"
           />
          </div>
         }

        {toUseCode && <CodeSnippet primaryLang={toUseCode} hookname={toUse} />}
      </div>
    );

  } catch (err) {
    console.log(err);
    return (
      <div className=" w-full h-full flex justify-center items-center text-3xl text-white">
        {params.slug} hook is coming soon...
      </div>
    );
  }
};

export default page;
