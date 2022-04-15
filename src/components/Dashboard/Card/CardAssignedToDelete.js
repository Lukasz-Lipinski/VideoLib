import { useState } from "react";

import { useSession } from "next-auth/react";
import { ImCross } from "react-icons/im";

import { Snackbar } from "../../";

const CardAssignedToDelete = ({ profileName, bgColor, currClassName }) => {
  const [snackbarData, setSnackbarData] = useState({
    className: "",
    status: "",
    message: "",
  });
  const [isSnackbar, setIsSnackbar] = useState(false);

  const { data, status } = useSession();

  const deleteProfileHandler = () => {
    const profileData = {
      email: data.user.email,
      profileName,
    };

    setSnackbarData({
      className: "pending",
      status: "pending",
      message: "Please wait, profile is deleting...",
    });
    setIsSnackbar(true);

    fetch("/api/update/delete-profile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return;
      })
      .then((data) => {
        setSnackbarData({
          className: "success",
          status: "success",
          message: "Porfile was removed correctly",
        });
      });
  };
  return (
    <>
      <div onClick={deleteProfileHandler}>
        <div className={currClassName} style={{ backgroundColor: bgColor }}>
          <ImCross />
        </div>
        {profileName && <p className="profileName">{profileName}</p>}
      </div>
      {isSnackbar ? (
        <Snackbar hideSnackbar={setIsSnackbar} {...snackbarData} />
      ) : null}
    </>
  );
};

export default CardAssignedToDelete;
