import React from "react";
import { Table, HStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { useState } from "react";

const NewBid = ({ newBid, setNewBid }) => {

    return (
        <Table.Row>
            <Table.Cell>
                <HStack>
                <Input
                    value={newBid.height}
                    onChange={(e) => setNewBid(prev => ({...prev, height: e.target.value}))}
                />
                <Input
                    value={newBid.suit}
                    onChange={(e) => setNewBid(prev => ({...prev, suit: e.target.value}))}
                />
                <Switch.Root
                    checked={newBid.alert}
                    onCheckedChange={(e) => setNewBid(prev => ({...prev, alert: e.checked}))}
                >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>ALERT</Switch.Label>
                </Switch.Root>
                </HStack>
            </Table.Cell>
            <Table.Cell>
                <Input
                    value={newBid.type}
                    onChange={(e) => setNewBid(prev => ({...prev, type: e.target.value}))}
                />
            </Table.Cell>
            <Table.Cell>
                <Input
                    
                    value={newBid.meaning}
                    onChange={(e) => setNewBid(prev => ({...prev, meaning: e.target.value}))}
                />
            </Table.Cell>
        </Table.Row>
    );
};

export default NewBid;
