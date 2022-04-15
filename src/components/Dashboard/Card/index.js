import Link from "next/link";
import { useMemo } from "react";

import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";

import CardAssignedToDelete from "./CardAssignedToDelete";

function Card({ profileName, kidSecurity, bgColor, isManagePanel }) {
  const currClassName = useMemo(() => {
    if (isManagePanel) {
      return "icon-delete";
    }
    return "icon";
  }, [isManagePanel]);

  if (kidSecurity) {
    return isManagePanel ? (
      <CardAssignedToDelete
        currClassName={currClassName}
        bgColor={bgColor}
        profileName={profileName}
      />
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
    <CardAssignedToDelete
      currClassName={currClassName}
      bgColor={bgColor}
      profileName={profileName}
    />
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
