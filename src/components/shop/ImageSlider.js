import { Box } from "@mui/material";
import Slider from "react-slick";
import { API_URL } from "../../api/axios";
import { useTheme } from "@emotion/react";
import './Arrow.css'

function Arrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}


const ImageSlider = ({ product }) => {

    const theme = useTheme();

    const sliderSettings = {
        dots: true,
        infinite: product?.images?.length > 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };

    return <Box sx={{ width: { xs: "80%", md: 400 }, marginLeft: { xs: '10% !important', sm: '0 !important' } }}>
        <Slider {...sliderSettings}>
            {product?.images?.map((img, index) => (
                <Box
                    key={index}
                    component="img"
                    src={img.url}
                    alt={product.name}
                    sx={{
                        height: 400,
                        width: "100%",
                        objectFit: "contain",
                        borderRadius: 2,
                    }}
                />
            ))}
        </Slider>
    </Box>
}

export default ImageSlider;