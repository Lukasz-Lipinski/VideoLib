import { BsEmojiSmile } from "react-icons/bs";

function Card({ profileName, kidSecurity, bgColor }) {
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
