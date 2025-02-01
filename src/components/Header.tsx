import React, { ComponentType, useState } from "react";
import { ReactComponent as PenSvg } from '../assets/icons/pen.svg';
import { ReactComponent as ResetSvg } from '../assets/icons/reset.svg';
import Modal from 'react-modal';
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg';
import { ReactComponent as AlertTriangle } from '../assets/icons/alert.svg';
import {usePoster} from "../context/Poster";
import Button from "./Button";

const ModalSafeForReact18 = Modal as unknown as ComponentType<ReactModal['props']>;
Modal.setAppElement('#root');

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    resetPoster
  } = usePoster()

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '1.5rem',
      borderRadius: '1rem',
      width: '550px',
      // height: '584px'
      // textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-start items-center gap-3 font-bold text-black75'>
        <PenSvg className='w-10 h-10' />
        <h1 className='text-display select-none'>Canvas Editor</h1>
      </div>

      <div
        className='flex gap-3 border-b border-solid border-red cursor-pointer'
        onClick={() => setShowModal(true)}
      >
        <div className='text-red select-none'>Reset</div>
        <ResetSvg className='fill-red' />
      </div>

      <ModalSafeForReact18
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className='flex justify-end w-full'
          >
            <CloseSvg
              className="fill-black cursor-pointer w-6 h-6"
              onClick={() => setShowModal(false)}
            />
          </div>

          <div
            className='flex items-center justify-center w-full mb-5'
          >
            <AlertTriangle
              className='fill-red w-[217px] h-[200px]'
            />
          </div>

          <div
            className='flex items-center justify-center w-full flex-col px-20'
          >
            <h2 className="text-xl font-bold mb-2 select-none">WARNING</h2>
            <p className="text-sm mb-4 select-none">
              You're about to reset the whole process. Are you sure you want to do it?
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className="px-4 py-2 bg-white rounded hover:bg-white select-none"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <Button
              onClick={() => {
                resetPoster()
                setShowModal(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </ModalSafeForReact18>
    </div>
  );
};

export default Header;
