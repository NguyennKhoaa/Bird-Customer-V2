import { Box, FormControl, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

type InputProps = {
  id?: string;
  label?: string;
  errorMessage?: string | undefined;
  condition?: boolean;
  fullWidth?: boolean | undefined;
  children?: JSX.Element;
} & TextFieldProps;

const TextFieldCustoms = (props: InputProps): JSX.Element => {
  const { id, label, errorMessage, fullWidth, condition, children, type, required, ...restProps } = props;
  return (
    <FormControl variant='standard' fullWidth={fullWidth} error={condition}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {required ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{label}</Typography>
            <StarIcon sx={{ fontSize: '10px', color: 'red' }} />
          </Box>
        ) : (
          <Typography>{label}</Typography>
        )}
        {type === 'text' ? <TextField id={id} {...restProps} /> : children}
        {condition && (
          <FormHelperText error id='standard-weight-helper-text-username-login'>
            {errorMessage}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  );
};

export default TextFieldCustoms;
