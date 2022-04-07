import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";

function Card({ profileName, kidSecurity, bgColor }) {
  if (kidSecurity) {
    return (
      <>
        <div className="icon" style={{ backgroundColor: bgColor }}>
          <MdOutlineChildCare />
        </div>
        <p className="profileName">{profileName}</p>
      </>
    );
  }

  return (
    <>
      <div className="icon" style={{ backgroundColor: bgColor }}>
        <BsEmojiSmile />
      </div>
      <p className="profileName">{profileName}</p>
    </>
  );
}

export default Card;
