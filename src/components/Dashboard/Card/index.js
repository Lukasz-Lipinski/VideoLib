import Link from "next/link";
import { useMemo } from "react";

import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";
import { ImCross } from "react-icons/im";

function Card({ profileName, kidSecurity, bgColor, isManagePanel }) {
  const deleteProfileHandler = () => {
    const profileData = {
      email,
      profileName,
    };

    fetch("/api/update/delete-profile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
  };

  const currClassName = useMemo(() => {
    if (isManagePanel) {
      return "icon-delete";
    }
    return "icon";
  }, [isManagePanel]);

  if (kidSecurity) {
    return isManagePanel ? (
      <div onClick={deleteProfileHandler}>
        <div className={currClassName} style={{ backgroundColor: bgColor }}>
          <ImCross />
        </div>
        {profileName && <p className="profileName">{profileName}</p>}
      </div>
    ) : (
      <Link
        href={{
          pathname: "/dashboard/userAccount/[profileName]",
          query: { profileName },
        }}
      >
        <a>
          <div className={currClassName} style={{ backgroundColor: bgColor }}>
            <MdOutlineChildCare />
          </div>
          {profileName && <p className="profileName">{profileName}</p>}
        </a>
      </Link>
    );
  }

  return isManagePanel ? (
    <div onClick={deleteProfileHandler}>
      <div className={currClassName} style={{ backgroundColor: bgColor }}>
        <ImCross />
      </div>
      {profileName && <p className="profileName">{profileName}</p>}
    </div>
  ) : (
    <Link
      href={{
        pathname: "/dashboard/userAccount/[profileName]",
        query: { profileName },
      }}
    >
      <a>
        <div className={currClassName} style={{ backgroundColor: bgColor }}>
          <BsEmojiSmile />
        </div>
        {profileName && <p className="profileName">{profileName}</p>}
      </a>
    </Link>
  );
}

export default Card;
