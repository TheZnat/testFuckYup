import React from 'react';
import MainContainer from "../Component/MainContainer";
import {useData} from "../hook/useData";
import PrimaryButton from "../Component/PrimaryButton";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import swal from 'sweetalert';

const useStyles = makeStyles({
    root: {
        marginBottom: "30px",
    },
    table: {
        marginBottom: "30px",
    },
});

const Result = () => {
    const styles = useStyles();
    const { data } = useData();

    const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
    const { files } = data;

    const onSubmit = async () =>{
        const formData = new FormData();

        if (data.files){
            data.files.forEach((file) =>{
                formData.append("file", file)
            })
        }
        entries.forEach((entry) =>{
            formData.append(entry[0], entry[1])
        })


        const res = await fetch("http://localhost:4000/", {
            method: "POST",
            body: formData,
        });

        if (res.status === 200) {
            swal("Great job!", "You've passed the challenge!", "success");
        }


    }

    return (
        <>
            <MainContainer>
                <Typography component="h2" variant="h5">
                    📋 Form Values
                </Typography>
                <TableContainer className={styles.root} component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entries.map((entry) => (
                                <TableRow key={entry[0]}>
                                    <TableCell component="th" scope="row">
                                        {entry[0]}
                                    </TableCell>
                                    <TableCell align="right">{entry[1].toString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {files && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Files
                        </Typography>
                        <List>
                            {files.map((f, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon  />
                                    </ListItemIcon>
                                    <ListItemText primary={f.name} secondary={f.size} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
                <Link to="/">Start over</Link>
            </MainContainer>
        </>
    );

};

export default Result;