import Link from "next/link.js";

import IconGithub from "@/components/Icons/Github";
import IconLinkedin from "@/components/Icons/LinkedIn";

const Footer = () => {
  return (
    <footer className="mb-16 mt-20 flex flex-col items-center justify-center gap-4 text-center print:hidden">
      <div className="flex justify-center gap-4">
        <Link
          href="https://github.com/seunghowhite"
          target="_blank"
        >
          <IconGithub
            className="fill-foreground transition hover:fill-blue-600"
            height={30}
            width={30}
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/eatstone"
          target="_blank"
        >
          <IconLinkedin
            className="fill-foreground transition hover:fill-blue-600"
            height={30}
            width={30}
          />
        </Link>
      </div>
      <div>
        © 2024. <span className="font-semibold">Seung Ho White</span> all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
