import { Box } from "@mui/material";
import Slider, { Settings } from "react-slick";
import './Arrow.css';
import { Product } from "../../types/types";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

interface ImageSliderProps {
    product: Product;
}

function Arrow({ className, style, onClick }: ArrowProps) {
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

const ImageSlider = ({ product }: ImageSliderProps) => {
    const imageCount = product?.images?.length || 0;

    const sliderSettings: Settings = {
        dots: true,
        infinite: imageCount > 1,
        slidesToShow: Math.min(1, imageCount),
        slidesToScroll: 1,
        arrows: imageCount > 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        adaptiveHeight: true
    };

    if (!imageCount) {
        return (
            <Box sx={{
                width: { xs: "80%", md: 400 },
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: { xs: '10% !important', sm: '0 !important' }
            }}>
                No images available
            </Box>
        );
    }

    return (
        <Box sx={{
            width: { xs: "80%", md: 400 },
            marginLeft: { xs: '10% !important', sm: '0 !important' }
        }}>
            <Slider {...sliderSettings}>
                {product.images.map((img, index) => (
                    <Box
                        key={`${img.url}-${index}`}
                        component="img"
                        src={img.url}
                        alt={img.alt || product.name}
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
    );
};

export default ImageSlider;