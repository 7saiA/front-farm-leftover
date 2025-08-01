import {createTheme} from "@mui/material";
import {blue, green, purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            main: green[500],
            dark: green[700],
            contrastText: "white"
        },
        info: {
            main: blue[500],
            dark: blue[700],
        },
        success: {
            main: green[500],
            dark: green[700],
            contrastText: "white"
        }
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                root: {
                    textAlign: "center",
                    borderRadius: 2,
                    '&.Mui-focused': {
                        backgroundColor: 'rgba(156, 39, 176, 0.08)'
                    },
                    '& .MuiSelect-select': {
                        color: 'black'
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'black'
                    }
                }
            }
        }
    }
})

export default theme