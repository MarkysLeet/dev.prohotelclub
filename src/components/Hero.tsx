import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[1080px] mt-[85px]">

      {/*
        Hero Background Image:
        Starts at X=576, width 1905, height 995, Y=85 (which is 0 relative to this section).
      */}
      <div
        className="absolute top-0 z-0 h-[995px] overflow-hidden"
        style={{ left: '576px', width: '1905px' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1542314831-c6a4d1409e50?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Container 1920px max width for coordinates */}
      <div className="relative z-10 w-full max-w-[1920px] h-[995px] mx-auto">

        {/* Left Block: Y=339 from top of page, so 339-85 = 254 from top of Hero */}
        <div
          className="absolute flex flex-col items-start animate-fade-in"
          style={{ top: '254px', left: '52px', width: '869px' }}
        >
          <h1 className="font-moniqa text-[120px] text-primary-text leading-[0.85] tracking-tight">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[24px] text-primary-text leading-[1.4] mt-[161px]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-[44px] px-[40px] py-[15px] border border-evergreen-forest text-evergreen-forest font-century-gothic text-[24px] rounded-xl hover:bg-evergreen-forest hover:text-soft-sand transition-all duration-200 cinematic-easing">
            Подробнее о нас
          </button>
        </div>

        {/* Hotel Info Card: X=1020, Y=725 from top of page -> 725-85 = 640 from top of Hero */}
        <div
          className="absolute animate-fade-in-delayed flex items-end justify-end"
          style={{
            top: '640px',
            left: '1020px',
            width: '900px',
            height: '356px',
          }}
        >
          {/* SVG Background Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="900" height="357" viewBox="0 0 900 357" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M899.929 0L899.646 6.06825C899.747 27.837 877.266 71.3744 786.532 71.3744H300.266C262.001 72.2247 185.47 96.3743 185.47 186.17V189.742V296.374C185.47 320.543 158.369 356.547 80.8181 356.547C3.2671 356.547 -5.5163 351.978 2.30683 356.547H80.8181H695.054H899.427L900 0H899.929Z" fill="#F6EEE1"/>
            </svg>
          </div>

          {/* Content Layer (positioning based on text relative coordinates)
              The text inside card:
              "Тэги" Y: 889 (absolute) -> 889 - 725 = 164 from top of card.
              "Название" Y: 828 -> 828 - 725 = 103 from top of card.
              "Кнопка" Y: 981 -> 981 - 725 = 256 from top of card.
          */}
          <div className="relative z-10 w-full h-full flex flex-col items-end pr-[49px]">
            {/* Название отеля */}
            <h2
              className="absolute font-moniqa text-[50px] text-primary-text leading-none text-right"
              style={{ top: '103px', right: '49px' }}
            >
              Название отеля
            </h2>

            {/* Теги */}
            <div
              className="absolute flex gap-[20px] justify-end"
              style={{ top: '164px', right: '49px' }}
            >
              {["Семейный", "Всё включено", "16+"].map((tag) => (
                <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                  <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Описание */}
            <p
              className="absolute font-century-gothic text-[24px] text-primary-text leading-snug text-right max-w-[400px]"
              style={{ top: '204px', right: '49px' }} // 929 - 725 = 204px
            >
              Короткое описание отеля, локации, преимуществ
            </p>

            {/* Action */}
            <button
              className="absolute w-[283px] h-[53px] group focus:outline-none rounded-[26px]"
              style={{ top: '256px', right: '49px' }} // 981 - 725 = 256px
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
