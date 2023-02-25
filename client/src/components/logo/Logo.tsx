import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <a>
        {/* <Image
          src={LogoImg}
          width={60}
          height={50}
          alt="logo"
          objectFit="contain"
        /> */}
        <div className="font-merriweather text-xl">Kata</div>
      </a>
    </Link>
  );
}

export default Logo;
