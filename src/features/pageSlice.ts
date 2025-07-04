import {navItems} from "../utils/constants.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FarmDto} from "../types/Farm.ts";

interface PageState {
    currentPage: string;
    selectedFarm: FarmDto | null;
}

const initialState: PageState = {
    currentPage: navItems[0],
    selectedFarm: null,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        },
        selectFarm(state, action: PayloadAction<FarmDto>) {
            state.selectedFarm = action.payload;
        },
        clearSelectedFarm(state) {
            state.selectedFarm = null;
        },
    }
})

export const {changePage, selectFarm, clearSelectedFarm} = pageSlice.actions;
export default pageSlice.reducer;