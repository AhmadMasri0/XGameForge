import { Button, useTheme } from "@mui/material";

const AdminButton = ({ title, color, Icon, style, onClick, props }) => {

    const theme = useTheme();

    return <Button
        {...props}
        variant="contained"
        color={color}
        startIcon={Icon ? <Icon /> : null}

        onClick={onClick}
        sx={{ mb: 2, border: theme.palette.mode === 'light' ? '' : '1px solid gray', ...style }}
    >
        {title}
    </Button>;
}

export default AdminButton;