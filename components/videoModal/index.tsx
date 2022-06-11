import * as React from 'react';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {LogEntry as LogEntryModel} from "../../models/LogEntry";
import {type} from "os";
import {useState} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'initial',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BasicModal = ({
                   open,
                   handleClose,
                    path,
                    prediction,
    blob
               }: {
    open:boolean
    handleClose: ()=>void;
    path:string
    prediction:string
    blob:Blob
}) => {
    console.log('blob type',blob)
    const [videosStream,setVideosStream]=React.useState<string | undefined>();
    const url=URL.createObjectURL(blob)





    return (
        <div>
            <Modal
                id={path}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{width:"auto"}}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <video  src={path} controls loop autoPlay muted/>
                    </Typography>
                    <Typography id="modal-modal-footer" sx={{ mt: 1}}>
                    <p>model predicted as violence in {prediction}</p>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;