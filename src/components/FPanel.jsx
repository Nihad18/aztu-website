import React from "react";
import d from "../assets/images/f_panel/distanttehsil.svg";
import f from "../assets/images/f_panel/fakulteler.svg";
import k from "../assets/images/f_panel/kitabxana.svg";
import oi from "../assets/images/f_panel/oi.svg";
import oa from "../assets/images/f_panel/onlaynapeliyasiya.svg";
import t from "../assets/images/f_panel/t.svg";
const FPanel = () => {
  const data = [
    { title: "Kitabxana", img: k },
    { title: "Fakültələr", img: f },
    { title: "Əcnəbi tələbələr", img: t },
    { title: "Onlayn imtahan", img: oi },
    { title: "Onlayn apelyasiya", img: oa },
    { title: "Distant təhsil", img: d },
  ];
  return (
    <div className='max-w-[1000px] flex justify-center items-center flex-wrap mx-auto my-10'>
      {data?.map((item, index) => {
        return (
          <div key={index} className="f-panel cursor-pointer w-[160px] h-[170px] flex justify-center items-center text-center flex-col border-l border-r">
            <div className="w-[55px] h-[50px]">
              <img className="f-panel-img" src={item.img} alt={item.img} />
            </div>
            <div className="text-xl f-panel-title">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FPanel;
