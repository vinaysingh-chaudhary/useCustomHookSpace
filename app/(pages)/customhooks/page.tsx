import Link from "next/link";
import { hooks } from "@/static/hooks";
import ListingCard from '../../component/ListingCards/ListingCards'

const page = () => {
  return (
    <div className="w-full h-full text-white overflow-y-auto">
      <div className="flex sm:flex-col md:flex-row flex-wrap w-full justify-center items-center lg:justify-start  gap-7 py-6">
        {hooks?.map((hook: any) => {
          return (
              <ListingCard hook={hook} key={hook}/>
          )})}
      </div>
    </div>
  );
};

export default page;
