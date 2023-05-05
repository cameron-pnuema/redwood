import { v4 as uuidv4 } from 'uuid';

export const filterData =[
    {
        id: uuidv4(),
        title: "Home Type",
        options: [{ id: uuidv4(), label: "HUD-DW", value: "HUD-DW" }, { id: uuidv4(), label: "HUD-SW", value: "HUD-SW" },{ id: uuidv4(), label: "Modular", value: "Modular" } ]
    },
    {
        id: uuidv4(),
        title: "Bedrooms",
        options: [{ id: uuidv4(), label: 1, value: 1, operation: "equal" }, { id: uuidv4(), label: 2, value: 2, operation: "equal" }, { id: uuidv4(), label: 3, value: 3, operation: "equal" }, { id: uuidv4(), label: "4+", value: 4, operation: "greater" }]
    },
    {
        id: uuidv4(),
        title: "Bathrooms",
        options: [{ id: uuidv4(), label: 1, value: 1, operation: "equal" }, { id: uuidv4(), label: 2, value: 2, operation: "equal" }, { id: uuidv4(), label: "3+", value: 3, operation: "greater" }]
    },
    {
        id: uuidv4(),
        title: "Square Feet",
        options: [{ id: uuidv4(), label: "0-999 SqFt", min: "0", max: "999", operation: "range" }, { id: uuidv4(), label: "1000-1499 SqFt", min: "1000", max: "1499", operation: "range", value:"1200" }, { id: uuidv4(), label: "1500-1999 SqFt", min: "1500", max: "1999", value: "1500-1999", operation: "range" }, { id: uuidv4(), label: "2000+ SqFt", value: 2000, operation: "greater" }]
    },
    {
        id: uuidv4(),
        title: "Price",
        options: [{ id: uuidv4(), label: "$0 - $74,999", min: "0", max: "74999", operation: "range" }, { id: uuidv4(), label: "$75,000 - $124,999", min: "75000", max: "124999", operation: "range" }, { id: uuidv4(), label: "$125,000 - $174,999", min: "125000", max: "174999", operation: "range" }, { id: uuidv4(), label: "$175,000- $224,999", min: "175000", max: "224999", value: "175000-224999", operation: "range" }, { id: uuidv4(), label: "$225,000 - $274,999", min: "225000", max: "274999", value: "225000-274999", operation: "range" }, { id: uuidv4(), label: "$275,000+", value: "275000", operation: "greater" }]
    }
]

