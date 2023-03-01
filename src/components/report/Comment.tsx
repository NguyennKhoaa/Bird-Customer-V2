import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface CommentBoxProps {
  onSubmitComment: (comment: string) => void;
  id: number;
}

interface AddComment {
  reportId: number;
  msgCustomer: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ onSubmitComment, id }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitComment(comment);
    setComment("");
  };

  const formik = useFormik({
    initialValues: {
      reportId: id,
      msgCustomer: "",
    },
    // validationSchema: schemaLogin,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: AddComment) => {
      axios({
        method: "PUT",
        url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/CommentReport",
        data: values,
      })
        .then((rs) => {
          console.log(rs);
          toast("🦄 Add Comment Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        onBlur={formik.handleBlur}
        name="msgCustomer"
        multiline
        minRows={3}
        maxRows={3}
        style={{ width: "80%", marginTop: "15px" }}
        value={formik.values.msgCustomer}
        onChange={formik.handleChange}
      />
      <Button style={{ marginTop: "80px" }} type="submit">
        Gửi
      </Button>
    </form>
  );
};

export default CommentBox;
