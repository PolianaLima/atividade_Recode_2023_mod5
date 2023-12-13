import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: '30%',
        height: '30%',
        margin: 'auto',
        display: 'flex',
        justifyContent:'center'
    },
};
const ModalComponent = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={customStyles}
        >
              <div className="d-flex flex-column justify-content-center align-items-center ">
                  {children}
              </div>


        </Modal>
    );
};

export default ModalComponent;
