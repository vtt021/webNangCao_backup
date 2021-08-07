import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

export default function ImageUploadCard(props) {
    const classes = useStyles();

    const [mainState, setMainState] = useState("initial");
    const [imageUploaded, setImageUploaded] = useState(0);

    const handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        
        reader.onloadend = function (e) {
            props.setSelectedFile([reader.result])
        };
        let a = file.name;
        console.log(file); // Would see a path?
        
        setMainState("uploaded");
        //props.setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        props.setFileName(a)
        setImageUploaded(1);
    };


    const renderInitialState = () => {
        return (
            <Grid container justify="center" alignItems="center">
                <input
                    accept="image/*"
                    className={classes.input}
                    id={'contained-button-file' + props.id}
                    type="file"
                    onChange={handleUploadClick}
                />
                <label htmlFor={'contained-button-file' + props.id}>
                    <Fab component="span" className={classes.button}>
                        <AddPhotoAlternateIcon />
                    </Fab>
                </label>
            </Grid>
        );
    }


    const renderUploadedState = () => {
        return (
            <React.Fragment>
                <CardActionArea onClick={imageResetHandler}>
                    <img
                        width="100%"
                        className={classes.media}
                        src={props.selectedFile}
                    />
                </CardActionArea>
            </React.Fragment>
        );
    }

    const imageResetHandler = event => {
        console.log("Click! Reset");
        setMainState("initial");
        props.setSelectedFile(null);
        setImageUploaded(0);

    };


    return (
        <React.Fragment>
            <div className={classes.root}>
                <Card className={classes.cardName}>
                    {(mainState == "initial" && renderInitialState())
                        || (mainState == "uploaded" && renderUploadedState())}
                </Card>
            </div>
        </React.Fragment>
    );

}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    media: {
        height: 400,
        objectFit: 'scale-down'
    },
    icon: {
        margin: theme.spacing.unit * 2
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        "&:hover": {
            color: red[800]
        }
    },
    cardHeader: {
        textalign: "center",
        align: "center",
        backgroundColor: "white"
    },
    input: {
        display: "none"
    },
    title: {
        color: blue[800],
        fontWeight: "bold",
        fontFamily: "Montserrat",
        align: "center"
    },
    button: {
        color: blue[900],
        margin: 10
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    typography: {
        margin: theme.spacing.unit * 2,
        backgroundColor: "default"
    },

    searchRoot: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400
    },
    searchInput: {
        marginLeft: 8,
        flex: 1
    },
    searchIconButton: {
        padding: 10
    },
    searchDivider: {
        width: 1,
        height: 28,
        margin: 4
    }
}));
