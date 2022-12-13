import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MemberContext from "../../context/MemberContext";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import Form from "./Form";

import {
  findAllMembers,
  deleteOneMember,
  createOneMember,
  updateOneMember,
} from "./request";

export default function Members() {
  const { members, setMembers, deleteMember, createNewMember, editMember } =
    useContext(MemberContext);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      findAllMembers().then((res) => {
        setMembers(res);
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    deleteOneMember(id).then(() => {
      deleteMember(id);
    });
  };

  const handleEdit = (data, id) => {
    updateOneMember(id, data).then((res) => {
      editMember(id, res);
    });
  };

  const handleCreate = (data) => {
    createOneMember(data).then((res) => {
      createNewMember(res);
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create new account
      </Button>
      {open && <Form onSubmit={handleCreate} onClose={() => setOpen(false)} />}
      {edit && (
        <Form
          onSubmit={handleEdit}
          member={edit}
          onClose={() => setEdit(false)}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="primary"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setEdit(item);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
