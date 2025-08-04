import { useState } from 'react'
import {Select, Portal, createListCollection} from "@chakra-ui/react"

const options = createListCollection({
  items: [
    { label: "NF", value: "NF" },
    { label: "F1", value: "F1" },
    { label: "GF", value: "GF" },
    { label: "INV", value: "INV" },
    { label: "SO", value: "SO" },
    { label: "BL", value: "BL" },
  ],
});


const SelectType = () => {
  const [value, setValue] = useState([]);
  return (
    <Select.Root
      collection={options}
      width="100px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Label></Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Typ" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {options.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectType