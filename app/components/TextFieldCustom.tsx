import {
  IconButton,
  InputAdornment,
  InputLabel,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import React, { ReactElement } from "react";

type TextFieldCustomType = {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  type: string;
  iconStart?: ReactElement;
  iconEnd?: ReactElement;
  sx?: SxProps<Theme>;
  value?: any;
  multiline?: boolean;
};

const TextFieldCustom: React.FC<TextFieldCustomType> = ({
  id,
  label,
  onChange,
  type,
  value,
  iconStart,
  iconEnd,
  multiline = false,
  sx,
}) => {
  return (
    <>
      <InputLabel
        sx={{ justifyContent: "flex-start", fontSize: 20 }}
        shrink
        htmlFor={id}
      >
        {label}
      </InputLabel>
      <TextField
        value={value}
        id={id}
        variant="outlined"
        name={id}
        placeholder={label}
        type={type}
        onChange={onChange}
        sx={sx}
        multiline={multiline}
        rows={multiline ? 3 : 1}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{iconStart}</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">{iconEnd}</InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default TextFieldCustom;
