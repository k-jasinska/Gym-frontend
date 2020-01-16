import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import EditClientForm from '../Forms/EditClientForm/EditClientForm';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import Edit from '@material-ui/icons/Edit';


const FormDiv = styled.div`
  display: flex,
  alignItems: center,
  justifyContent: center
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;  
  aria-labelledby="simple-modal-title",
  aria-describedby="simple-modal-description"
`;

const StyledTooltip = styled(Tooltip)`
  margin: 0 10px;
`;

const StyledPaper = styled(Paper)`
  width: 30%;
  position: 'absolute',
  outline: '0',
  margin: 20px;
  padding: 40px;
`;
interface Props {
    loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
    selected: string;
}

export default function EditClientModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { loadPersonnel, selected } = props;
    const { t } = useTranslation();

    return (
        <>
            <StyledTooltip title={t('table.edit')}>
                <IconButton aria-label="edit" onClick={handleOpen} >
                    <Edit />
                </IconButton>
            </StyledTooltip>
            <StyledModal open={open} onClose={handleClose}>
                <Zoom in={open} mountOnEnter unmountOnExit>
                    <StyledPaper>
                        <FormDiv>
                            <EditClientForm handleClose={handleClose} loadPersonnel={loadPersonnel} selected={selected} />
                        </FormDiv>
                    </StyledPaper>
                </Zoom>
            </StyledModal>
        </>
    );
}
