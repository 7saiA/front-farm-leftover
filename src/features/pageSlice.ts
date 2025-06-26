import {navItems} from "../utils/constants.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    currentPage: string;
}

const initialState: PageState = {
    currentPage: navItems[0]
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        }
    }
})

export const {changePage} = pageSlice.actions;
export default pageSlice.reducer;