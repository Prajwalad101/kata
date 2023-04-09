import Image from 'next/image';
import Link from 'next/link';
import logoImg from 'public/favicon.ico';

function Logo() {
  return (
    <Link href="/">
      <a className="flex gap-3">
        <Image
          src={logoImg}
          width={30}
          height={30}
          alt="logo"
          objectFit="contain"
        />
        <div className="font-merriweather text-xl">Kata</div>
      </a>
    </Link>
  );
}

export default Logo;
