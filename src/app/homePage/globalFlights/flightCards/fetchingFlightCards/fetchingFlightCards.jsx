import { LoadingOverlay } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

function FetchingFlightCards() {


    const [visible, { open, close }] = useDisclosure(true);

    return (
        <>
            <LoadingOverlay overlayBlur={1} overlayOpacity={0.3} overlayColor="#f5f5f7" visible={visible} size={"md"} />

            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article>
            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article>
            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article>
            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article>
            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article>
            <article className="flight-card">
                <p className="flight">✈️</p>
                <div className="airport-names">
                    <div className="departure"><p>Dep: </p></div>
                    <div className="arrival"><p>Arr: </p></div>
                </div>
            </article></>
    )
}

export { FetchingFlightCards }