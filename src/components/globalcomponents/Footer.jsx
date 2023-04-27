import React from "react";

const Footer = () => {
  return (
    <div className='text-white pt-10'>
      <div className='bg-sky-700 py-10 text-center text-lg'>
        <div>
          Created by
          <a
            className='mx-1 hover:text-sky-400 hover:border-b hover:border-b-sky-400'
            href='https://www.linkedin.com/in/nihad-balaki%C5%9Fiyev-544441213'
            target='_blank'
          >
            Nihad
          </a>
          and
          <a
            className='mx-1 hover:text-sky-400 hover:border-b hover:border-b-sky-400'
            href='https://www.linkedin.com/in/aykhan-shahsuvarov-59a314187'
            target='_blank'
          >
            Ayxan
          </a>
          .
        </div>
      </div>
      <div className='bg-sky-900 py-6'>
        <div className='container'>
          Copyright
          <span>&copy;</span>
          2023 Bütün Hüquqlar Qorunmur.
        </div>
      </div>
    </div>
  );
};

export default Footer;
