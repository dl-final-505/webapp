import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {LogEntry as LogEntryModel} from "../../models";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
               }: {
    open:boolean
    handleClose: ()=>void;
    path:string
    prediction:string

}) => {


    return (
        <div>
            <Modal
                id={path}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <video src={'.upload/'} controls loop autoPlay muted></video>
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