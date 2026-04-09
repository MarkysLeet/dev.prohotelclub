import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full flex justify-center bg-soft-sand overflow-hidden h-[995px] mt-[85px]">

      {/*
        Main Container: strictly 1920px wide.
        Everything inside uses absolute positioning relative to this 1920px canvas,
        matching Figma coordinates exactly.
      */}
      <div className="relative w-[1920px] min-w-[1920px] h-[995px]">

        {/* Background Image: X=576, Y=0 (relative to hero), W=1905, H=995 */}
        <div
          className="absolute z-0"
          style={{ top: '0px', left: '576px', width: '1905px', height: '995px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1542314831-c6a4d1409e50?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Слайдер (точки): X=861, Y=1028 (relative to screen top = 1028 - 85 = 943px relative to Hero) */}
        <div
          className="absolute z-20 flex gap-2"
          style={{ top: '943px', left: '861px' }}
        >
          <div className="w-[12.5px] h-[12.5px] bg-white rounded-full border-2 border-evergreen-forest" />
          <div className="w-[12.5px] h-[12.5px] bg-white/50 rounded-full" />
          <div className="w-[12.5px] h-[12.5px] bg-white/50 rounded-full" />
        </div>

        {/* Left Block: Y=339 absolute -> 339 - 85 = 254px top */}
        <div
          className="absolute animate-fade-in text-left"
          style={{ top: '254px', left: '52px', width: '869px' }}
        >
          <h1 className="font-moniqa text-[120px] text-primary-text leading-[0.85] tracking-tight m-0 p-0">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          {/* Y=620 absolute -> 620 - 339 = 281 gap from top of block */}
          <p
            className="absolute font-century-gothic text-[24px] text-primary-text leading-[1.4] m-0 p-0 w-[644px]"
            style={{ top: '281px', left: '0px' }}
          >
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          {/* Button: Y=722 absolute -> 722 - 339 = 383 from top of block.
              But Figma says X: 171 relative to frame (171 - 52 = 119 from left of block)
          */}
          <button
            className="absolute flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[24px] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200"
            style={{ top: '383px', left: '119px', width: '281px', height: '53px' }}
          >
            Подробнее о нас
          </button>
        </div>

        {/* Hotel Info Card: X=1020, Y=725 absolute -> 725 - 85 = 640px top */}
        <div
          className="absolute animate-fade-in-delayed"
          style={{
            top: '640px',
            left: '1020px',
            width: '900px',
            height: '357px',
          }}
        >
          {/* SVG Background Layer */}
          <div className="absolute inset-0 z-0">
            <svg width="900" height="357" viewBox="0 0 900 357" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M899.929 0L899.646 6.06825C899.747 27.837 877.266 71.3744 786.532 71.3744H300.266C262.001 72.2247 185.47 96.3743 185.47 186.17V189.742V296.374C185.47 320.543 158.369 356.547 80.8181 356.547C3.2671 356.547 -5.5163 351.978 2.30683 356.547H80.8181H695.054H899.427L900 0H899.929Z" fill="#F6EEE1"/>
            </svg>
          </div>

          {/* Content inside card. Positioning relative to 1920px frame, minus card offset (X:1020, Y:640 relative to Hero) */}
          <div className="absolute inset-0 z-10 text-left">

            {/* Название: X=1671 -> 1671-1020 = 651 relative to card. Y=828 -> 828-725 = 103 */}
            <h2
              className="absolute font-moniqa text-[50px] text-primary-text leading-none m-0 p-0"
              style={{ top: '103px', left: '651px', width: '220px' }}
            >
              Название отеля
            </h2>

            {/* Тэги: X=1610 -> 1610-1020 = 590. Y=889 -> 889-725 = 164 */}
            <div
              className="absolute flex gap-[20px]"
              style={{ top: '164px', left: '590px', width: '281px' }}
            >
              {["Семейный", "Всё включено", "16+"].map((tag) => (
                <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                  <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Описание: X=1276 -> 1276-1020 = 256. Y=929 -> 929-725 = 204 */}
            <p
              className="absolute font-century-gothic text-[24px] text-primary-text leading-snug m-0 p-0"
              style={{ top: '204px', left: '256px', width: '615px' }}
            >
              Короткое описание отеля, локации, преимуществ
            </p>

            {/* Action: X=1610 -> 1610-1020 = 590. Y=981 -> 981-725 = 256 */}
            <button
              className="absolute group focus:outline-none rounded-[26px]"
              style={{ top: '256px', left: '590px', width: '281px', height: '53px' }}
            >
                <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[24px] font-normal tracking-wide">
                  Посмотреть детали
                </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
