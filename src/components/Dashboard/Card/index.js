import { useMemo } from "react";
import { useRouter } from "next/router";

import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";

import CardAssignedToDelete from "./CardAssignedToDelete";

function Card({ profileName, kidSecurity, bgColor, isManagePanel }) {
  const router = useRouter();

  const currClassName = useMemo(() => {
    if (isManagePanel) {
      return "icon-delete";
    }
    return "icon";
  }, [isManagePanel]);

  const routeHandler = () => {
    router.push({
      pathname: "/dashboard/userAccount/[profileName]",
      query: { profileName },
    });
  };

  if (kidSecurity) {
    return isManagePanel ? (
      <CardAssignedToDelete
        currClassName={currClassName}
        bgColor={bgColor}
        profileName={profileName}
      />
    ) : (
      <>
        <div
          onClick={routeHandler}
          className={currClassName}
          style={{ backgroundColor: bgColor }}
        >
          <MdOutlineChildCare />
        </div>
        {profileName && <p className="profileName">{profileName}</p>}
      </>
    );
  }

  return isManagePanel ? (
    <CardAssignedToDelete
      currClassName={currClassName}
      bgColor={bgColor}
      profileName={profileName}
    />
  ) : (
    <>
      <div
        onClick={routeHandler}
        className={currClassName}
        style={{ backgroundColor: bgColor }}
      >
        <BsEmojiSmile />
      </div>
      {profileName && <p className="profileName">{profileName}</p>}
    </>
  );
}

export default Card;
