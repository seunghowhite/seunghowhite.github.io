import Link from "next/link.js";

const Footer = () => {
  // ** Footer Link List
  const linkList = [
    { to: "COMMUNITY_PRIVACY", page: "개인정보 처리방침" },
    { to: "COMMUNITY_TERMS", page: "이용약관" },
    { to: "COMMUNITY_QUESTION", page: "문의하기" },
  ];

  return (
    <footer className="text-White bg-CdmBlack h-60 relative -translate-y-full ">
      <div className="under_line_gray">
        <div className="post">
          <div className="flex h-20 items-center">
            {linkList.map((nav, index) => {
              return (
                <div key={nav.to}>
                  <Link
                    href={nav.to}
                    className={`hover:underline text-sm  ${
                      index === 0
                        ? "font-extrabold pr-2 sm:pr-4"
                        : "px-2 sm:px-4 border-l border-l-White "
                    }`}
                  >
                    {nav.page}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 post flex lg:flex-row flex-col bg-CdmBlack">
        <h2 className="mr-9 text-DarkGray">데이터 중심병원</h2>
        <div className="text-sm text-LightGray">
          <div className="flex lg:flex-row flex-col">
            <p>데이터 중심 병원</p>
            <p>
              (부산대학교병원, 양산부산대학교병원, 경북대학교병원, 칠곡경북대학교병원,
              전남대학교병원, 화순전남대학교병원)
            </p>
          </div>
          <p>Email:info@megabridge.co.kr</p>
          <p>Copyright &copy; 데이터중심병원. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
