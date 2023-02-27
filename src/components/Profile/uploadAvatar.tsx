import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface IUploadAvatar {
  image: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
  height: number;
}

export default function UploadAvatar({
  image,
  name,
  onChange,
  height,
  width,
}: IUploadAvatar): JSX.Element {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: width,
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid",
          borderRadius: name === "avatar" ? "50%" : "0",
          overflow: "hidden",
        }}
      >
        {image && <img src={image} width="100%" height="100%" />}
        <Box sx={{ position: "absolute" }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              name={name}
              onChange={onChange}
            />
            {/* <PhotoCamera /> */}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
