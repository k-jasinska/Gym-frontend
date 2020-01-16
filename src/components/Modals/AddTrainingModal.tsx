import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import AddTrainerForm from '../Forms/AddTrainerForm/AddTrainerForm';
import Add from '@material-ui/icons/Add';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import TrainingType from '../Forms/AddTrainingForm/AddTrainingForm';

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
  handleClose: () => void;
  open: boolean;
  getTrenings: () => Promise<void>;
}

export default function AddTrainerModal(props: Props) {
  const { handleClose, open, getTrenings } = props;
  const { t } = useTranslation();

  return (
    <>
      <StyledModal open={open} onClose={handleClose}>
        <Zoom in={open} mountOnEnter unmountOnExit>
          <StyledPaper>
            <FormDiv>
              <TrainingType handleClose={handleClose} getTrenings={getTrenings} />
            </FormDiv>
          </StyledPaper>
        </Zoom>
      </StyledModal>
    </>
  );
}