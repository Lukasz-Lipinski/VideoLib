import Link from "next/link";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";

function Card({ profileName, kidSecurity, bgColor }) {
  if (kidSecurity) {
    return (
      <Link
        href={{
          pathname: "/dashboard/userAccount/[profileName]",
          query: { profileName },
        }}
      >
        <a>
          <div className="icon" style={{ backgroundColor: bgColor }}>
            <MdOutlineChildCare />
          </div>
          <p className="profileName">{profileName}</p>
        </a>
      </Link>
    );
  }

  return (
    <Link
      href={{
        pathname: "/dashboard/userAccount/[profileName]",
        query: { profileName },
      }}
    >
      <a>
        <div className="icon" style={{ backgroundColor: bgColor }}>
          <BsEmojiSmile />
        </div>
        <p className="profileName">{profileName}</p>
      </a>
    </Link>
  );
}

export default Card;
