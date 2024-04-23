import Editproject from "@/components/Editproject";
// import dynamic from "next/dynamic";
import React from "react";

// const DynamicEditProject = dynamic(async () => import("@/components/Editproject"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

const Page = ({ params }) => {
  const projectId = params.id;
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <h1 className='text-[#755BB4] text-[24px] font-[600] mb-3 sticky top-0 dark:bg-black bg-white'>
        Edit Project -
      </h1>
      {/* <DynamicEditProject projectId={projectId} /> */}
      <Editproject projectId={projectId} />
    </div>
  );
};

export default Page;