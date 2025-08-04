import { Switch } from "@chakra-ui/react";

const SwitchMode = ({ idx, checked, setChecked }) => {
    const setState = (state) => {
        console.log(state);
        let temp = [...checked];
        temp[idx] = state;
        setChecked(prev=>temp);
    }
    
    return (
        <Switch.Root
            checked={checked[idx]}
            onCheckedChange={(e) => setState(e.checked)}
        >
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
        </Switch.Root>
    );
};

export default SwitchMode;
