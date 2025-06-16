import { Card, CardMedia, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface CustomCardProps {
    path?: string;
    Buttons?: ReactNode;
    content: ReactNode;
    imgSrc: string;
    imgAlt: string;
}

const CustomCard = ({ path, Buttons, content, imgSrc, imgAlt }: CustomCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: "auto",
                width: { xs: '250px' },
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between',
                transition: "transform 0.3s ease",
                '&:hover': {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                },
            }}
        >
            <Link 
                to={path || '#'}
                style={{
                    textDecoration: 'none',
                    pointerEvents: path ? 'auto' : 'none',
                    color: theme.customColors.primary, 
                    display: 'block'
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    sx={{ objectFit: 'contain', marginBottom: 'auto' }}
                    image={imgSrc}
                    alt={imgAlt}
                />
                {content}
            </Link>
            {Buttons}
        </Card>
    );
};

export default CustomCard;