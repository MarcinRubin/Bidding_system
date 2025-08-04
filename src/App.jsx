import {
    Button,
    Table,
    Container,
    Text,
    Input,
    Flex,
    VStack,
} from "@chakra-ui/react";
import {
    BsSuitSpadeFill as Spade,
    BsSuitHeartFill as Heart,
    BsSuitDiamondFill as Diamond,
    BsSuitClubFill as Club,
} from "react-icons/bs";
import BidMeaning from "./components/BidMeaning";
import NewBid from "./components/NewBid";
import { useState, useRef } from "react";

const suit_map = {
    C: <Club />,
    D: <Diamond color="red" />,
    H: <Heart color="red" />,
    S: <Spade />,
    BA: "BA",
};

function App() {
    const [bids, setBids] = useState({});
    const [bidState, setBidState] = useState([0]);
    const [newBid, setNewBid] = useState({
        height: "",
        suit: "",
        alert: false,
        type: "",
        meaning: "",
    });
    const inputRef = useRef(null);

    const handleBidChange = (idx) => {
        let newBidState = [...bidState, idx];
        setBidState(newBidState);
    };

    let currentBid = bidState
        .slice(1)
        .reduce(
            (accumulator, item) => accumulator.further_bids[item],
            bids[bidState[0]]
        );

    const saveNewBid = () => {
        let newBids = { ...bids };
        let temp = bidState
            .slice(1)
            .reduce(
                (accumulator, item) => accumulator.further_bids[item],
                newBids[bidState[0]]
            );
        temp.further_bids = [
            ...temp.further_bids,
            { ...newBid, further_bids: [] },
        ];
        setBids((prev) => newBids);
    };

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];

        const result = await file.text();
        const newBids = JSON.parse(result);
        setBids((prev) => newBids);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;

        inputRef.current.click();
    };

    const handleGetPreviousBid = (e) => {
        const index = Number(e.currentTarget.dataset.index);
        const newBidState = bidState.slice(0, index + 1);
        setBidState((prev) => newBidState);
    };

    const file = new Blob([JSON.stringify(bids)], { type: "text/plain" });

    let item = bids[bidState[0]];
    let currentNav = [{ height: item?.height, suit: item?.suit }];
    for (const state of bidState.slice(1)) {
        item = item?.further_bids[state];
        currentNav = [
            ...currentNav,
            { height: item?.height, suit: item?.suit },
        ];
    }

    return (
        <Container w="95%" maxW="sm">
            <Flex
                direction="column"
                alignItems="top"
                justifyContent="flex-start"
                py={4}
            >
                {Object.keys(bids).length === 0 ? (
                    <VStack
                        flexDir="column"
                        gap="8"
                        minH="dvh"
                        fontSize="md"
                        w="100%"
                    >
                        <Button onClick={handleButtonClick}>Upload File</Button>
                        <Input
                            ref={inputRef}
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </VStack>
                ) : (
                    <VStack gap="8" fontSize="md" w="100%">
                        <Text
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <Text
                                as="span"
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                cursor="pointer"
                                data-index="0"
                                onClick={handleGetPreviousBid}
                            >
                                {currentNav[0].height}{" "}
                                {suit_map[currentNav[0].suit]}
                            </Text>
                            {currentNav.slice(1).map((item, idx) => (
                                <Text
                                    as="span"
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    key={idx}
                                    data-index={idx + 1}
                                    cursor="pointer"
                                    onClick={handleGetPreviousBid}
                                >
                                    - {item.height} {suit_map[item.suit]}
                                </Text>
                            ))}
                        </Text>
                        <Table.Root key="table" size="sm" variant="outline" tableLayout="fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader w="80px">
                                        Odzywka
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader w="40px">Typ</Table.ColumnHeader>
                                    <Table.ColumnHeader>
                                        Znaczenie
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {currentBid.further_bids.map((bid, idx) => (
                                    <Table.Row key={idx}>
                                        <Table.Cell
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            cursor="pointer"
                                            onClick={(e) =>
                                                handleBidChange(idx)
                                            }
                                        >
                                            {bid.height} {suit_map[bid.suit]}
                                            {bid.alert ? (
                                                <Text as="span" color="blue">
                                                    (A)
                                                </Text>
                                            ) : (
                                                ""
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text as="span">{bid.type}</Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BidMeaning>
                                                {bid.meaning}
                                            </BidMeaning>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                <NewBid newBid={newBid} setNewBid={setNewBid} />
                            </Table.Body>
                        </Table.Root>
                        <Button onClick={saveNewBid}>SAVE</Button>
                        <Button>
                            <a
                                download="sample.txt"
                                target="_blank"
                                rel="noreferrer"
                                href={URL.createObjectURL(file)}
                                style={{
                                    textDecoration: "inherit",
                                    color: "inherit",
                                }}
                            >
                                Download
                            </a>
                        </Button>
                    </VStack>
                )}
            </Flex>
        </Container>
    );
}

export default App;
