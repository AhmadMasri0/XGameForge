import { Button, useTheme, ButtonProps, SxProps, Theme } from "@mui/material";

interface AdminButtonProps {
    title: string;
    color?: ButtonProps['color'];
    Icon?: React.ComponentType;
    style?: SxProps<Theme>;
    onClick?: () => void;
    props?: Partial<ButtonProps>;
}

const AdminButton = ({ 
    title, 
    color = 'primary', 
    Icon, 
    style = {}, 
    onClick, 
    props = {} 
}: AdminButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            {...props}
            variant="contained"
            color={color}
            startIcon={Icon ? <Icon /> : null}
            onClick={onClick}
            sx={{ 
                mb: 2, 
                border: theme.palette.mode === 'light' ? '' : '1px solid gray', 
                ...style 
            }}
        >
            {title}
        </Button>
    );
};

export default AdminButton;