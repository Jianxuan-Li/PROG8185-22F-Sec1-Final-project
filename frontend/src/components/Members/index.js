import React, { useContext } from "react";
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

export default function Members() {
  const { members, deleteMember, createNewMember, editMember } =
    useContext(MemberContext);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create new account
      </Button>
      {open && (
        <Form onSubmit={createNewMember} onClose={() => setOpen(false)} />
      )}
      {edit && (
        <Form onSubmit={editMember} member={edit} onClose={() => setEdit(false)} />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id </TableCell>
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
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="primary"
                      onClick={() => deleteMember(item.id)}
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
