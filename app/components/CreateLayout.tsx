import { ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { KeyboardArrowUp, Label } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import TextFieldCustom from "./TextFieldCustom";
import { useRoleStore } from "../store/useRoleStore";
import { useAuthStore } from "../store/useAuthStore";

interface CreateCustomProps {
  createName: string;
  dataSource: any[] | undefined;
  formData: any[] | undefined;
  handleCreate: (e: React.MouseEvent<unknown>) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<unknown> | SelectChangeEvent<unknown>,
    property: any
  ) => void;
}
const CreateLayout: React.FC<CreateCustomProps> = ({
  createName,
  dataSource,
  formData,
  handleCreate,
  handleChange,
}) => {
  const { token } = useAuthStore();
  const { fetchRole, roles } = useRoleStore();
  const createChangeHandler =
    (property: any) =>
    (event: React.ChangeEvent<unknown> | SelectChangeEvent<unknown>) => {
      handleChange(event, property);
    };
  useEffect(() => {
    fetchRole(token);
    console.log(roles);
  }, [token]);
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#4338CA",
            color: "white",
            p: 2,
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {createName} Details (Required)
          <KeyboardArrowUp />
        </Typography>

        <Paper elevation={3} sx={{ py: 3, px: 4 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 4 }}
          >
            {dataSource?.map((item, index) => {
              return (
                <Grid size={5} rowGap={5} key={index}>
                  {item.type === "select" ? (
                    <>
                      <Grid size={6} sx={{ width: 1 }} rowGap={5}>
                        <Box sx={{ width: "100%", gap: "10px" }}>
                          <InputLabel sx={{ fontSize: 20 }} shrink>
                            {item.label}
                          </InputLabel>
                          <Select
                            value={formData && formData[item.id]}
                            name={item.id}
                            displayEmpty
                            onChange={createChangeHandler(item.id)}
                            sx={{
                              width: 1,
                              borderRadius: 1,
                              backgroundColor: "#F3F6F9",
                            }}
                          >
                            <MenuItem disabled value="">
                              Role
                            </MenuItem>
                            {item.options?.map((option: any, index: any) => {
                              return (
                                !option.isDeleted && (
                                  <MenuItem key={index} value={option.role}>
                                    {option.role}
                                  </MenuItem>
                                )
                              );
                            })}
                          </Select>
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid size={6} sx={{ width: 1 }}>
                        <TextFieldCustom
                          label={item.label}
                          type={item.type}
                          id={item.id}
                          value={formData && formData[item.id]}
                          onChange={createChangeHandler(item.id)}
                          sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Paper>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#4338CA",
            width: "7rem",
            fontWeight: "600",
          }}
          onClick={handleCreate}
        >
          Create
        </Button>
        <ToastContainer />
      </Container>
    </>
  );
};

export default CreateLayout;
