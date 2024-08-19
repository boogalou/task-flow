import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,

  selectors: {
    selectIsOpen: (state) => state.isOpen,
  },

  reducers: {
    openModal(state) {
      console.log('modalSlice:  OpenModal');
      state.isOpen = true;
    },

    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { selectIsOpen } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions;
