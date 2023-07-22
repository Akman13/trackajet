import { Carousel } from "@mantine/carousel";
import { LoadingOverlay } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

function FetchingFlightCarousel() {
    const [visible, { open, close }] = useDisclosure(true);

    const arrayPlaceholder = Array.from(' '.repeat(6))

    const carouselStyle = {
        'control': {
            '&[data-inactive]': {
                'opacity': '0',
                'cursor': 'default',
            },
        },
    }

    return (
        <>

            <LoadingOverlay overlayBlur={1} overlayOpacity={0.3} overlayColor="#f5f5f7" visible={visible} size={"md"} />

            <Carousel
                styles={carouselStyle}
                slideSize="85%"
                slideGap="md"
                initialSlide={0}
                slidesToScroll={1}>


                {arrayPlaceholder.map((card) => (
                    <Carousel.Slide>
                        <article className='flight-card'>
                            <p className="flight">✈️</p>
                            <div className="airport-names">
                                <div className="departure">
                                    <p>Dep:</p>
                                </div>
                                <div className="arrival">
                                    <p>Arr: </p>
                                </div>
                            </div>
                        </article>
                    </Carousel.Slide>
                ))}
            </Carousel>

        </>
    )
}

export { FetchingFlightCarousel }