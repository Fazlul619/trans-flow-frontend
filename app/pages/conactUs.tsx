import React from "react";

export function ContactUs (){
    return (
    <div className="max-w-5xl">
      <div className="absolute w-full h-screen ">
        <img className="w-full h-screen " src="/public/images/Contact.png" alt="" />
        <div className="relative -top-[600px] left-[200px] w-[487px]">
        <form className="">
            <div>
              <label className="block text-[#345485]">Full Name</label>
              <input type="text" placeholder="Your full name" className="w-full bg-white mt-2 p-2 h-14  rounded-lg text-black" />
            </div>
            <div className="mt-4">
              <label className="block text-[#345485]">Email</label>
              <input type="email" placeholder="example@gmail.com" className="w-full bg-white h-14 text-black mt-2 p-2  rounded-lg" />
            </div>
            <div className="mt-4">
              <label className="block text-[#345485]">Message</label>
              <textarea placeholder="Write message" className="w-full mt-2 p-2 h-[140px] text-black bg-white rounded-lg" rows={4}></textarea>
            </div>
            <button className="w-full bg-[#345485] text-white mt-4 p-2 rounded-lg hover:bg-blue-800">Submit</button>
        </form>
        </div>
      </div>
    </div>
    );
}