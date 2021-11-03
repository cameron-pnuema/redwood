import React from "react";
import styles from "./CustomizationUntit.module.scss";

export default function FloringUpgrade({ og, onChange }) {
  const currentValue = og.options?.[0]?.value;
  return (
    <div className={styles.body__upgrades}>
      <div>
        <label for="room">Room Name</label>
        <br />
        <input
          type="text"
          id="room"
          placeholder="Enter Room Name1"
          value={currentValue?.[0]?.value}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                {
                  ...currentValue[0],
                  value: event.target.value,
                  name: "input1",
                },
                currentValue[1],
                currentValue[2],
              ],
              groupId: og.id,
              optionId:1
            })
          }
        />
        <br />
        <br />

        <input
          type="text"
          id="room"
          placeholder="Enter Room Name"
          value={currentValue?.[1]?.value}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                currentValue[0],
                {
                  ...currentValue[1],
                  value: event.target.value,
                  name: "input2",
                },
                currentValue[2],
              ],
              groupId: og.id,
              optionId:1
            })
          }
        />
        <br />
        <br />

        <input
          type="text"
          id="room"
          placeholder="Enter Room Name"
          value={currentValue?.[2]?.value}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                currentValue[0],
                currentValue[1],
                {
                  ...currentValue[2],
                  value: event.target.value,
                  name: "input3",
                },
              ],
              groupId: og.id,
              optionId:1

            })
          }
        />
      </div>
      <div className={styles.body__currencyInput}>
        <span class={styles.body__currency}>$</span>
        <input
          type="number"
          value={currentValue?.[0]?.price}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                {
                  ...currentValue[0],
                  price: event.target.value,
                  name: "input1",
                },
                currentValue[1],
                currentValue[2],
              ],
              groupId: og.id,
              optionId:1

            })
          }
        />
        <br />
        <br />

        <span class={styles.body__currency}>$</span>
        <input
          type="number"
          value={currentValue?.[1]?.price}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                currentValue[0],
                {
                  ...currentValue[1],
                  price: event.target.value,
                  name: "input2",
                },
                currentValue[2],
              ],
              groupId: og.id,
              optionId:1
            })
          }
        />
        <br />
        <br />

        <span class={styles.body__currency}>$</span>
        <input
          type="number"
          value={currentValue?.[2]?.price}
          onChange={(event) =>
            onChange({
              inputAnswer: [
                currentValue[0],
                currentValue[1],
                {
                  ...currentValue[2],
                  price: event.target.value,
                  name: "input3",
                },
              ],
              groupId: og.id,
              optionId:1

            })
          }
        />
      </div>
    </div>
  );
}
